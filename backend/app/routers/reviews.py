from fastapi import APIRouter
from .utils import get_df_response
from app.data import reviews as data, utils as data_utils
from app.classes import ReviewWrite

router = APIRouter(tags=["reviews"])


@router.get("/checkLink")
async def check_trusted_url(url: str):
    ret = data_utils.check_trusted_url(url)
    return ret


@router.get("/reviews")
async def get_reviews(place_id: str):
    return get_df_response(data.get_reviews(place_id=place_id))


@router.post("/review")
async def create_review(review: ReviewWrite):
    ret = data.create_review(review)
    return ret
