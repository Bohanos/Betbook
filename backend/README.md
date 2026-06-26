# BetBook Backend API ⚙️

This is the backend server for BetBook, providing a high-performance REST API built with FastAPI and SQLAlchemy.

## 📋 Prerequisites

Ensure you have the following installed on your local machine:
*   Python (3+)
*   pip (Python package installer)

## 🛠️ Local Setup Instructions

**1. Navigate to the backend directory**
```bash
cd backend


**2. Create a Virtual Environment**
Keep your dependencies isolated by creating a virtual environment.

python -m venv venv


**3. Activate the Virtual Environment**

Windows: venv\Scripts\activate or source venv/Scripts/activate #if you're using gitbash's terminal

Mac/Linux: source venv/bin/activate


**4. Install Dependencies**
pip install -r requirements.txt


**5. Environment Variables**
Create a .env file in the root of the backend directory. You will need to configure your secret keys and third-party API credentials here.

# Example .env configuration
RESEND_API_KEY=your_resend_api_key_here


**6. Start the Server**
Run the Uvicorn server with auto-reload enabled for development.

uvicorn app.main:app --reload


Note: Ensure app.main:app correctly points to your FastAPI instance location.

📚 API Documentation
One of the great features of FastAPI is automatic documentation. Once your server is running, you can view and test all endpoints interactively by visiting:

Swagger UI: http://127.0.0.1:8000/docs

ReDoc: http://127.0.0.1:8000/redoc

🏗️ Core Modules
auth.py: Handles secure user registration, login, and the smart email verification system.

models.py: Contains the SQLAlchemy database models defining the schema for users, bookings, and game operations.

games.py: Manages the core betting and game operations logic.

database.py: Handles database connections and session management.