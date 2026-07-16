from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime
from app.models import GameStatus, BetStatus

# --- USER SCHEMAS ---
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    balance: float
    created_at: datetime
    is_admin: bool

    model_config = ConfigDict(from_attributes=True)

# --- GAME SCHEMAS ---
class GameResponse(BaseModel):
    id: int
    home_team: str
    away_team: str
    home_odds: float
    away_odds: float
    status: GameStatus

    model_config = ConfigDict(from_attributes=True)

# --- BET SCHEMAS ---
class BetCreate(BaseModel):
    game_id: int
    amount: float
    chosen_team: str

class BetResponse(BaseModel):
    id: int
    amount: float
    chosen_team: str
    status: BetStatus
    game_id: int

    model_config = ConfigDict(from_attributes=True)

# --- ADMIN DEPOSIT SCHEMAS ---
class DepositSchema(BaseModel):
    user_id: int
    amount: int  # Amount in kobo/cents (e.g., 1000 = 10.00)