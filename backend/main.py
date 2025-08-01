from dotenv import load_dotenv
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import os
import data
from classes import Review

load_dotenv()

app = FastAPI()

cors_origins = os.environ.get("CORS_ORIGINS")
if cors_origins is not None:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins.split(" "),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.get("/api/livetest")
def livetest():
    return {"message": "Server Running!"}


@app.get("/api/places")
def get_places():
    df = data.get_places()
    return Response(df.to_json(orient="records"), media_type="application/json")


@app.get("/api/reviews")
def get_reviews(place_id: str):
    df = data.get_reviews(place_id=place_id)
    return Response(df.to_json(orient="records"), media_type="application/json")


@app.post("/api/review")
async def create_review(review: Review):
    ret = data.create_review(review)
    return ret


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
