from agent import llm_with_tools

response = llm_with_tools.invoke(
    "Extract Delhi from Tmax_and_Tmin_2018_24hr.nc"
)

print(response.tool_calls)
print(response.content)