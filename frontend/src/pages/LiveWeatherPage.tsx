import { motion } from 'framer-motion';
import { CloudSun, Droplets, Eye, Gauge, Sunrise, Sunset, Thermometer } from 'lucide-react';
import { WeatherCard } from '../components/features/WeatherCard';
import { useEffect, useState } from 'react';
import { getWeather } from '../api/weatherService';
import { apiClient } from "../api/axios";

export function LiveWeatherPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      // Step 1: Get user's location
      const locationRes = await apiClient.get("/location");

      const city = locationRes.data.query;

      // Step 2: Get weather for that city
      const weather = await getWeather({
        city,
      });

      setData(weather);

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load weather data."
      );
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);

  if (loading) {
    return <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-8 text-slate-400">Loading live weather intelligence…</div>;
  }

  if (error) {
    return <div className="rounded-[32px] border border-rose-500/20 bg-rose-500/10 p-8 text-rose-300">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 shadow-[0_0_120px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Live conditions</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{data?.city}</h2>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-cyan-300">
            <div className="flex items-center gap-2">
              <CloudSun size={18} />
              <span>Updated now</span>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-slate-800 bg-slate-950/70 p-6">
            <div className="flex items-center gap-3 text-cyan-300">
              <Thermometer size={18} />
              <p className="text-sm">Current Temperature</p>
            </div>
            <p className="mt-4 text-6xl font-semibold text-white">{data?.temperature}°</p>
            <p className="mt-3 text-slate-400">Feels like {data?.feelsLike}° with a light breeze over the city.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <WeatherCard title="Humidity" value={data?.humidity} unit="%" icon="humidity" />
            <WeatherCard title="Wind" value={data?.windSpeed} unit="km/h" icon="wind" />
            <WeatherCard title="Pressure" value={data?.pressure} unit="hPa" />
            <WeatherCard title="Visibility" value={data?.visibility} unit="km" />
          </div>
        </div>
      </motion.section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-cyan-300">
            <Gauge size={18} />
            <p className="text-sm font-medium">Hourly forecast</p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {data?.hourlyForecast?.map((entry: { time: string; label: string; temp: number }) => (
              <div key={entry.time} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{entry.time}</span>
                  <span>{entry.label}</span>
                </div>
                <p className="mt-3 text-2xl font-semibold text-white">{entry.temp}°</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-cyan-300">
            <Sunrise size={18} />
            <p className="text-sm font-medium">Sun cycle</p>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-slate-300">
              <div className="flex items-center gap-2">
                <Sunrise size={16} />
                Sunrise
              </div>
              <span className="text-white">{data?.sunrise}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-slate-300">
              <div className="flex items-center gap-2">
                <Sunset size={16} />
                Sunset
              </div>
              <span className="text-white">{data?.sunset}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-slate-300">
              <div className="flex items-center gap-2">
                <Droplets size={16} />
                Cloud cover
              </div>
              <span className="text-white">{data?.clouds}%</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-slate-300">
              <div className="flex items-center gap-2">
                <Eye size={16} />
                Visibility
              </div>
              <span className="text-white">{data?.visibility} km</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
