import pandas as pd

import math


def nearest_stations(station):

    df = pd.read_csv("data/stations.csv")

    target = df[
        df["Station"]
        .str.lower()
        ==
        station.lower()
    ].iloc[0]

    lat1 = target["Latitude"]

    lon1 = target["Longitude"]

    rows=[]

    for _,r in df.iterrows():

        d = math.sqrt(

            (lat1-r["Latitude"])**2 +

            (lon1-r["Longitude"])**2

        )

        rows.append(

            (r["Station"],round(d,3))

        )

    rows.sort(key=lambda x:x[1])

    return rows[:5]