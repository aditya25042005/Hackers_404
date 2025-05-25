import google.generativeai as genai
from datetime import datetime
from db import get_db
from dotenv import load_dotenv
import os
import uuid

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize database
db = get_db()

# Initialize Gemini model
model = genai.GenerativeModel("gemini-2.0-flash")

def start_session():
    unique_email = f"user_{uuid.uuid4()}@example.com"
    session = {
        "email": unique_email,
        "started_at": datetime.now(),
        "updated_at": datetime.now(),
        "status": "active",
        "user_answers": {},
        "chat_history": []
    }
    return db.histories.insert_one(session).inserted_id

def add_message(session_id, sender, text):
    db.histories.update_one(
        {"_id": session_id},
        {
            "$push": {"chat_history": {
                "from": sender,
                "text": text,
                "time": datetime.now()
            }},
            "$set": {"updated_at": datetime.now()}
        }
    )

def update_answers(session_id, key, answer):
    db.histories.update_one(
        {"_id": session_id},
        {"$set": {f"user_answers.{key}": answer}}
    )

def run_bot():
    session_id = start_session()
    
    # Phase 1: Ask questions
    questions = [
        ("interests", "What subjects or activities do you enjoy the most?"),
        ("strengths", "What are your top 3 strengths or skills?"),
        ("education", "What is your highest level of education?"),
        ("preferences", "Do you have any preferences for your future job? (e.g., remote work, good salary, creative role)")
    ]

    answers = {}

    for key, question in questions:
        add_message(session_id, "bot", question)
        print(f" {question}")
        answer = input("You: ")
        add_message(session_id, "user", answer)
        answers[key] = answer
        update_answers(session_id, key, answer)

    # Phase 2: Career Suggestion
    prompt = f"""
Act like a professional career counselor.

User Profile:
- Interests: {answers['interests']}
- Strengths: {answers['strengths']}
- Education: {answers['education']}
- Preferences: {answers['preferences']}

Suggest:
1. Two career paths with short explanations.
2. Key skills needed for each path.
3. Two beginner-friendly learning resources (with links) per path.
Respond in a friendly, helpful tone.
"""
    response = model.generate_content(prompt)
    suggestion = response.text
    add_message(session_id, "bot", suggestion)
    print(f"\n Suggestion:\n{suggestion}")

    # Phase 3: Follow-up Q&A
    while True:
        user_question = input("\nAsk a follow-up (or type 'quit'): ")
        if user_question.lower() == "quit":
            print(" Session ended.")
            break

        follow_up_prompt = f"Based on the user's profile {answers}, answer this question: {user_question}"
        response = model.generate_content(follow_up_prompt)
        answer = response.text
        add_message(session_id, "user", user_question)
        add_message(session_id, "bot", answer)
        print(f" {answer}")

if __name__ == "__main__":
    run_bot()
