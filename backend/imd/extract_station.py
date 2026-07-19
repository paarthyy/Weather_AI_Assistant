import pandas as pd

try:
    from .open_dataset import open_dataset
except ImportError:  # pragma: no cover - fallback for direct script execution
    from imd.open_dataset import open_dataset


def extract_station_data(filename, station_name):

    # --------------------------------
    # Load Stations
    # --------------------------------

    stations = pd.read_csv("data/stations.csv")

    station = stations[
        stations["Station"]
        .str.strip()
        .str.lower()
        ==
        station_name.strip().lower()
    ]

    if station.empty:

        available = ", ".join(stations["Station"])

        raise Exception(
            f"Station '{station_name}' not found.\n"
            f"Available stations:\n{available}"
        )

    lat = float(station.iloc[0]["Latitude"])
    lon = float(station.iloc[0]["Longitude"])

    # --------------------------------
    # Open NetCDF
    # --------------------------------

    ds = open_dataset(filename)

    point = ds.sel(
        lat_0=lat,
        lon_0=lon,
        method="nearest"
    )

    rows = []

    for i in range(ds.sizes["time"]):

        rows.append({

            "Day": i + 1,

            "Tmax": round(
                float(
                    point["Tmax"]
                    .isel(time=i)
                    .values
                ) - 273.15,
                2
            ),

            "Tmin": round(
                float(
                    point["Tmin"]
                    .isel(time=i)
                    .values
                ) - 273.15,
                2
            )

        })

    ds.close()

    return pd.DataFrame(rows)