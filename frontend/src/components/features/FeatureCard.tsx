import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-[0_0_80px_rgba(0,0,0,0.25)] backdrop-blur"
    >
      <div className="mb-4 inline-flex rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-cyan-300">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </motion.div>
  );
}
