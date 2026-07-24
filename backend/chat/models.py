from pydantic import BaseModel
from typing import List
from datetime import datetime


class Message(BaseModel):
    role: str
    content: str
    timestamp: datetime | None = None


class ChatSession(BaseModel):
    user_id: str
    title: str
    created_at: datetime
    updated_at: datetime
    messages: List[Message]


class ChatMessageRequest(BaseModel):
    session_id: str
    message: str