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

## Technologies Used

### Backend
- **Python 3**: Core language for the chatbot logic
- **Flask**: Web framework to build REST APIs
- **Express.js**: Node.js framework to serve the application if required
- **MongoDB**: NoSQL database for storing chat history and user responses
- **PyMongo**: MongoDB client for Python
- **python-dotenv**: For managing environment variables
- **Google Generative AI (Gemini)**: Used to generate career suggestions via natural language prompts


## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/aditya25042005/Hackers_404.git
cd hackers_404
