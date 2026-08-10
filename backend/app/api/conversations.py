from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.conversation import Conversation
from app.models.message import Message


router = APIRouter(
    prefix="/ai",
    tags=["Conversations"]
)



# Get all conversations

@router.get("/conversations")
def get_conversations(
    db: Session = Depends(get_db)
):

    conversations = db.query(
        Conversation
    ).order_by(
        Conversation.created_at.desc()
    ).all()


    return conversations




# Get messages of a conversation

@router.get("/conversations")
def get_conversations(
    agent: str = "general",
    db: Session = Depends(get_db)
):

    conversations = db.query(
        Conversation
    ).filter(
        Conversation.agent == agent
    ).order_by(
        Conversation.created_at.desc()
    ).all()


    return conversations




# Create new chat

@router.post("/new-chat")
def new_chat(
    agent: str = "general",
    db: Session = Depends(get_db)
):

    conversation = Conversation(
        title="New Chat",
        agent=agent
    )


    db.add(conversation)
    db.commit()
    db.refresh(conversation)


    return {
        "conversation_id": conversation.id
    }