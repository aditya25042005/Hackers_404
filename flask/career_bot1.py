import google.generativeai as genai
from datetime import datetime
from db import get_db
from dotenv import load_dotenv
import os
import uuid
from langchain.prompts import PromptTemplate
# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize database
db = get_db()

# Initialize Gemini model
model = genai.GenerativeModel("gemini-2.0-flash")
questions = [
        ("interests", "What subjects or activities do you enjoy the most?"),
        ("strengths", "What are your top 3 strengths or skills?"),
        ("education", "What is your highest level of education?"),
        ("preferences", "Do you have any preferences for your future job? (e.g., remote work, good salary, creative role)")
    ]
def start_session(email):
    unique_email = email
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

def run_bot(email,user_new,message,questions):
    print(f"Email: {email}, User New: {user_new}, Message: {message}, Questions: {questions}")
    print(user_new)
    
    # Phase 1: Ask questions
    collection=db.histories
    user_doc = collection.find_one({"email": email}, {"_id": 1, "user_answers": 1})
    
    answers = {}
    print("Welcome to the Career Bot!")
    if user_new==True:
        session_id = start_session(email)
        for qdict in questions: 
          for key, question in qdict.items():
 
            add_message(session_id, "bot", key)
            print(f" {question}")
            answer = question
            add_message(session_id, "user", answer)
            answers[key] = answer
            update_answers(session_id, key, answer)

            # Phase 2: Career Suggestion
        prompt = f"""
You are a professional career counselor.

Based on this user profile:
- Interests: {answers.get('interests', 'Not provided')}
- Strengths: {answers.get('strengths', 'Not provided')}
- Education: {answers.get('education', 'Not provided')}
- Preferences: {answers.get('preferences', 'Not provided')}

Provide career suggestions strictly in the following numbered format:
1. Career Path 1: <Description>
2. Skills: <key skills for Career Path 1>
3. Resources:
https://resource1.com
https://resource2.com

4. Career Path 2: <Description>
5. Skills: <key skills for Career Path 2>
6. Resources:
https://resource3.com
https://resource4.com

Only include URLs for resources, no extra text in the resources sections.give answer in hypertext format html so frontend can just render it ,remove all stars,don't add css just html tags ,directly start from content inside body  remove body tag ,directly start from content inside body
Begin now:
"""
        response = model.generate_content(prompt)
        suggestion = response.text
        add_message(session_id, "bot", suggestion[7:-3])
        print(f"\n Suggestion:\n{suggestion}")
            

    # Phase 3: Follow-up Q&A
    elif user_new==False and user_doc:
        print("Welcome back! Let's continue.")
        user_question = message
        answers = user_doc["user_answers"]
        print(answers)
        follow_up_prompt = f"""
You are a professional career counselor.

Based on this user profile:
- Interests: {answers.get('interests', 'Not provided')}
- Strengths: {answers.get('strengths', 'Not provided')}
- Education: {answers.get('education', 'Not provided')}
- Preferences: {answers.get('preferences', 'Not provided')}
give answer in hypertext format html so frontend can just render it ,remove all stars,don't add css just html tags ,directly start from content inside body  remove body tag ,directly start from content inside body,give ready to put code in html format.


User's question: {user_question}
"""
        response = model.generate_content(follow_up_prompt)
        answer = response.text
        #fron user_doc
        session_id = user_doc["_id"]
        add_message(session_id, "user", user_question)
        add_message(session_id, "bot", answer[7:-3])
        print(f" {answer[6:-3]}")

if __name__ == "__main__":
    run_bot()
