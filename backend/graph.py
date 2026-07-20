from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode, tools_condition

import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

try:
    from .state import AgentState
    from .agent import llm_with_tools, tools
except ImportError:  # pragma: no cover - fallback for direct script execution
    from state import AgentState
    from agent import invoke_llm, tools

# -------------------------------
# Chatbot Node
# -------------------------------

def chatbot(state: AgentState):
    return {
        "messages": [
            invoke_llm(state["messages"])
        ]
    }


# -------------------------------
# Build Graph
# -------------------------------

builder = StateGraph(AgentState)

builder.add_node("chatbot", chatbot)
builder.add_node("tools", ToolNode(tools))

builder.add_edge(START, "chatbot")

builder.add_conditional_edges(
    "chatbot",
    tools_condition,
)

builder.add_edge("tools", "chatbot")

builder.add_edge("chatbot", END)

graph = builder.compile()