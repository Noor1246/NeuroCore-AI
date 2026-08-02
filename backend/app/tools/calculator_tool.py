import math


ALLOWED = {
    "sqrt": math.sqrt,
    "sin": math.sin,
    "cos": math.cos,
    "tan": math.tan,
    "log": math.log10,
    "ln": math.log,
    "factorial": math.factorial,
    "pi": math.pi,
    "e": math.e,
    "abs": abs,
    "pow": pow
}


def run(question: str):

    try:

        expression = (
            question
            .replace("^", "**")
            .replace("×", "*")
            .replace("÷", "/")
        )

        answer = eval(
            expression,
            {"__builtins__": {}},
            ALLOWED
        )

        return {
            "context": str(answer),
            "source_type": "CALCULATOR",
            "sources": ["Calculator"]
        }

    except Exception:

        return None