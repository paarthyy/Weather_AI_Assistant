import os
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import requests
import uvicorn

from langchain_core.messages import HumanMessage

try:
    from .graph import graph
    from .imd.live_weather import (
    current_weather,
    hourly_forecast,
)
    from .imd.location import get_location
    from .imd.metadata import dataset_metadata
    from .imd.search_station import nearest_stations
except ImportError:  # pragma: no cover - fallback for direct script execution
    from graph import graph
    from imd.live_weather import current_weather
    from imd.location import get_location
    from imd.metadata import dataset_metadata
    from imd.search_station import nearest_stations

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"

app = FastAPI(title="WeatherOps AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    provider: str = "Auto"

class ChatResponse(BaseModel):
    response: str



@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    try:

        result = graph.invoke(
    {
        "messages": [HumanMessage(content=request.message)],
        "provider": request.provider,
    }
)

        messages = result["messages"]

        final_message = messages[-1]

        content = final_message.content

        print("\n========================")
        print("FINAL CONTENT")
        print(content)
        print(type(content))
        print("========================\n")

        # -------------------
        # String
        # -------------------

        if isinstance(content, str):

            text = content

        # -------------------
        # Gemini format
        # -------------------

        elif isinstance(content, list):

            text = ""

            for part in content:

                if isinstance(part, dict):

                    if part.get("type") == "text":

                        text += part.get("text", "")

                else:

                    text += str(part)

        # -------------------
        # Anything else
        # -------------------

        else:

            text = str(content)

        print("\nRETURNING:\n")
        print(text)

        return ChatResponse(
            response=text
        )

    except Exception as e:

        print(e)

        return ChatResponse(
            response=f"ERROR:\n{e}"
        )


@app.get("/weather")
def weather(city: str = "Delhi") -> Dict[str, Any]:
    try:
        data = current_weather(city)
        forecast = hourly_forecast(city)
        if not isinstance(data, dict):
            raise HTTPException(status_code=500, detail="Weather service returned invalid data")
        sunrise = datetime.fromtimestamp(
        data["sys"]["sunrise"]
        ).strftime("%H:%M")
        sunset = datetime.fromtimestamp(
            data["sys"]["sunset"]
        ).strftime("%H:%M")
        hourly=[]
        for item in forecast["list"][:4]:
            hourly.append(
                {
                    "time": item["dt_txt"][11:16],
                    "temp": round(item["main"]["temp"]),
                    "label": item["weather"][0]["main"],
                }
            )
        return {
            "city": data.get("name", city),
            "temperature": round(data.get("main", {}).get("temp", 0), 1),
            "humidity": data.get("main", {}).get("humidity", 0),
            "windSpeed": data.get("wind", {}).get("speed", 0),
            "pressure": data.get("main", {}).get("pressure", 0),
            "feelsLike": round(data.get("main", {}).get("feels_like", 0), 1),
            "visibility": round((data.get("visibility", 0) or 0) / 1000, 1),
            "clouds": data.get("clouds", {}).get("all", 0),
            "sunrise": sunrise,
            "sunset": sunset,
            "hourlyForecast": hourly,
            "description": data["weather"][0]["description"],
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/location")
def location(query: str | None = None) -> Dict[str, Any]:
    try:
        if query:
            return {"query": query, "coordinates": [28.6139, 77.209]}
        loc = get_location()
        return {
            "query": loc.get("city"),
            "coordinates": [loc.get("latitude", 0), loc.get("longitude", 0)],
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/stations")
def stations() -> List[Dict[str, Any]]:
    try:
        path = DATA_DIR / "stations.csv"
        df = pd.read_csv(path)
        return [
            {
                "id": str(row["Station"]).strip().lower().replace(" ", "-"),
                "name": str(row["Station"]),
                "latitude": float(row["Latitude"]),
                "longitude": float(row["Longitude"]),
                "elevation": float(row.get("Elevation", 0) or 0),
                "temperature": 30,
                "forecastDays": 7,
                "region": str(row.get("Region", "India") or "India"),
            }
            for _, row in df.iterrows()
        ]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/station/{name}")
def station(name: str) -> Dict[str, Any]:
    try:
        path = DATA_DIR / "stations.csv"
        df = pd.read_csv(path)
        row = df[df["Station"].astype(str).str.lower() == name.lower()]
        if row.empty:
            raise HTTPException(status_code=404, detail="Station not found")
        station_row = row.iloc[0]
        return {
            "id": name.lower().replace(" ", "-"),
            "name": str(station_row["Station"]),
            "latitude": float(station_row["Latitude"]),
            "longitude": float(station_row["Longitude"]),
            "elevation": float(station_row.get("Elevation", 0) or 0),
            "temperature": 30,
            "forecastDays": 7,
            "region": str(station_row.get("Region", "India") or "India"),
        }
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/forecast")
def forecast(station: str = "Delhi") -> List[Dict[str, Any]]:
    try:
        return [
            {"day": "Today", "summary": "Sunny", "high": 34, "low": 28},
            {"day": "Tomorrow", "summary": "Cloudy", "high": 32, "low": 27},
            {"day": "Wed", "summary": "Rain", "high": 30, "low": 26},
        ]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/metadata")
def metadata() -> Dict[str, Any]:
    try:
        meta = dataset_metadata("Tmax_and_Tmin_2018_24hr.nc")
        return meta
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/analytics")
def analytics() -> Dict[str, Any]:
    try:
        return {
            "temperatureTrend": [
                {"name": "Jan", "value": 24},
                {"name": "Feb", "value": 27},
                {"name": "Mar", "value": 32},
                {"name": "Apr", "value": 36},
                {"name": "May", "value": 39},
            ],
            "humidityTrend": [
                {"name": "Jan", "value": 45},
                {"name": "Feb", "value": 41},
                {"name": "Mar", "value": 38},
                {"name": "Apr", "value": 35},
                {"name": "May", "value": 33},
            ],
            "accuracy": [
                {"name": "Forecast", "value": 92},
                {"name": "Observed", "value": 88},
            ],
            "bias": [
                {"name": "Day 1", "value": 1.2},
                {"name": "Day 2", "value": -0.7},
                {"name": "Day 3", "value": 0.9},
            ],
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
