import { motion } from 'framer-motion';

export function LoadingSpinner({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-slate-800/70 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 shadow-lg shadow-slate-950/30 backdrop-blur">
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="h-4 w-4 rounded-full border-2 border-cyan-400 border-t-transparent"
      />
      <span>{label}</span>
    </div>
  );
}
