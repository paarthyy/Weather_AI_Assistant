import os

try:
    from .open_dataset import open_dataset
except ImportError:  # pragma: no cover - fallback for direct script execution
    from imd.open_dataset import open_dataset


def dataset_info(filename):

    path = os.path.join("data", filename)

    ds = open_dataset(filename)

    size_mb = round(os.path.getsize(path) / (1024 * 1024), 2)

    info = {

        "Filename": filename,

        "File Size (MB)": size_mb,

        "Forecast Days": ds.sizes["time"],

        "Latitude Grid": ds.sizes["lat_0"],

        "Longitude Grid": ds.sizes["lon_0"],

        "Variables": list(ds.data_vars),

        "Coordinates": list(ds.coords),

        "Modified": os.path.getmtime(path)

    }

    ds.close()

    return info