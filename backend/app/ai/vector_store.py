import chromadb

client = chromadb.Client()

collection = client.get_or_create_collection(
    name="neurocore_documents"
)


def add_document(text, embedding):

    collection.add(
        documents=[text],
        embeddings=[embedding],
        ids=[str(hash(text))]
    )


def search_document(embedding):

    result = collection.query(
        query_embeddings=[embedding],
        n_results=5,
        include=["documents", "distances"]
    )

    return result