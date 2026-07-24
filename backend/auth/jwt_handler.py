from jose import jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from backend.database import users

security = HTTPBearer()

SECRET_KEY = "weatherops_super_secret_key_change_this"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: dict):

    payload = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload.update(
        {
            "exp": expire
        }
    )

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

from jose import JWTError

def verify_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:

        return None

async def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(security)

):

    token = credentials.credentials

    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    email = payload.get("email")

    if email is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = await users.find_one(
        {
            "email": email
        }
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user