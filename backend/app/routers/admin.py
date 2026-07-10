# backend/app/routers/admin.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.routers.auth import get_current_admin # Import the gatekeeper!
from app.models import User

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/users")
def get_all_users(db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    # This endpoint is now 100% protected
    return db.query(User).all()

@router.patch("/users/{user_id}/balance")
def update_user_balance(user_id: int, new_balance: float, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)):
    user = db.query(User).filter(User.id == user_id).first()
    user.balance = new_balance
    db.commit()
    return {"message": "Balance updated"}