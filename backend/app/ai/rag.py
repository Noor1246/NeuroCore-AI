from app.services.vector_store import search_documents
from app.services.web_search import search_web
from app.ai.router import route_question


def get_context(
    question: str,
    conversation_id: int
):

    print("\n========== RAG ==========")
    print("Question:", question)

    # -------------------------------
    # Step 1 : Fast Router
    # -------------------------------

    decision = route_question(
        question,
        ""
    )

    print("Initial Decision:", decision)

    # -------------------------------
    # WEB SEARCH
    # -------------------------------

    if decision == "WEB":

        print("Using Web Search...")

        web_context = search_web(question)

        print("Web Context Length:", len(web_context))

        return {

            "context": web_context,

            "source_type": "WEB",

            "sources": ["Web Search"]

        }

    # -------------------------------
    # DOCUMENT SEARCH
    # -------------------------------

    results = search_documents(
        question,
        conversation_id
    )

    documents = results["documents"]
    metadatas = results["metadatas"]

    if documents and documents[0]:

        document_context = "\n\n".join(
            documents[0]
        )

        decision = route_question(
            question,
            document_context
        )

        print("Document Decision:", decision)

        if decision == "DOCUMENT":

            sources = sorted(
                {
                    metadata["source"]
                    for metadata in metadatas[0]
                }
            )

            return {

                "context": document_context,

                "source_type": "DOCUMENT",

                "sources": sources

            }

    # -------------------------------
    # GENERAL KNOWLEDGE
    # -------------------------------

    print("Using General Knowledge")

    return {

        "context": "",

        "source_type": "GENERAL",

        "sources": []

    }