from dotenv import load_dotenv
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import os
import reviews

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


@app.get("/api/reviews")
def get_reviews():
    df = reviews.get_reviews()
    return Response(df.to_json(orient="records"), media_type="application/json")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
