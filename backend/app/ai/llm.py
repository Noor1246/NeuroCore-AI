import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)

CURRENT_MODEL = "nvidia/nemotron-3.5-lightning:free"

class NeuroCoreLLM:

    def generate_response(
        self,
        question,
        context="",
        history=""
    ):

        if context == "No relevant information found.":
            context = ""
        if source_type == "CALCULATOR":

            yield context

            return

        prompt = f"""
You are NeuroCore AI, a helpful conversational assistant.

IMPORTANT:
- Conversation History contains previous messages from this same chat.
- Use Conversation History as the highest priority source for remembering user-provided information.
- If the user has told you their name, preferences, projects, or details earlier in this conversation, use that information.
- Do not say "I don't remember" if the information exists in Conversation History.

Conversation History:

{history}

Context Type:

{source_type}

Available Context:

{context}

Sources:

{", ".join(sources)}

Current User Question:

{question}
"""

        response = client.chat.completions.create(
            model=CURRENT_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "You are NeuroCore AI."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content


    def classify_route(
        self,
        question,
        context
    ):

        prompt = f"""
You are the routing engine of NeuroCore AI.

Your task is to decide where the answer should come from.

Question:
{question}

Retrieved Document Context:
{context}

Choose ONLY ONE of these:

DOCUMENT
WEB
GENERAL

Rules:

DOCUMENT
- The uploaded document clearly contains the answer.
- Example:
  - Explain my resume
  - Summarize this PDF
  - What are my projects?

WEB
- The question needs current or live information.
- The question is about news, sports, elections, weather, stock prices, recent events, today's information, or anything after your knowledge cutoff.
- The model is unsure of the answer.
- The uploaded document is unrelated.

Examples:
- Latest AI news
- Who won FIFA World Cup 2026?
- Current Prime Minister
- Bitcoin price today
- Today's weather

GENERAL
- Stable knowledge that does not require current information.
- Programming
- DSA
- Mathematics
- Science
- History
- Geography

Examples:
- Binary Search
- OOP
- Capital of Japan
- Who won FIFA World Cup 2022?
- Explain Python decorators

Reply with ONLY ONE WORD.

DOCUMENT
WEB
GENERAL
"""

        response = client.chat.completions.create(
            model=CURRENT_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        decision = response.choices[0].message.content.strip().upper()

        if decision not in [
            "DOCUMENT",
            "WEB",
            "GENERAL"
        ]:
            return "GENERAL"

        return decision


    def stream_response(
        self,
        question,
        context,
        history,
        source_type,
        sources,
        agent_prompt=""
    ):

        if context == "No relevant information found.":
            context = ""

        prompt = f"""
{agent_prompt}

You are continuing an existing conversation.

IMPORTANT MEMORY RULES:
- Conversation History contains previous messages from this same chat.
- Always use Conversation History when answering about the user.
- If the user has already told you their name, use that name.
- Never say you don't know something that exists in Conversation History.
- Do not mention Context Type.
- Never treat words like "user", "assistant", or role labels as user information.
Conversation History:

{history}


Verified Web Context:

{context}

IMPORTANT:

- For WEB questions, answer ONLY using the Verified Web Context.
- Never invent facts.
- Never guess missing information.
- If the context does not contain the answer, say:
"The available reports do not provide that information."


User Question:

{question}


Rules:

- Answer directly and naturally.
- When the user asks about information they provided earlier, answer with the information only.
- Do not repeat phrases like "You told me", "You mentioned", "I recall", or "I remember".
- Do not describe the conversation history.
- Do not explain how you know the information.
- Keep simple questions short.

Formatting Rules:

- Use normal Markdown for regular answers.
- Use headings, bullet points and tables where appropriate.
- ONLY use Markdown code fences (```) for actual programming code.
- Never wrap normal explanations, definitions, history, science, or general text inside code blocks.
- When showing code, always specify the language.

Example:

Normal answer:

Artificial Intelligence (AI) is the field of creating systems that can perform tasks requiring human intelligence.

Code answer:

```python
def hello():
    print("Hello")
"""

        stream = client.chat.completions.create(
            model=CURRENT_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            stream=True,
        )

        for chunk in stream:
            if (
                chunk.choices
                and chunk.choices[0].delta
                and chunk.choices[0].delta.content
            ):
                yield chunk.choices[0].delta.content