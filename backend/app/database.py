import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# 1. Load the environment variables from the .env file
load_dotenv()

# 2. Get the database URL
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# 3. Create the SQLAlchemy "Engine" (The core connection)
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 4. Create a Session factory (How we talk to the DB in routes)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 5. Create the Base class (Our models will inherit from this)
Base = declarative_base()

# 6. Dependency function (Hands a fresh database connection to each API request)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
