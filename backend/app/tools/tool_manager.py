from app.ai.router import route_question

from app.tools.rag_tool import run as rag_tool
from app.tools.web_tool import run as web_tool
from app.tools.calculator_tool import run as calculator_tool

def run(
    question: str,
    conversation_id: int
):
    if any(
        ch.isdigit()
        for ch in question
    ):

        calc = calculator_tool(question)

        if calc:

            return calc
    decision = route_question(
        question,
        conversation_id
    )

    print("Decision:", decision)

    if decision == "WEB":
        return web_tool(question)

    if decision == "DOCUMENT":

        return rag_tool(
            question,
            conversation_id
        )

    return {

        "context": "",

        "source_type": "GENERAL",

        "sources": []

    }