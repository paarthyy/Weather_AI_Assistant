import requests
from pathlib import Path
from dotenv import load_dotenv
from os import getenv

ENV_PATH = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(ENV_PATH)

API_KEY = getenv("OPENWEATHER_API_KEY")


def get_air_quality(lat: float, lon: float):
    """
    Get Air Quality using latitude and longitude.
    """

    air_url = "https://api.openweathermap.org/data/2.5/air_pollution"

    response = requests.get(
        air_url,
        params={
            "lat": lat,
            "lon": lon,
            "appid": API_KEY,
        },
    )

    response.raise_for_status()

    return response.json()