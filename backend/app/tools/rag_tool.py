from app.services.vector_store import search_documents


def run(
    question: str,
    conversation_id: int
):

    results = search_documents(
        question,
        conversation_id
    )

    documents = results["documents"]
    metadatas = results["metadatas"]

    if not documents or not documents[0]:
        return None

    context = "\n\n".join(documents[0])

    sources = []

    seen = set()

    for metadata in metadatas[0]:

        source = metadata.get("source", "Unknown")

        page = metadata.get("page")

        key = (source, page)

        if key in seen:
            continue

        seen.add(key)

        sources.append(
            {
                "title": source,
                "page": page,
                "type": "document"
            }
        )

    return {

        "context": context,

        "source_type": "DOCUMENT",

        "sources": sources

    }