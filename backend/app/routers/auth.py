import asyncio
import httpx # New library for API calls
import os
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.database import get_db
from app.models import User
from app.schemas import UserCreate
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Setup password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- 1. Token Generator & Config ---
SECRET_KEY = "super_secret_betbook_key" 
serializer = URLSafeTimedSerializer(SECRET_KEY)

# Replace with your actual Resend API Key


# --- HELPER: Email Sender via API (Reliable) ---
async def send_verification_email_task(email: str, token: str):
    verification_link = f"http://localhost:5173/verify?token={token}"
    html_content = f"""
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h3 style="color: #1e293b;">Welcome to BetBook! 🚀</h3>
        <p>Please click the button below to verify your account:</p>
        <a href="{verification_link}" style="background-color: #eab308; color: black; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
            Verify My Account
        </a>
    </div>
    """
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "from": "onboarding@resend.dev", # Or your verified domain
                    "to": email,
                    "subject": "BetBook - Verify Your Account",
                    "html": html_content
                }
            )
            if response.status_code != 200:
                print(f"Failed to send email: {response.text}")
        except Exception as e:
            print(f"Error connecting to Email API: {e}")

# --- ROUTE 1: REGISTER (Smart Version) ---
@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user_data: UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    
    # CASE 1: User exists and is already verified
    if existing_user and existing_user.is_verified:
        raise HTTPException(status_code=400, detail="Email is already registered and verified.")
    
    # CASE 2: User exists but is NOT verified (The "Limbo" state)
    if existing_user and not existing_user.is_verified:
        token = serializer.dumps(existing_user.email, salt="email-verify")
        background_tasks.add_task(send_verification_email_task, existing_user.email, token)
        return {"message": "Account already exists but wasn't verified. We have sent a new verification link."}

    # CASE 3: New User
    hashed_password = pwd_context.hash(user_data.password)
    new_user = User(
        email=user_data.email, 
        hashed_password=hashed_password, 
        balance=100.0,
        is_verified=False
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = serializer.dumps(new_user.email, salt="email-verify")
    background_tasks.add_task(send_verification_email_task, new_user.email, token)

    return {"message": "User created. Please check your email to verify your account."}

# --- ROUTE 2: VERIFY TOKEN ---
@router.get("/verify")
def verify_email(token: str, db: Session = Depends(get_db)):
    try:
        email = serializer.loads(token, salt="email-verify", max_age=3600)
    except (SignatureExpired, BadTimeSignature):
        raise HTTPException(status_code=400, detail="Invalid or expired link.")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    if user.is_verified:
        return {"message": "Account is already verified."}

    user.is_verified = True
    db.commit()
    return {"message": "Account verified successfully!"}

# --- ROUTE 3: LOGIN ---
@router.post("/login")
def login_user(user_data: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user or not pwd_context.verify(user_data.password, user.hashed_password):
        raise HTTPException(status_code=403, detail="Invalid Credentials")
        
    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Please verify your email address before logging in.")

    return {"message": "Login successful!", "user_id": user.id}