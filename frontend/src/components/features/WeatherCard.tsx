import { motion } from 'framer-motion';
import { Droplets, Wind, Thermometer,Gauge } from 'lucide-react';

interface WeatherCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: 'temp' | 'humidity' | 'wind' | 'pressure';
}

export function WeatherCard({ title, value, unit, icon = 'temp' }: WeatherCardProps) {
  const iconMap = {
    temp: <Thermometer size={20} />,
    humidity: <Droplets size={20} />,
    wind: <Wind size={20} />,
    pressure: <Gauge size={20} />,
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="rounded-[28px] border border-slate-800 bg-slate-950/70 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <div className="text-cyan-300">{iconMap[icon]}</div>
      </div>
      <div className="mt-4 flex items-end gap-1">
        <span className="text-4xl font-bold text-white tracking-tight">{value}</span>
        {unit ? <span className="pb-1 text-sm text-slate-400">{unit}</span> : null}
      </div>
    </motion.div>
  );
}
