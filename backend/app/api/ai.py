from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.agents.agent_manager import get_agent_prompt
from app.tools.tool_manager import run as run_tool
from app.ai.llm import NeuroCoreLLM

from app.database.session import get_db
from app.models.conversation import Conversation
from app.models.message import Message
from app.services.history import (
    get_chat_history,
    get_last_user_message
)
from app.memory.memory_manager import (
    save_message,
    get_relevant_memories
)
import re


def format_code_blocks(text: str) -> str:
    """
    Backup formatter:
    If the AI returns raw Python code without ``` fences,
    wrap it automatically.
    """

    lines = text.splitlines()

    code_keywords = (
        "def ",
        "class ",
        "import ",
        "from ",
        "for ",
        "while ",
        "if ",
        "elif ",
        "else:",
        "return ",
        "try:",
        "except",
        "with "
    )

    code_lines = 0

    for line in lines:

        stripped = line.strip()

        if (
            stripped.startswith(code_keywords)
            or stripped.endswith(":")
            or "=" in stripped
        ):
            code_lines += 1

    if code_lines >= 3 and "```" not in text:

        return f"```python\n{text}\n```"

    return text
router = APIRouter(
    prefix="/ai",
    tags=["AI Engine"]
)


llm = NeuroCoreLLM()


class ChatRequest(BaseModel):
    message: str
    conversation_id: int | None = None
    agent: str = "general"

@router.post("/chat")
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db)
):

    message = request.message.lower().strip()
    agent_prompt = get_agent_prompt(
        request.agent
    )

    greetings = [
        "hello",
        "hi",
        "hey",
        "good morning",
        "good evening"
    ]


    if message in greetings:

        def generate():

            yield "Hello! I am NeuroCore AI. How can I help you today?"

        return StreamingResponse(
            generate(),
            media_type="text/plain"
        )



    # Use existing conversation or create new one

    if request.conversation_id:

        conversation = db.query(Conversation).filter(
            Conversation.id == request.conversation_id
        ).first()


        if conversation is None:

            conversation = Conversation(
                title=request.message[:50],
                agent=request.agent
            )

            db.add(conversation)
            db.commit()
            db.refresh(conversation)

        if conversation and conversation.title == "New Chat":

            conversation.title = request.message[:50]

            db.commit()
            db.refresh(conversation)



    else:

        conversation = Conversation(
            title=request.message[:50],
            agent=request.agent
        )

        db.add(conversation)
        db.commit()
        db.refresh(conversation)



    # Save user message

    user_message = Message(
        conversation_id=conversation.id,
        role="user",
        content=request.message
    )


    db.add(user_message)
    db.commit()
    db.refresh(user_message)

    save_message(
        conversation.id,
        "user",
        request.message,
        user_message.id
    )



    # Get document context

    # Get document/web/general context
    FOLLOW_UP = [
        "elaborate",
        "explain",
        "explain more",
        "more",
        "continue",
        "tell me more",
        "in detail",
        "details",
        "why",
        "how",
        "then",
        "after that",
        "what happened next"
    ]

    query = request.message

    if any(word in request.message.lower() for word in FOLLOW_UP):

        previous = get_last_user_message(
            db,
            conversation.id
        )

        if previous:
            query = previous + "\n" + request.message

    tool_result = run_tool(
        query,
        conversation.id
    )

    context = tool_result["context"]

    source_type = tool_result["source_type"]

    sources = tool_result["sources"]

    print("\n========== RAG ==========")
    print("Source Type:", source_type)
    print("Sources:", sources)
    print("Context:")
    print(context)
    print("=========================\n")

    if conversation:

        history = get_chat_history(
            db,
            conversation.id
        )
        print("\n========== HISTORY ==========")
        print(history)
        print("=============================\n")
        memory = get_relevant_memories(
            conversation.id,
            request.message
        )



    # Stream response

    def generate():

        ai_response = ""

        for chunk in llm.stream_response(
            request.message,
            context,
            history + "\n\nRelevant Memories:\n" + memory,
            source_type,
            sources,
            agent_prompt
        ):

            ai_response += chunk

            # Stream immediately
            yield chunk

        # Save formatted version to database
        ai_response = format_code_blocks(ai_response)

        ai_message = Message(
            conversation_id=conversation.id,
            role="ai",
            content=ai_response
        )

        db.add(ai_message)
        db.commit()



    return StreamingResponse(
        generate(),
        media_type="text/plain",
        headers={
            "X-Conversation-ID": str(conversation.id)
        }
    )