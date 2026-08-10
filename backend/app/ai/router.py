from app.tools.rag_tool import run as rag_tool

WEB_KEYWORDS = [

    "today",
    "latest",
    "current",
    "news",
    "weather",
    "temperature",
    "forecast",

    "live",
    "score",
    "match",
    "ipl",
    "fifa",
    "world cup",
    "olympics",
    "winner",

    "bitcoin",
    "crypto",
    "stock",
    "share",
    "price",
    "market",

    "president",
    "prime minister",
    "minister",
    "election",

    "apple",
    "google",
    "microsoft",
    "openai",
    "tesla",
    "meta",

    "release",
    "launch",
    "announcement",
    "breaking",

    "2025",
    "2026",
    "2027"

]


def route_question(
    question: str,
    conversation_id: int
):

    q = question.lower()

    # ---------- WEB ----------

    if any(keyword in q for keyword in WEB_KEYWORDS):

        print("Router: WEB")

        return "WEB"

    # ---------- DOCUMENT ----------

    result = rag_tool(
        question,
        conversation_id
    )

    if result:

        print("Router: DOCUMENT")

        return "DOCUMENT"

    # ---------- GENERAL ----------

    print("Router: GENERAL")

    return "GENERAL"