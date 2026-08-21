def should_store_memory(message: str) -> bool:
    message = message.strip().lower()

    # Ignore empty or very short messages
    if len(message) < 10:
        return False

    # Messages that are generally temporary/conversational
    ignored_phrases = {
        "hello",
        "hi",
        "hey",
        "thanks",
        "thank you",
        "okay",
        "ok",
        "yes",
        "no",
        "sure",
        "fine",
        "good",
        "great",
        "cool",
        "bye",
        "goodbye",
    }

    if message in ignored_phrases:
        return False

    # Strong indicators of information worth remembering
    memory_keywords = [
        "i am",
        "i'm",
        "my name",
        "i study",
        "i work",
        "i live",
        "i like",
        "i love",
        "i prefer",
        "i want",
        "i need",
        "my goal",
        "my project",
        "i am working",
        "i'm working",
        "i'm preparing",
        "i am preparing",
        "i use",
        "i know",
        "i learned",
        "i'm learning",
        "i am learning",
        "my skills",
        "my experience",
        "my plan",
        "i plan",
        "i will",
    ]

    return any(keyword in message for keyword in memory_keywords)