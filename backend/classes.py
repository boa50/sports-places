from pydantic import BaseModel


class ReviewWrite(BaseModel):
    user_id: int
    place_id: int
    lat: float
    lng: float
    rating: int


class PlaceWrite(BaseModel):
    lat: float
    lng: float
