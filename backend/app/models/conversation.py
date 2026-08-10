from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.base import Base


class Conversation(Base):

    __tablename__ = "conversations"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )


    title = Column(
        String,
        default="New Chat"
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


    messages = relationship(
        "Message",
        back_populates="conversation"
    )
    agent = Column(
        String,
        default="general"
    )