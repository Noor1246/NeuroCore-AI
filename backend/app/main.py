from dotenv import load_dotenv
import os
from app.api.models import router as models_router
load_dotenv()



from fastapi import FastAPI

from app.api.health import router as health_router
from app.database.database import engine
from app.database.base import Base
import app.models
from app.api.ai import router as ai_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.documents import router as documents_router
from app.api.auth import router as auth_router
from app.database.database import engine
from app.database.base import Base
from app.api.conversations import router as conversation_router

from app.models.user import User
from app.models.conversation import Conversation
from app.models.message import Message
from app.api.upload import router as upload_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="NeuroCore AI API",
    version="1.0.0",
    description="Enterprise AI Operating System",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "https://your-frontend-domain.vercel.app"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=[
        "X-Conversation-ID"
    ]
)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(ai_router)
app.include_router(conversation_router)
app.include_router(documents_router)
app.include_router(upload_router)
app.include_router(models_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to NeuroCore AI 🚀"
    }