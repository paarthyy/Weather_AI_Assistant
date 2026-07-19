import pandas as pd

try:
    from .open_dataset import open_dataset
except ImportError:  # pragma: no cover - fallback for direct script execution
    from imd.open_dataset import open_dataset


def nearest_grid(filename, station):

    stations = pd.read_csv("data/stations.csv")

    row = stations[
        stations["Station"].str.lower()
        ==
        station.lower()
    ]

    lat = float(row.iloc[0]["Latitude"])

    lon = float(row.iloc[0]["Longitude"])

    ds = open_dataset(filename)

    point = ds.sel(

        lat_0=lat,

        lon_0=lon,

        method="nearest"

    )

    grid_lat = float(point["lat_0"])

    grid_lon = float(point["lon_0"])

    ds.close()

    return {

        "Station":station,

        "Station Lat":lat,

        "Station Lon":lon,

        "Grid Lat":grid_lat,

        "Grid Lon":grid_lon

    }