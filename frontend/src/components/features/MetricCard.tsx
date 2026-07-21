import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
  accent?: string;
}

export function MetricCard({ label, value, subtitle, accent = 'from-cyan-500 to-blue-600' }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5"
    >
      <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${accent}`} />
      <p className="mt-4 text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {subtitle && (
    <p className="mt-2 text-sm text-slate-400">
        {subtitle}
    </p>
)}
    </motion.div>
  );
}
