import chromadb
from app.ai.embedding_model import get_embedding_model

client = chromadb.PersistentClient(
    path="memory_db"
)

collection = client.get_or_create_collection(
    name="conversation_memory"
)




def store_memory(
    conversation_id: int,
    role: str,
    content: str,
    message_id: int
):
    embedding_model = get_embedding_model()
    embedding = embedding_model.encode(
        content
    ).tolist()

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