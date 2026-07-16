from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.routers.auth import get_current_admin
from app.models import User
from app.schemas import DepositSchema

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/users")
def get_all_users(db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    return db.query(User).all()

# --- NEW: Deposit Endpoint ---
@router.patch("/deposit")
def deposit_funds(
    data: DepositSchema, 
    db: Session = Depends(get_db), 
    admin: User = Depends(get_current_admin)
):
    # 1. Find the user and handle potential error if not found
    user = db.query(User).filter(User.id == data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    print(f"Admin {admin.email} is depositing funds for user {user.email}") # Using the variable
    # 2. Add the amount to the current balance (safer than setting it directly)
    user.balance += data.amount
    
    db.commit()
    db.refresh(user)
    
    return {"message": f"Successfully added {data.amount} to {user.email}", "new_balance": user.balance}

# --- OPTIONAL: Keep your existing setter if you still want to "Force set" a balance ---
@router.patch("/users/{user_id}/balance")
def update_user_balance(user_id: int, new_balance: int, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.balance = new_balance
    db.commit()
    return {"message": "Balance updated successfully", "new_balance": user.balance}