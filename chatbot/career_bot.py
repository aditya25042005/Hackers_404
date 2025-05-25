from datetime import datetime
from db import get_db
from langchain_groq import ChatGroq
from bson import ObjectId
from dotenv import load_dotenv
import os
import uuid
load_dotenv()  # Load environment variables from .env file if needed
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")

db = get_db()  # make sure get_db returns client["test"] as per your setup
histories = db["histories"]  # use the 'histories' collection

llm = ChatGroq(temperature=0.7, model_name="llama3-8b-8192")

def start_session():
    email = input("Please enter your email: ").strip()
    session = {
        "email": email,  
        "started_at": datetime.now(),
        "updated_at": datetime.now(),
        "user_answers": {},
        "chat_history": []
    }
    return histories.insert_one(session).inserted_id

def add_message(session_id, sender, text):
    histories.update_one(
        {"_id": ObjectId(session_id)},
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
    histories.update_one(
        {"_id": ObjectId(session_id)},
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
Act like a professional career counselor.Talk to the user in a friendly and helpful tone.
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
    suggestion = llm.invoke(prompt).content
    add_message(session_id, "bot", suggestion)
    print(f"\n🎯 Suggestion:\n{suggestion}")

    # Phase 3: Follow-up Q&A
    while True:
        user_question = input("\nAsk a follow-up (or type 'quit'): ")
        if user_question.lower() == "quit":
            print("🔚 Session ended.")
            break

        full_prompt = f"Based on the user's profile {answers}, answer the question: {user_question}"
        response = llm.invoke(full_prompt).content
        add_message(session_id, "user", user_question)
        add_message(session_id, "bot", response)
        print(f"🤖 {response}")

if __name__ == "__main__":
    run_bot()
