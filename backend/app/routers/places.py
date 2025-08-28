from fastapi import APIRouter
from .utils import get_df_response
from app.data import places as data

router = APIRouter(tags=["places"])


@router.get("/places")
async def get_places():
    return get_df_response(data.get_places())
