from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get MongoDB URI from environment variable
MONGODB_URI = os.getenv("MONGODB_URI")

# Optional: Specify database name here
DB_NAME = "test"  # Replace with your actual DB name

# Reuse client and DB connection
client = MongoClient(MONGODB_URI)
db = client[DB_NAME]

def get_db():
    return db
