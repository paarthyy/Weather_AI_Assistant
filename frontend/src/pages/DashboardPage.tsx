import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, Cloud, RadioTower, Sparkles } from 'lucide-react';
import { MetricCard } from '../components/features/MetricCard';
import { WeatherCard } from '../components/features/WeatherCard';
import { getAnalytics } from '../api/analyticsService';
import { getWeather } from '../api/weatherService';
import { apiClient } from "../api/axios";

export function DashboardPage() {
  const [weather, setWeather] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  useEffect(() => {
  const load = async () => {
    try {
      setWeatherLoading(true);
      setAnalyticsLoading(true);

      // Get current location
      const locationRes = await apiClient.get("/location");
      const city = locationRes.data.query;

      // Load weather + analytics together
      const [weatherResponse, analyticsResponse] = await Promise.all([
        getWeather({ city }),
        getAnalytics(),
      ]);

      setWeather(weatherResponse);
      setAnalytics(analyticsResponse);
    } catch (err) {
      setWeatherError(
        err instanceof Error
          ? err.message
          : "Unable to load dashboard data."
      );
    } finally {
      setWeatherLoading(false);
      setAnalyticsLoading(false);
    }
  };

  void load();
}, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 shadow-[0_0_120px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
              <Sparkles size={16} />
              Operations overview
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white">WeatherOps control center</h2>
            <p className="mt-2 max-w-2xl text-slate-400">Monitor live conditions, station insights, and forecast intelligence in one premium surface.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
            <div className="flex items-center gap-2 text-emerald-300">
              <Activity size={16} />
              Backend connected for API-ready workflows
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard label="Live Stations" value="24" />
        <MetricCard label="Forecast Confidence" value="91%" accent="from-emerald-500 to-cyan-500" />
        <MetricCard label="Active Models" value="Gemini + Qwen" accent="from-violet-500 to-fuchsia-500" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Current weather</p>
              <h3 className="mt-1 text-xl font-semibold text-white">{weather?.city} overview overview</h3>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-cyan-300">
              <Cloud size={18} />
            </div>
          </div>

          {weatherLoading ? (
            <div className="mt-6 text-slate-400">Loading live weather snapshot…</div>
          ) : weatherError ? (
            <div className="mt-6 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">{weatherError}</div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <WeatherCard title="Temperature" value={weather?.temperature} unit="°C" icon="temp" />
              <WeatherCard title="Humidity" value={weather?.humidity} unit="%" icon="humidity" />
              <WeatherCard title="Wind" value={weather?.windSpeed} unit="km/h" icon="wind" />
              <WeatherCard title="Pressure" value={weather?.pressure} unit="hPa" />
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Forecast health</p>
              <h3 className="mt-1 text-xl font-semibold text-white">Analytics pulse</h3>
            </div>
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-3 text-violet-300">
              <RadioTower size={18} />
            </div>
          </div>

          {analyticsLoading ? (
            <div className="mt-6 text-slate-400">Preparing analytics view…</div>
          ) : (
            <div className="mt-6 space-y-3">
              {analytics ? (
                <>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-slate-300">
                    Forecast accuracy: <span className="font-semibold text-white">92%</span>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-slate-300">
                    Bias trend: <span className="font-semibold text-white">+1.2°C</span>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-slate-300">
                    Confidence: <span className="font-semibold text-white">High</span>
                  </div>
                </>
              ) : null}
            </div>
          )}
        </motion.div>
      </div>

      <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Quick route</p>
            <h3 className="mt-1 text-xl font-semibold text-white">Jump into the AI workspace</h3>
          </div>
          <a href="/chat" className="inline-flex items-center gap-2 text-sm text-cyan-300">
            Open chat <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
