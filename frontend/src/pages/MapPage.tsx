import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search } from "lucide-react";
import { getStations } from "../api/stationService";

const stationIcon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Station {
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  elevation: number;
}

function FlyToLocation({
  query,
  stations,
}: {
  query: string;
  stations: Station[];
}) {
  const map = useMap();

  useEffect(() => {
    if (!query.trim()) return;

    const normalized = query.toLowerCase().trim();

    const target = stations.find(
      (station) =>
        station.name.toLowerCase().includes(normalized) ||
        station.region.toLowerCase().includes(normalized)
    );

    if (target) {
      map.flyTo([target.latitude, target.longitude], 8);
    }
  }, [query, stations, map]);

  return null;
}

export function MapPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getStations();
        setStations(response);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load stations."
        );
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Interactive India map
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-white">
              Weather station network
            </h2>
          </div>

          <label className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
            <Search size={16} />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city"
              className="bg-transparent outline-none"
            />
          </label>
        </div>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-2 backdrop-blur-xl">
        {loading ? (
          <div className="p-6 text-slate-400">
            Loading station map...
          </div>
        ) : error ? (
          <div className="p-6 text-rose-300">
            {error}
          </div>
        ) : (
          <div className="h-[620px] w-full overflow-hidden rounded-[24px]">
            <MapContainer
              center={[22.9734, 78.6569]}
              zoom={5}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <FlyToLocation
                query={query}
                stations={stations}
              />

              {stations.map((station) => (
                <Marker
                  key={station.name}
                  position={[
                    station.latitude,
                    station.longitude,
                  ]}
                  icon={stationIcon}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold">
                        {station.name}
                      </p>

                      <p>
                        Latitude: {station.latitude}
                      </p>

                      <p>
                        Longitude: {station.longitude}
                      </p>

                      <p>
                        Elevation: {station.elevation} m
                      </p>

                      <p>
                        Region: {station.region}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
}