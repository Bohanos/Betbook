from dotenv import load_dotenv
import os

# Load the environment variables from the .env file
load_dotenv()    

from fastapi import FastAPI
from app.database import engine, Base
from app.routers import auth, games, bets, admin
from app.models import User, Game, Bet
from fastapi.middleware.cors import CORSMiddleware

# This reads the models.py and creates the exact tables in pgAdmin!
Base.metadata.create_all(bind=engine)

app = FastAPI(title="BetBook API")

# --- CORS CONFIGURATION ---
origins = ["http://localhost:5173",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers
app.include_router(auth.router)
app.include_router(games.router)
app.include_router(bets.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the BetBook API! 🚀"}
