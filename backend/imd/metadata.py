try:
    from .open_dataset import open_dataset
except ImportError:  # pragma: no cover - fallback for direct script execution
    from imd.open_dataset import open_dataset


def dataset_metadata(filename):

    ds = open_dataset(filename)

    metadata = {
        "Dimensions": dict(ds.sizes),
        "Variables": list(ds.data_vars),
        "Coordinates": list(ds.coords),
    }

    ds.close()

    return metadata