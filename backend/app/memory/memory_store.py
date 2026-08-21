import chromadb
from app.ai.embedding_model import get_embedding

client = chromadb.PersistentClient(
    path="memory_db"
)

collection = client.get_or_create_collection(
    name="conversation_memory",
    embedding_function=None
)



def store_memory(
    conversation_id: int,
    role: str,
    content: str,
    message_id: int
):
    embedding = get_embedding(content)

    collection.add(

        ids=[
            f"{conversation_id}_{message_id}"
        ],

        documents=[
            content
        ],

        embeddings=[
            embedding
        ],

        metadatas=[
            {
                "conversation_id": conversation_id,
                "role": role
            }
        ]

    )