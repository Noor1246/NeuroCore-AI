from app.database.database import SessionLocal
from app.models.user import User
from app.models.conversation import Conversation
from app.models.message import Message

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()