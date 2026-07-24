import requests
from pathlib import Path
from dotenv import load_dotenv
from os import getenv

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

API_KEY = getenv("OPENWEATHER_API_KEY")


def get_weather_alerts(lat: float, lon: float):

    url = "https://api.openweathermap.org/data/2.5/forecast"

    params = {
        "lat": lat,
        "lon": lon,
        "appid": API_KEY,
        "units": "metric",
    }

    data = requests.get(
        url,
        params=params,
    ).json()

    alerts = []

    for item in data["list"][:8]:      # next 24 hours

        weather = item["weather"][0]["main"]

        pop = item.get("pop", 0)

        wind = item["wind"]["speed"]

        temp = item["main"]["temp"]

        time = item["dt_txt"]

        if pop >= 0.60:

            alerts.append(
                f"🌧 High chance of rain around {time}"
            )

        if wind >= 12:

            alerts.append(
                f"💨 Strong winds expected around {time}"
            )

        if temp >= 40:

            alerts.append(
                f"🔥 Extreme Heat around {time}"
            )

        if temp <= 5:

            alerts.append(
                f"🥶 Very Cold around {time}"
            )

        if weather == "Thunderstorm":

            alerts.append(
                f"⛈ Thunderstorm expected around {time}"
            )

    if len(alerts) == 0:

        alerts.append(
            "✅ No severe weather alerts in next 24 hours."
        )

    return "\n".join(alerts)