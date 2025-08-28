from fastapi import APIRouter
from .utils import get_df_response
from app.data import users as data
from app.classes import UserWrite, UserUpdate

router = APIRouter(tags=["users"])


@router.get("/users")
async def get_user(user_provider_id: str):
    return get_df_response(data.get_user(user_provider_id=user_provider_id))


@router.post("/user")
async def create_user(user: UserWrite):
    ret = data.create_user(user)
    return ret


@router.post("/userUpdate")
async def update_user(user: UserUpdate):
    ret = data.update_user(user)
    return ret
