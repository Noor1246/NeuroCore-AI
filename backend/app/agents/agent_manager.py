from .coding_agent import SYSTEM_PROMPT as CODING_AGENT
from .research_agent import SYSTEM_PROMPT as RESEARCH_AGENT
from .resume_agent import SYSTEM_PROMPT as RESUME_AGENT
from .data_agent import SYSTEM_PROMPT as DATA_AGENT
from .writing_agent import SYSTEM_PROMPT as WRITING_AGENT


AGENTS = {

    "coding": CODING_AGENT,

    "research": RESEARCH_AGENT,

    "resume": RESUME_AGENT,

    "data": DATA_AGENT,

    "writing": WRITING_AGENT

}


def get_agent_prompt(agent_name: str):

    return AGENTS.get(
        agent_name,
        """
        You are NeuroCore AI, a helpful general AI assistant.
        Answer user questions accurately and clearly.
        """
    )