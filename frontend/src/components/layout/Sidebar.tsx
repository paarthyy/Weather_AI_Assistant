import { motion } from 'framer-motion';
import { BarChart3, Bot, Compass, LayoutDashboard, Map, Settings, Snowflake, Sparkles, RadioTower } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'AI Chat', href: '/chat', icon: Bot },
  { label: 'Live Weather', href: '/weather', icon: Snowflake },
  { label: 'Station Explorer', href: '/stations', icon: RadioTower },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Maps', href: '/map', icon: Map },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({ open }: { open: boolean }) {
  return (
    <motion.aside
      initial={false}
      animate={{ x: open ? 0 : -320 }}
      transition={{ type: 'spring', stiffness: 220, damping: 28 }}
      className="fixed left-0 top-0 z-40 w-72 shrink-0 rounded-[32px] border border-slate-800/80 bg-slate-950/95 p-5 backdrop-blur-xl lg:static lg:h-[640px]"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3">
        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/20 p-2 text-cyan-300">
          <Sparkles size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">WeatherOps AI</p>
          <p className="text-xs text-slate-400">Premium weather OS</p>
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-all ${isActive ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-white shadow-lg shadow-cyan-950/20' : 'text-slate-400 hover:bg-slate-900/70 hover:text-slate-200'}`
              }
            >
              <Icon size={16} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-4">
        <div className="flex items-center gap-2 text-cyan-300">
          <Compass size={16} />
          <p className="text-sm font-medium">Live intelligence</p>
        </div>
        <p className="mt-2 text-sm text-slate-400">Monitor forecast streams, IMD data, and analytics from one command center.</p>
      </div>
    </motion.aside>
  );
}
