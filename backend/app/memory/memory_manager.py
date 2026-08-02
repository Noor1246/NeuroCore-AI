from app.memory.memory_store import store_memory
from app.memory.memory_search import search_memory
from app.memory.memory_filter import should_store_memory

def save_message(
    conversation_id: int,
    role: str,
    content: str,
    message_id: int
):

    if role != "user":
        return

    if not content.strip():
        return

    if should_store_memory(content):

        store_memory(
            conversation_id,
            role,
            content,
            message_id
        )


def get_relevant_memories(
    conversation_id: int,
    question: str
):

    memories = search_memory(
        conversation_id,
        question
    )

    if not memories:
        return ""

    return "\n\n".join(memories)