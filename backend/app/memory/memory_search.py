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


def search_memory(
    conversation_id: int,
    question: str,
    n_results: int = 5
):

    embedding = embedding_model.encode(
        question
    ).tolist()

    results = collection.query(

        query_embeddings=[
            embedding
        ],

        n_results=n_results,

        where={
            "conversation_id": conversation_id
        }

    )

    if not results["documents"] or not results["documents"][0]:

        return []

    return results["documents"][0]