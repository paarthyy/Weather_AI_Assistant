import math
from pathlib import Path

import pandas as pd

# -----------------------------
# Dataset Path
# -----------------------------

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"


# -----------------------------
# Find Nearest Stations
# -----------------------------

def nearest_stations(station: str):

    df = pd.read_csv(DATA_DIR / "stations.csv")

    # Find selected station
    target = df[
        df["Station"].str.lower() == station.lower()
    ]

    if target.empty:
        raise ValueError(f"Station '{station}' not found.")

    target = target.iloc[0]

    lat1 = float(target["Latitude"])
    lon1 = float(target["Longitude"])

    rows = []

    for _, r in df.iterrows():

        # Skip the selected station itself
        if str(r["Station"]).lower() == station.lower():
            continue

        lat2 = float(r["Latitude"])
        lon2 = float(r["Longitude"])

        distance = math.sqrt(
            (lat1 - lat2) ** 2 +
            (lon1 - lon2) ** 2
        )

        rows.append(
            (
                str(r["Station"]),
                round(distance, 3)
            )
        )

    # Sort by nearest distance
    rows.sort(key=lambda x: x[1])

    # Return nearest 5 stations
    return rows[:5]