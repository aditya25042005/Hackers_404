# 🧠 Career Advisor Chatbot

A full-stack AI-powered chatbot that provides career advice tailored to users' interests, strengths, and preferences. It uses **React** for the frontend, **Express.js** as a middleware API layer, and **Flask** to process AI responses with **Google Gemini**. It stores user data and history in **MongoDB**.


# Career Advisor Chatbot

This is a Python-based chatbot that provides career advice based on user input. It interacts with users to collect their interests, strengths, education level, and job preferences, then suggests potential career paths using Google's Gemini API. The chatbot also stores user conversations in a MongoDB database and allows users to ask follow-up questions.

## Features

- Interactive chatbot that acts like a professional career counselor
- Collects key user information:
  - Interests
  - Strengths
  - Education
  - Preferences
- Generates personalized career suggestions
- Stores full chat history and user responses in a MongoDB collection
- Allows returning users to ask follow-up questions based on their profile

## 🛠️ Technologies Used

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Frontend     | React.js                             |
| API Backend  | Express.js (Node.js)                 |
| AI Backend   | Flask (Python) + Google Gemini API   |
| Database     | MongoDB (via PyMongo)                |
| Env Config   | python-dotenv                        
#


## 🚀Setup Instructions

### 📁1. Clone the Repository

```bash
git clone https://github.com/aditya25042005/Hackers_404.git
cd hackers_404

### 🖥️ 2. Frontend (React)
```bash

cd frontend/CertifoHackathon
npm install
npm run dev

###  🌐3.  Backend (Express.js)

cd backend_express
npm install
npm run dev

###  🧠 4. AI Backend (Flask + Gemini)

cd flask
pip install -r req.txt
python app.py
