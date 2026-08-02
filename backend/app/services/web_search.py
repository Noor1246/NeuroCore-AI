from tavily import TavilyClient

from app.core.config import settings


client = TavilyClient(
    api_key=settings.TAVILY_API_KEY
)


def search_web(query: str) -> str:

    response = client.search(
        query=query,
        search_depth="basic",
        max_results=3,
        include_answer=True
    )

    if not response.get("results"):

        return ""

    context = ""

    if response.get("answer"):
        context += f"""
    Verified Summary:
    {response["answer"]}

    ========================

    """

    for result in response["results"]:

        context += f"""
Title:
{result["title"]}

Content:
{result["content"]}

URL:
{result["url"]}

------------------------
"""

    return context