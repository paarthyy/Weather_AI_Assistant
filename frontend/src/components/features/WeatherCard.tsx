import { motion } from 'framer-motion';
import { Droplets, Wind, Thermometer } from 'lucide-react';

interface WeatherCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: 'temp' | 'humidity' | 'wind';
}

export function WeatherCard({ title, value, unit, icon = 'temp' }: WeatherCardProps) {
  const iconMap = {
    temp: <Thermometer size={18} />,
    humidity: <Droplets size={18} />,
    wind: <Wind size={18} />,
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-lg shadow-black/20"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <div className="text-cyan-300">{iconMap[icon]}</div>
      </div>
      <div className="mt-4 flex items-end gap-1">
        <span className="text-3xl font-semibold text-white">{value}</span>
        {unit ? <span className="pb-1 text-sm text-slate-400">{unit}</span> : null}
      </div>
    </motion.div>
  );
}
