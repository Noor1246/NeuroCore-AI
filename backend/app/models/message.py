from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.base import Base


class Message(Base):

    __tablename__ = "messages"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    conversation_id = Column(
        Integer,
        ForeignKey("conversations.id")
    )


    role = Column(
        String
    )


    content = Column(
        Text
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


    conversation = relationship(
        "Conversation",
        back_populates="messages"
    )