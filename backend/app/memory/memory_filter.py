import ollama


def should_store_memory(message: str) -> bool:

    prompt = f"""
You decide whether a user's message should be stored as long-term memory.

Store ONLY if it contains information likely to be useful in future conversations.

Examples to STORE:

- Personal preferences
- Goals
- Ongoing projects
- Skills
- Occupation
- Education
- Important plans
- Long-term facts

Examples to IGNORE:

- Greetings
- Thanks
- Okay
- Yes
- No
- Short questions
- Temporary requests
- Small talk

User message:

{message}

Reply with exactly one word:

YES

or

NO
"""

    response = ollama.chat(
        model="llama3.2:3b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    decision = response["message"]["content"].strip().upper()

    return decision == "YES"