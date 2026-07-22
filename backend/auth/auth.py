from .utils import hash_password, verify_password
from .schemas import SignupRequest, LoginRequest
from ..database import users
from fastapi import HTTPException


async def signup(user: SignupRequest):

    existing = await users.find_one(
        {"email": user.email}
    )

    if existing:
        return {
            "success": False,
            "message": "Email already exists."
        }

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password)
    }

    await users.insert_one(new_user)

    return {
        "success": True,
        "message": "User created successfully."
    }


async def login(user: LoginRequest):

    db_user = await users.find_one(
        {"email": user.email}
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "success": True,
        "message": "Login Successful",
        "name": db_user["name"],
        "email": db_user["email"]
    }