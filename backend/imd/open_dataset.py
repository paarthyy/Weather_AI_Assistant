import os
from pathlib import Path

import xarray as xr


DATA_DIR = Path(__file__).resolve().parents[1] / "data"


def open_dataset(filename):

    path = DATA_DIR / filename

    if not os.path.exists(path):
        raise FileNotFoundError(f"{filename} not found.")

    ds = xr.open_dataset(path)

    return ds