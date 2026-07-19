import os
from pathlib import Path

import pandas as pd

import matplotlib
matplotlib.use("Agg")

import matplotlib.pyplot as plt

from langchain_core.tools import tool

try:
    from .imd.metadata import dataset_metadata
    from .imd.extract_station import extract_station_data
    from .imd.dataset_info import dataset_info
    from .imd.compare import compare_stations
    from .imd.search_station import nearest_stations
    from .imd.live_weather import current_weather
    from .imd.location import get_location
except ImportError:  # pragma: no cover - fallback for direct script execution
    from imd.metadata import dataset_metadata
    from imd.extract_station import extract_station_data
    from imd.dataset_info import dataset_info
    from imd.compare import compare_stations
    from imd.search_station import nearest_stations
    from imd.live_weather import current_weather
    from imd.location import get_location


DATA_FOLDER = os.path.join(os.path.dirname(__file__), "data")


# ---------------------------------------------------------
# TOOL 1
# ---------------------------------------------------------

@tool
def list_datasets() -> str:
    """
    List all available weather datasets.
    """

    files = []

    for file in os.listdir(DATA_FOLDER):

        if file.endswith(".csv") and file != "stations.csv":
            files.append(file)

    return "\n".join(files)


# ---------------------------------------------------------
# TOOL 2
# ---------------------------------------------------------

@tool
def load_station_data(station: str) -> str:
    """
    Load weather data for a station.
    """

    filename = f"{station.lower()}.csv"

    path = os.path.join(DATA_FOLDER, filename)

    if not os.path.exists(path):
        return f"{station} dataset not found."

    df = pd.read_csv(path)

    return df.to_string(index=False)


# ---------------------------------------------------------
# TOOL 3
# ---------------------------------------------------------

@tool
def calculate_bias(station: str) -> str:
    """
    Calculate average Day1 and Day5 Bias.
    Use ONLY when the user asks about:

- bias
- forecast error
- Day1 bias
- Day5 bias
- model accuracy

Do NOT use for nearby stations or live weather.
    """

    filename = f"{station.lower()}.csv"

    path = os.path.join(DATA_FOLDER, filename)

    if not os.path.exists(path):
        return f"{station} dataset not found."

    df = pd.read_csv(path)

    df["Day1_Bias"] = df["Day1"] - df["Observed"]
    df["Day5_Bias"] = df["Day5"] - df["Observed"]

    day1 = float(round(df["Day1_Bias"].mean(),2))
    day5 = float(round(df["Day5_Bias"].mean(),2))

    return f"""
Average Day1 Bias : {day1}

Average Day5 Bias : {day5}
"""


# ---------------------------------------------------------
# TOOL 4
# ---------------------------------------------------------

@tool
def generate_plot(station: str) -> str:
    """
    Generate comparison plot.
    """

    filename = f"{station.lower()}.csv"

    path = os.path.join(DATA_FOLDER, filename)

    if not os.path.exists(path):
        return f"{station} dataset not found."

    df = pd.read_csv(path)

    plt.figure(figsize=(10,5))

    plt.plot(df["Date"],df["Observed"],label="Observed")
    plt.plot(df["Date"],df["Day1"],label="Day1 Forecast")
    plt.plot(df["Date"],df["Day5"],label="Day5 Forecast")

    plt.xticks(rotation=45)

    plt.legend()

    plt.tight_layout()

    output_path = f"outputs/{station.lower()}_plot.png"

    plt.savefig(output_path)

    plt.close()

    return f"Plot generated successfully.\nSaved at : {output_path}"


# ---------------------------------------------------------
# TOOL 5
# ---------------------------------------------------------

@tool
def generate_summary(station: str) -> str:
    """
    Generate weather summary.
    """

    filename = f"{station.lower()}.csv"

    path = os.path.join(DATA_FOLDER, filename)

    if not os.path.exists(path):
        return f"{station} dataset not found."

    df = pd.read_csv(path)

    df["Day1_Bias"] = df["Day1"] - df["Observed"]
    df["Day5_Bias"] = df["Day5"] - df["Observed"]

    day1 = float(round(df["Day1_Bias"].mean(),2))
    day5 = float(round(df["Day5_Bias"].mean(),2))

    return f"""
Weather Summary

Station : {station}

Average Day1 Bias : {day1}

Average Day5 Bias : {day5}

Observation

Day5 Forecast has higher error than Day1 Forecast.
"""


# ---------------------------------------------------------
# TOOL 6
# ---------------------------------------------------------

@tool
def show_dataset_metadata(filename: str) -> str:
    """
    Show metadata of a NetCDF dataset.
    Example:
    Tmax_and_Tmin_2018_24hr.nc
    """

    try:

        meta = dataset_metadata(filename)

        return f"""
Dataset : {filename}

Dimensions
-----------
{meta["Dimensions"]}

Variables
----------
{meta["Variables"]}

Coordinates
-----------
{meta["Coordinates"]}
"""

    except Exception as e:

        return f"Error reading dataset: {str(e)}"


# ---------------------------------------------------------
# TOOL 7
# ---------------------------------------------------------
@tool
def extract_station(filename: str, station: str) -> str:
    """
    Extract weather forecast for one station
    from a NetCDF dataset.
    """

    try:

        stations = pd.read_csv("data/stations.csv")

        row = stations[
            stations["Station"]
            .str.strip()
            .str.lower()
            ==
            station.strip().lower()
        ]

        if row.empty:
            return "Station not found."

        lat = float(row.iloc[0]["Latitude"])
        lon = float(row.iloc[0]["Longitude"])

        df = extract_station_data(filename, station)

        report = f"""
Station
-------
{station}

Coordinates
-----------
Latitude : {lat:.4f}
Longitude : {lon:.4f}

Forecast Days
-------------
{len(df)}

Average Tmax
------------
{df["Tmax"].mean():.2f} °C

Average Tmin
------------
{df["Tmin"].mean():.2f} °C

First 15 Forecasts
------------------

{df.head(15).to_string(index=False)}
"""

        return report

    except Exception as e:
        return str(e)
# ------------------------------------------------
# ---------------------TOOL9---------------------
# ---------------------------------------------------------
@tool
def describe_dataset(filename: str) -> str:
    """
    Describe a NetCDF dataset.

    Example:
    Describe Tmax_and_Tmin_2018_24hr.nc
    """

    info = dataset_info(filename)

    return f"""
Dataset
-------
{info["Filename"]}

File Size
---------
{info["File Size (MB)"]} MB

Forecast Days
-------------
{info["Forecast Days"]}

Grid
----
Latitude Points : {info["Latitude Grid"]}

Longitude Points : {info["Longitude Grid"]}

Variables
---------
{info["Variables"]}

Coordinates
-----------
{info["Coordinates"]}
"""
# ----------------------------------------------------------
# TOOL 12
# ----------------------------------------------------------

@tool
def compare_two_stations(
    filename: str,
    station1: str,
    station2: str
) -> str:
    """
    Compare the weather forecast of two stations
    using a NetCDF dataset.

    Example:
    Compare NEW DELHI-SAFDARJUNG and JAIPUR SANGANER
    using Tmax_and_Tmin_2018_24hr.nc
    """

    data = compare_stations(
        filename,
        station1,
        station2
    )

    return f"""
Comparison Report
=================

Dataset
-------
{filename}

Station 1
---------
{data["Station1"]}

Average Tmax : {data["Avg Tmax 1"]} °C
Average Tmin : {data["Avg Tmin 1"]} °C

-------------------------------------

Station 2
---------
{data["Station2"]}

Average Tmax : {data["Avg Tmax 2"]} °C
Average Tmin : {data["Avg Tmin 2"]} °C
"""
# ----------------------tool15--------------------------
# -----------------------------------------------------------
# -----------------------------------------------------------
@tool
def search_nearby_stations(station:str)->str:
    """
    Find nearby stations.

    Example:
    Find nearby stations to NEW DELHI-SAFDARJUNG
    """

    stations = nearest_stations(station)

    text = "Nearest Stations\n\n"

    for s,d in stations:

        text += f"{s}  ({d})\n"

    return text
# --------------------------live updates
@tool
def get_live_weather(city:str)->str:
    """
    Get current weather.

    Example

    Delhi

    Mumbai

    Jaipur
    """

    weather = current_weather(city)

    return f"""

City

{weather["name"]}

Temperature

{weather["main"]["temp"]} °C

Feels Like

{weather["main"]["feels_like"]} °C

Humidity

{weather["main"]["humidity"]} %

Wind Speed

{weather["wind"]["speed"]} m/s

Condition

{weather["weather"][0]["description"]}

"""
@tool
def get_my_location() -> str:
    """
    Get the user's approximate location using IP.

    Example:
    Where am I?
    What is my location?
    """

    try:

        loc = get_location()

        return f"""
Current Location
----------------

City: {loc['city']}

State: {loc['state']}

Country: {loc['country']}

Latitude: {loc['latitude']}

Longitude: {loc['longitude']}

Timezone: {loc['timezone']}

ISP: {loc['isp']}
"""

    except Exception as e:
        return str(e)