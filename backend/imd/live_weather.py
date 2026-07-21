import requests
from pathlib import Path
from dotenv import load_dotenv

ENV_PATH = Path(__file__).resolve().parents[1] / '.env'
load_dotenv(ENV_PATH)

from os import getenv
API_KEY = getenv('OPENWEATHER_API_KEY')

def current_weather(city):
    if not API_KEY:
        raise RuntimeError('OPENWEATHER_API_KEY is not configured. Set it in backend/.env or environment variables.')

    url = 'https://api.openweathermap.org/data/2.5/weather'
    params = {
        'q': city,
        'appid': API_KEY,
        'units': 'metric',
    }

    response = requests.get(
        url,
        params=params
    )

    data = response.json()

    print(data)

    return data
def hourly_forecast(city):
    if not API_KEY:
        raise RuntimeError(
            "OPENWEATHER_API_KEY is not configured."
        )

    url = "https://api.openweathermap.org/data/2.5/forecast"

    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric",
    }

    response = requests.get(
        url,
        params=params,
    )

    data = response.json()

    print(data)

    return data

def current_weather_coordinates(lat, lon):

    if not API_KEY:
        raise RuntimeError("API key missing")

    url = (
        "https://api.openweathermap.org/data/2.5/weather"
        f"?lat={lat}&lon={lon}"
        f"&appid={API_KEY}&units=metric"
    )

    response = requests.get(url)

    response.raise_for_status()

    return response.json()

def hourly_forecast_coordinates(lat, lon):

    if not API_KEY:
        raise RuntimeError("API key missing")

    url = "https://api.openweathermap.org/data/2.5/forecast"

    params = {
        "lat": lat,
        "lon": lon,
        "appid": API_KEY,
        "units": "metric",
    }

    response = requests.get(url, params=params)

    response.raise_for_status()

    return response.json()