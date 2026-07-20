import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from google.api_core.exceptions import ResourceExhausted
from dotenv import load_dotenv
import os

load_dotenv()

try:
    from .tools import (
        list_datasets,
        load_station_data,
        calculate_bias,
        generate_plot,
        generate_summary,
        show_dataset_metadata,
        extract_station,
        describe_dataset,
        compare_two_stations,
        search_nearby_stations,
        get_live_weather,
        get_my_location,
    )
except ImportError:  # pragma: no cover - fallback for direct script execution
    from tools import (
        list_datasets,
        load_station_data,
        calculate_bias,
        generate_plot,
        generate_summary,
        show_dataset_metadata,
        extract_station,
        describe_dataset,
        compare_two_stations,
        search_nearby_stations,
        get_live_weather,
        get_my_location,
    )

# -------------------------
# Local LLM
# -------------------------

# -------------------------
# Gemini (Primary)
# -------------------------

gemini = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0,
)

# -------------------------
# Groq (Fallback)
# -------------------------

groq = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0,
)

# -------------------------
# Register tools
# -------------------------

tools = [
    list_datasets,
    load_station_data,
    calculate_bias,
    generate_plot,
    generate_summary,
    show_dataset_metadata,
    extract_station,
    describe_dataset,
    compare_two_stations,
    search_nearby_stations,
    get_live_weather,
    get_my_location,
]

# -------------------------
# Bind tools
# -------------------------

gemini_llm = gemini.bind_tools(tools)

groq_llm = groq.bind_tools(tools)

# ---------------------------------
# Model Routing State
# ---------------------------------

USE_GROQ_ONLY = False

def invoke_llm(messages):
    """
    Try Gemini first.
    If Gemini quota is exceeded,
    switch permanently to Groq until server restart.
    """

    global USE_GROQ_ONLY

    # Already switched?
    if USE_GROQ_ONLY:
        print("\nUsing Groq...\n")
        return groq_llm.invoke(messages)

    try:
        print("\nUsing Gemini...\n")
        return gemini_llm.invoke(messages)

    except ResourceExhausted:

        print("\nGemini quota exceeded.")
        print("Switching permanently to Groq...\n")

        USE_GROQ_ONLY = True

        return groq_llm.invoke(messages)

    except Exception as e:

        print(f"\nGemini Error: {e}")
        print("Switching permanently to Groq...\n")

        USE_GROQ_ONLY = True

        return groq_llm.invoke(messages)