from app.ai.embedding_model import get_embedding_model


def create_embeddings(chunks):

    model = get_embedding_model()

    embeddings = model.encode(
        chunks,
        convert_to_numpy=True
    )

    return embeddings


def create_embeddings(chunks):

    embeddings = model.encode(
        chunks,
        convert_to_numpy=True
    )

    return embeddings