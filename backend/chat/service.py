from datetime import datetime

from backend.database import chat_sessions


async def create_chat_session(user_id: str):

    document = {

        "user_id": user_id,

        "title": "New Chat",

        "created_at": datetime.utcnow(),

        "updated_at": datetime.utcnow(),

        "messages": []

    }

    result = await chat_sessions.insert_one(document)

    document["_id"] = str(result.inserted_id)

    return document

from pymongo import DESCENDING

async def get_chat_sessions(user_id: str):

    sessions = []

    cursor = chat_sessions.find(
        {
            "user_id": user_id
        }
    ).sort(
        "updated_at",
        DESCENDING
    )

    async for session in cursor:

        session["_id"] = str(session["_id"])

        sessions.append(session)

    return sessions


from bson import ObjectId

async def get_chat_session(session_id: str, user_id: str):

    session = await chat_sessions.find_one(
        {
            "_id": ObjectId(session_id),
            "user_id": user_id
        }
    )

    if session is None:
        return None

    session["_id"] = str(session["_id"])

    return session




async def append_message(
    session_id: str,
    role: str,
    content: str,
):
    await chat_sessions.update_one(
        {
            "_id": ObjectId(session_id)
        },
        {
            "$push": {
                "messages": {
                    "role": role,
                    "content": content,
                    "timestamp": datetime.utcnow()
                }
            },
            "$set": {
                "updated_at": datetime.utcnow()
            }
        }
    )

from bson import ObjectId

async def delete_chat_session(
    session_id: str,
    user_id: str
):

    result = await chat_sessions.delete_one(
        {
            "_id": ObjectId(session_id),
            "user_id": user_id
        }
    )

    return result.deleted_count == 1
