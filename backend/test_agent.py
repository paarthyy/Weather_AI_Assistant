from agent import llm_with_tools
from langchain_core.messages import HumanMessage

response = llm_with_tools.invoke(
    [HumanMessage(content="Calculate bias for Delhi")]
)

print(response.tool_calls)