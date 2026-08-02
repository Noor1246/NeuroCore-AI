import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.get_or_create_collection(
    name="documents"
)

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def store_embeddings(
    chunks,
    embeddings,
    filename,
    conversation_id
):
    """
    One active document per conversation.
    Whenever a new document is uploaded,
    remove every previous document in that conversation.
    """

    # Delete ALL existing documents in this conversation
    try:

        existing = collection.get(
            where={
                "conversation_id": conversation_id
            }
        )

        if existing["ids"]:

            collection.delete(
                ids=existing["ids"]
            )

            print(
                f"Deleted {len(existing['ids'])} old chunks from conversation {conversation_id}."
            )

    except Exception as e:

        print("Delete error:", e)

    ids = []
    documents = []
    vectors = []
    metadatas = []

    for i, chunk in enumerate(chunks):

        ids.append(
            f"{conversation_id}_{i}"
        )

        documents.append(chunk)

        vectors.append(
            embeddings[i].tolist()
        )

        metadatas.append({

            "source": filename,

            "chunk": i,

            "conversation_id": conversation_id

        })

    collection.add(

        ids=ids,

        documents=documents,

        embeddings=vectors,

        metadatas=metadatas

    )

    print(
        f"Stored {len(chunks)} chunks for '{filename}'."
    )


def search_documents(
    question: str,
    conversation_id: int,
    n_results: int = 5
):

    question_embedding = embedding_model.encode(
        question
    ).tolist()

    results = collection.query(

        query_embeddings=[
            question_embedding
        ],

        n_results=n_results,

        where={
            "conversation_id": conversation_id
        }

    )

    return {

        "documents": results["documents"],

        "distances": results["distances"],

        "metadatas": results["metadatas"]

    }