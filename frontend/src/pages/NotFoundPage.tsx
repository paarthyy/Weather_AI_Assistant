import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(135deg,_#020617,_#0f172a_48%,_#111827)] px-4 text-slate-100">
      <div className="max-w-xl rounded-[32px] border border-slate-800/80 bg-slate-900/70 p-10 text-center backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-3 text-slate-400">The route you requested does not exist, but the WeatherOps experience is ready to guide you elsewhere.</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300">
          <ArrowLeft size={16} /> Return home
        </Link>
      </div>
    </div>
  );
}
