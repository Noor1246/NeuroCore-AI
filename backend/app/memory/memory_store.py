import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(
    path="memory_db"
)

collection = client.get_or_create_collection(
    name="conversation_memory"
)

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def store_memory(
    conversation_id: int,
    role: str,
    content: str,
    message_id: int
):

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