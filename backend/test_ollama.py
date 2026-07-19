from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="qwen3:8b",
    temperature=0,
)

response = llm.invoke("Say hello in one sentence.")

print(response.content)