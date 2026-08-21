# import chromadb
# from app.ai.embedding_model import get_embedding

# client = chromadb.PersistentClient(
#     path="memory_db"
# )

# collection = client.get_or_create_collection(
#     name="conversation_memory",
#     embedding_function=None
# )

# def search_memory(
#     conversation_id: int,
#     question: str,
#     n_results: int = 5
# ):
#     embedding = get_embedding(question)

#     results = collection.query(

#         query_embeddings=[
#             embedding
#         ],

#         n_results=n_results,

#         where={
#             "conversation_id": conversation_id
#         }

#     )

#     if not results["documents"] or not results["documents"][0]:

#         return []

#     return results["documents"][0]
import chromadb
from app.ai.embedding_model import get_embedding

client = chromadb.PersistentClient(
    path="memory_db"
)

collection = client.get_or_create_collection(
    name="conversation_memory",
    embedding_function=None
)

def search_memory(
    conversation_id: int,
    question: str,
    n_results: int = 5
):
    embedding = get_embedding(question)

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