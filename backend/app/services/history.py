from sqlalchemy.orm import Session

from app.models.message import Message


def get_chat_history(
    db: Session,
    conversation_id: int,
    limit: int = 10
):

    messages = (
        db.query(Message)
        .filter(
            Message.conversation_id == conversation_id
        )
        .order_by(
            Message.created_at.desc()
        )
        .limit(limit)
        .all()
    )

    messages.reverse()

    history = ""

    for msg in messages:

        history += f"""
        {msg.role} message:
        {msg.content}

        """

    return history
def get_last_user_message(
    db: Session,
    conversation_id: int
):

    message = (
        db.query(Message)
        .filter(
            Message.conversation_id == conversation_id,
            Message.role == "user"
        )
        .order_by(
            Message.created_at.desc()
        )
        .offset(1)      # Skip the current user message
        .first()
    )

    if message:
        return message.content

    return ""