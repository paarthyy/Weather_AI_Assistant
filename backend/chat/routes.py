from fastapi import APIRouter, Depends

from backend.auth.jwt_handler import get_current_user
from backend.chat.service import delete_chat_session
from backend.chat.models import ChatMessageRequest

from backend.chat.service import (
    create_chat_session,
    get_chat_sessions,
    get_chat_session,
    append_message
)

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/session")
async def new_chat(
    current_user=Depends(get_current_user)
):
    return await create_chat_session(
        str(current_user["_id"])
    )

@router.get("/sessions")
async def all_sessions(
    current_user=Depends(get_current_user)
):

    return await get_chat_sessions(
        str(current_user["_id"])
    )

@router.get("/session/{session_id}")
async def get_session(
    session_id: str,
    current_user=Depends(get_current_user)
):

    return await get_chat_session(
        session_id,
        str(current_user["_id"])
    )

from fastapi import HTTPException

@router.delete("/session/{session_id}")
async def delete_session(
    session_id: str,
    current_user=Depends(get_current_user)
):

    deleted = await delete_chat_session(
        session_id,
        str(current_user["_id"])
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    return {
        "success": True
    }
