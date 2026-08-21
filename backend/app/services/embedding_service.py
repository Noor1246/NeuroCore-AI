from app.core.embeddings import get_embedding_model


def create_embeddings(chunks):

    model = get_embedding_model()

    embeddings = model.encode(
        chunks,
        convert_to_numpy=True
    )

    return embeddings