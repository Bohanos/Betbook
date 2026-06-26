# BetBook 🎲

BetBook is a comprehensive full-stack application designed for managing betting bookings. It features a robust, state-driven frontend integrated with a secure and highly reliable API backend.

## 🚀 Project Architecture

This project is structured as a monorepo containing both the client and server applications:

*   **`/frontend`**: The user interface, built with React and Vite. It handles state management, routing, and responsive dashboard UI components.
*   **`/backend`**: The RESTful API, built with Python and FastAPI. It manages database models, user authentication, game operations, and third-party integrations.

## 🛠️ Tech Stack

**Frontend Interface:**
*   React
*   Vite
*   JavaScript 

**Backend & Database:**
*   Python
*   FastAPI
*   SQLAlchemy (ORM)
*   SQL Database Management
*   Resend API (Email Delivery Architecture)

## ✨ Key Features

*   **Smart Registration Flow**: Intelligently handles network interruptions and ISP restrictions, allowing users to safely re-trigger email verification without duplicate database entry errors.
*   **Secure Authentication**: Custom authentication routes ensuring protected access to betting and booking data.
*   **Game Operations Engine**: Core backend logic dedicated to managing distinct betting events and booking parameters.

## 🏁 Quick Start

To run this project locally, you will need to start both the frontend and backend servers.

**1. Clone the repository**
```bash
git clone [https://github.com/Bohanos/Betbook.git](https://github.com/Bohanos/Betbook.git)
cd Betbook

**2. Start the Backend API**
Please refer to the backend/README.md for detailed instructions on setting up your Python environment, database, and environment variables.

**3. Start the Frontend UI**
Navigate to the frontend directory to install dependencies and boot the application.

cd frontend
cd bet-book
npm install
npm run dev