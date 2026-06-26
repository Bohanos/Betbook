from fastapi import FastAPI
from app.database import engine, Base
from app.routers import auth, games, bets
from app.models import User, Game, Bet
from fastapi.middleware.cors import CORSMiddleware #for connecting frontend

# This reads your models.py and creates the exact tables in pgAdmin!
Base.metadata.create_all(bind=engine)

app = FastAPI(title="BetBook API")

# --- ADD THIS CORS CONFIGURATION ---
origins = [
    "http://localhost:3000", # Standard React port
    "http://localhost:5173", # Vite React port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)

# Include our routers
app.include_router(auth.router)
app.include_router(games.router)
app.include_router(bets.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the BetBook API! 🚀"}