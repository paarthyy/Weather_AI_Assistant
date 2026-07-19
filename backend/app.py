import os
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
    from .imd.live_weather import current_weather
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


class ChatResponse(BaseModel):
    response: str


@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    try:
        response = graph.invoke(
            {"messages": [HumanMessage(content=request.message)]}
        )

        if isinstance(response, dict) and response.get("messages"):
            content = response["messages"][-1].content

        elif hasattr(response, "content"):
            content = response.content

        else:
            content = "No response generated"

        # -----------------------------
        # Extract Gemini text correctly
        # -----------------------------
        if isinstance(content, list):
            text = ""

            for part in content:
                if isinstance(part, dict) and part.get("type") == "text":
                    text += part.get("text", "")

        elif isinstance(content, str):
            text = content

        else:
            text = str(content)

        return ChatResponse(response=text)

    except Exception as exc:
        print("/chat handler:", exc)

        return ChatResponse(
            response="The language model is temporarily unavailable. Try again later."
        )


@app.get("/weather")
def weather(city: str = "Delhi") -> Dict[str, Any]:
    try:
        data = current_weather(city)
        if not isinstance(data, dict):
            raise HTTPException(status_code=500, detail="Weather service returned invalid data")
        return {
            "city": data.get("name", city),
            "temperature": round(data.get("main", {}).get("temp", 0), 1),
            "humidity": data.get("main", {}).get("humidity", 0),
            "windSpeed": data.get("wind", {}).get("speed", 0),
            "pressure": data.get("main", {}).get("pressure", 0),
            "feelsLike": round(data.get("main", {}).get("feels_like", 0), 1),
            "visibility": round((data.get("visibility", 0) or 0) / 1000, 1),
            "clouds": data.get("clouds", {}).get("all", 0),
            "sunrise": "05:00",
            "sunset": "19:00",
            "hourlyForecast": [
                {"time": "09:00", "temp": 29, "label": "Clear"},
                {"time": "12:00", "temp": 31, "label": "Sunny"},
                {"time": "15:00", "temp": 33, "label": "Warm"},
                {"time": "18:00", "temp": 30, "label": "Cloudy"},
            ],
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
