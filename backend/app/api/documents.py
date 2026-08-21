from fastapi import APIRouter, UploadFile, File

from app.documents.loader import load_pdf
from app.documents.splitter import split_text
from app.ai.embedding_model import get_embedding
from app.ai.vector_store import add_document


router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...)
):

    path = f"./{file.filename}"

    with open(path, "wb") as f:
        f.write(
            await file.read()
        )

    text = load_pdf(path)

    chunks = split_text(text)

    for chunk in chunks:

        embedding = get_embedding(chunk)

        add_document(
            chunk,
            embedding
        )

    return {
        "message": "Document processed successfully",
        "chunks": len(chunks)
    }