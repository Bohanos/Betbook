from app.database import SessionLocal
from app.models import User

db = SessionLocal()
user = db.query(User).filter(User.email == "mgbojichinonsojoshua@gmail.com").first()
if user:
    user.is_admin = True
    db.commit()
    print(f"User {user.email} is now an admin!")
else:
    print("User not found.")
db.close()