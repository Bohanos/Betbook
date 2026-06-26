from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Enum, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base


# Define statuses for games and bets
class GameStatus(str, enum.Enum):
    PENDING = "pending"
    LIVE = "live"
    FINISHED = "finished"

class BetStatus(str, enum.Enum):
    PENDING = "pending"
    WON = "won"
    LOST = "lost"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    balance = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_verified = Column(Boolean, default=False)

    # Relationships
    bets = relationship("Bet", back_populates="owner")

class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    home_team = Column(String, nullable=False)
    away_team = Column(String, nullable=False)
    home_odds = Column(Float, nullable=False)
    away_odds = Column(Float, nullable=False)
    status = Column(Enum(GameStatus), default=GameStatus.PENDING)
    
    # Relationships
    bets = relationship("Bet", back_populates="game")

class Bet(Base):
    __tablename__ = "bets"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    chosen_team = Column(String, nullable=False)
    status = Column(Enum(BetStatus), default=BetStatus.PENDING)
    
    # Foreign Keys linking to Users and Games
    user_id = Column(Integer, ForeignKey("users.id"))
    game_id = Column(Integer, ForeignKey("games.id"))

    # Relationships
    owner = relationship("User", back_populates="bets")
    game = relationship("Game", back_populates="bets")