from fastapi import APIRouter
from app.ai import llm

router = APIRouter(
    prefix="/models",
    tags=["Models"]
)


@router.get("/")
def get_models():

    return {
        "current": llm.CURRENT_MODEL,
        "models": [
            "llama3.2:3b",
            "deepseek-r1:7b",
            "mistral:7b",
            "gemma3:4b",
            "qwen2.5:7b"
        ]
    }


@router.post("/{model}")
def set_model(model: str):

    llm.CURRENT_MODEL = model

    return {
        "message": "Model Changed",
        "current": llm.CURRENT_MODEL
    }