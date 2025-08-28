from fastapi import APIRouter
from .utils import get_df_response
from app.data import avatars as data

router = APIRouter(tags=["avatars"])


@router.get("/avatars")
async def get_avatars():
    return get_df_response(data.get_avatars())


@router.get("/avatarUrl")
async def get_avatar(avatar_description: str):
    return get_df_response(data.get_avatar(avatar_description))
