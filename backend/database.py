import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

from pathlib import Path

env_path = Path(__file__).parent / ".env"

load_dotenv(env_path)

MONGODB_URI = os.getenv("MONGODB_URI")
print("Mongo URI:", MONGODB_URI)

client = AsyncIOMotorClient(MONGODB_URI)

db = client["weatherops"]

users = db["users"]