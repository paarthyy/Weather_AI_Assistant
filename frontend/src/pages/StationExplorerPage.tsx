import { useEffect, useMemo, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { getStations } from '../api/stationService';
import { useNavigate } from "react-router-dom";

export function StationExplorerPage() {
  const navigate = useNavigate();
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getStations();
        setStations(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load stations.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const filteredStations = useMemo(() => {
    if (!stations) return [];
    return stations.filter((station: { name: string; region: string }) => station.name.toLowerCase().includes(query.toLowerCase()) || station.region.toLowerCase().includes(query.toLowerCase()));
  }, [stations, query]);

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-400">Stations at a glance</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Search and inspect weather stations</h2>
          </div>
          <label className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find station" className="bg-transparent outline-none" />
          </label>
        </div>
      </div>

      <div className="h-[650px] overflow-hidden rounded-[32px] border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
        {loading ? (
          <div className="p-6 text-slate-400">Loading stations…</div>
        ) : error ? (
          <div className="p-6 text-rose-300">{error}</div>
        ) : (
          <div className="h-full overflow-y-auto overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950 text-slate-400">
                <tr>
                  <th className="px-4 py-4">Station Name</th>
                  <th className="px-4 py-4">Latitude</th>
                  <th className="px-4 py-4">Longitude</th>
                  <th className="px-4 py-4">Elevation</th>
                  <th className="px-4 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStations.map((station: { id: string; name: string; latitude: number; longitude: number; elevation: number; temperature: number; forecastDays: number }) => (
                  <tr key={station.id} className="border-b border-slate-800/70 text-slate-300">
                    <td className="px-4 py-4 font-medium text-white">{station.name}</td>
                    <td className="px-4 py-4">{station.latitude}</td>
                    <td className="px-4 py-4">{station.longitude}</td>
                    <td className="px-4 py-4">{station.elevation} m</td>
                    <td className="px-4 py-4">
                      <button 
                      onClick={() =>
                            navigate(`/station/${station.id}`)

                            }
                      className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-cyan-300">
                        View Details <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
