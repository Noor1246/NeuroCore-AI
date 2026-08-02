from app.services.web_search import search_web


def run(
    question: str
):

    context = search_web(question)

    if not context:

        return None

    return {

        "context": context,

        "source_type": "WEB",

        "sources": ["Web Search"]

    }