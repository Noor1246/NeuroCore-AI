from fastapi import APIRouter, UploadFile, File, Form
import shutil
import os

from app.services.document_loader import extract_text
from app.services.text_chunker import chunk_text
from app.services.embedding_service import create_embeddings
from app.services.vector_store import store_embeddings

router = APIRouter(
    prefix="/ai",
    tags=["Upload"]
)

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    conversation_id: int = Form(...)
):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    # Extract text
    text = extract_text(file_path)

    # Split into chunks
    chunks = chunk_text(text)

    # Create embeddings
    embeddings = create_embeddings(chunks)

    # Store embeddings with conversation ID
    store_embeddings(
        chunks,
        embeddings,
        file.filename,
        conversation_id
    )

    print(f"Conversation ID: {conversation_id}")
    print(f"Embedding shape: {embeddings.shape}")
    print(f"Total Chunks: {len(chunks)}")

    for i, chunk in enumerate(chunks[:3]):
        print(f"\nChunk {i + 1}\n")
        print(chunk[:300])

    return {
        "filename": file.filename,
        "characters": len(text),
        "chunks": len(chunks),
        "embeddings": len(embeddings),
        "conversation_id": conversation_id,
        "stored": True,
        "message": "Upload successful"
    }