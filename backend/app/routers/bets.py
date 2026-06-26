from fastapi import APIRouter

router = APIRouter(prefix="/bets", tags=["Bets"])

@router.post("/book")
def book_game():
    return {"message": "Betting endpoint coming soon"}