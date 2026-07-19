try:
    from .extract_station import extract_station_data
except ImportError:  # pragma: no cover - fallback for direct script execution
    from imd.extract_station import extract_station_data


def compare_stations(filename, station1, station2):

    df1 = extract_station_data(filename, station1)

    df2 = extract_station_data(filename, station2)

    return {

        "Station1": station1,

        "Station2": station2,

        "Avg Tmax 1": round(df1["Tmax"].mean(),2),

        "Avg Tmin 1": round(df1["Tmin"].mean(),2),

        "Avg Tmax 2": round(df2["Tmax"].mean(),2),

        "Avg Tmin 2": round(df2["Tmin"].mean(),2)

    }