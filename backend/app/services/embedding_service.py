from app.ai.embedding_model import get_embedding

def create_embeddings(chunks):
    embeddings = [get_embedding(chunk) for chunk in chunks]
    return embeddings