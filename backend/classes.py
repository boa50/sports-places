from pydantic import BaseModel


class Review(BaseModel):
    userId: int
    lat: float
    long: float
    txt: str
