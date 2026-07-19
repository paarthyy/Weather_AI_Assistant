import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from langchain_google_genai import ChatGoogleGenerativeAI
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

llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash",
    google_api_key=os.getenv("GEMINI_API_KEY"),
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

llm_with_tools = llm.bind_tools(tools)