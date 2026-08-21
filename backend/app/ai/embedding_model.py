# import os
# from dotenv import load_dotenv
# from openai import OpenAI

# load_dotenv()

# client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# def get_embedding(text: str):
#     response = client.embeddings.create(
#         model="text-embedding-3-small",
#         input=text
#     )
#     return response.data[0].embedding
import hashlib
import math


EMBEDDING_DIMENSION = 256


def get_embedding(text: str):

    vector = [0.0] * EMBEDDING_DIMENSION

    words = text.lower().split()

    for word in words:

        digest = hashlib.sha256(
            word.encode("utf-8")
        ).digest()

        index = int.from_bytes(
            digest[:4],
            "big"
        ) % EMBEDDING_DIMENSION

        vector[index] += 1.0

    magnitude = math.sqrt(
        sum(x * x for x in vector)
    )

    if magnitude > 0:

        vector = [
            x / magnitude
            for x in vector
        ]

    return vector