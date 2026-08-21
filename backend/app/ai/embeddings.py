from app.ai.embedding_model import get_embedding_model


class EmbeddingEngine:

    def __init__(self):
        self.model = get_embedding_model()

    def create_embedding(self, text):
        return self.model.encode(text).tolist()