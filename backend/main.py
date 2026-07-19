from graph import graph
from langchain_core.messages import HumanMessage

print("\n🌦 WeatherOps AI Started")
print("Type 'exit' to quit.\n")

while True:

    question = input("You : ")

    if question.lower() == "exit":
        break

    response = graph.invoke(
        {
            "messages": [
                HumanMessage(content=question)
            ]
        }
    )

    print("\nAgent :")
    print(response["messages"][-1].content)
    print()