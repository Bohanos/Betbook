from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.routers.auth import get_current_user
from app.database import get_db
from app.models import Bet, User, Game, BetStatus
from app.schemas import BetCreate, BetResponse


MIN_BET_AMOUNT = 100
router = APIRouter(prefix="/bets", tags=["Bets"])

@router.get("/my-bets", response_model=list[BetResponse])
def get_my_bets(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Bet).filter(Bet.user_id == current_user.id).all()

@router.post("/book", response_model=BetResponse)
def book_game(bet_data: BetCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    
    # 1. Check if the game exists
    game = db.query(Game).filter(Game.id == bet_data.game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    
   # Minimum Bet Check 
    if bet_data.amount < MIN_BET_AMOUNT:
        raise HTTPException(
            status_code=400, 
            detail=f"Minimum bet amount is {MIN_BET_AMOUNT}"
        )

    # 2. Check if user has enough balance (The Bank logic)
    # Note: Your model uses integer for balance, make sure math matches!
    if current_user.balance < bet_data.amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")

    # 3. Deduct balance and create the bet
    current_user.balance -= int(bet_data.amount) 
    
    new_bet = Bet(
        amount=bet_data.amount,
        chosen_team=bet_data.chosen_team,
        user_id=current_user.id,
        game_id=game.id,
        status=BetStatus.PENDING
    )

    db.add(new_bet)
    db.commit()
    db.refresh(new_bet)

    return new_bet