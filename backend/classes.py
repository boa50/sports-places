from pydantic import BaseModel


class ReviewWrite(BaseModel):
    user_id: int
    place_id: int
    lat: float
    lng: float
    experience_date: str
    rating: int
    route_link: str | None


class PlaceWrite(BaseModel):
    lat: float
    lng: float


class UserWrite(BaseModel):
    user_provider_id: str
    avatar: str
    display_name: str
