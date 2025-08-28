from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from app.routers import places, reviews, users, avatars

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

app.include_router(places.router)
app.include_router(reviews.router)
app.include_router(users.router)
app.include_router(avatars.router)


@app.get("/")
async def get_avatars():
    return {"msg": "its working"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
