import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  MapPin,
  Mountain,
  Navigation,
} from "lucide-react";

import { getStationDetails } from "../api/stationDetailService";

export function StationDetailsPage() {
  const { name } = useParams();

  const [station, setStation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;

    async function loadStation() {
      try {
        const data = await getStationDetails(name);
        setStation(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadStation();
  }, [name]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-xl text-white">
        Loading station details...
      </div>
    );
  }

  if (!station) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-xl text-red-400">
        Unable to load station.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-8">

        <p className="text-cyan-300 font-medium">
          Weather Station Intelligence
        </p>

        <h1 className="mt-2 text-4xl font-bold text-white">
          {station.name}
        </h1>

        <p className="mt-2 text-slate-400">
          {station.region}
        </p>

        <p className="text-slate-500">
          Elevation {station.elevation} m
        </p>

      </div>

      {/* Weather Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

          <Thermometer className="text-orange-400 mb-3" size={28} />

          <p className="text-slate-400">
            Temperature
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {station.weather.temperature}°C
          </h2>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

          <Droplets className="text-cyan-400 mb-3" size={28} />

          <p className="text-slate-400">
            Humidity
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {station.weather.humidity}%
          </h2>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

          <Wind className="text-sky-400 mb-3" size={28} />

          <p className="text-slate-400">
            Wind Speed
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {station.weather.wind} m/s
          </h2>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

          <CloudRain className="text-blue-400 mb-3" size={28} />

          <p className="text-slate-400">
            Rain
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {station.weather.rainProbability} %
          </h2>

        </div>

      </div>

      {/* Station Information */}

      <div className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-8">

        <h2 className="text-2xl font-semibold text-white">
          Station Information
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

            <Navigation className="text-cyan-400 mb-2" />

            <p className="text-slate-400">
              Latitude
            </p>

            <p className="text-2xl font-semibold text-white">
              {station.latitude}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

            <Navigation className="text-cyan-400 mb-2" />

            <p className="text-slate-400">
              Longitude
            </p>

            <p className="text-2xl font-semibold text-white">
              {station.longitude}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

            <Mountain className="text-cyan-400 mb-2" />

            <p className="text-slate-400">
              Elevation
            </p>

            <p className="text-2xl font-semibold text-white">
              {station.elevation} m
            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

            <MapPin className="text-cyan-400 mb-2" />

            <p className="text-slate-400">
              Forecast Days
            </p>

            <p className="text-2xl font-semibold text-white">
              {station.forecastDays}
            </p>

          </div>

        </div>

      </div>

      {/* Nearby Stations */}

      <div className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-8">

        <h2 className="text-2xl font-semibold text-white">
          Nearby Stations
        </h2>

        <div className="mt-6 space-y-4">

          {station.nearbyStations.map((nearby: any) => (

            <div
              key={nearby.name}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-6 py-4"
            >

              <div>

                <p className="font-semibold text-white">
                  {nearby.name}
                </p>

                <p className="text-sm text-slate-400">
                  Nearby IMD Weather Station
                </p>

              </div>

              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300 font-medium">

                {nearby.distance}

              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}