import { motion } from 'framer-motion';
import { Menu, Moon, Sun, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import UserMenu from "./UserMenu";

interface NavbarProps {
  onMenuToggle: () => void;
}

export function Navbar({ onMenuToggle }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="rounded-full border border-slate-700 bg-slate-900/70 p-2 text-slate-200 lg:hidden"
          >
            <Menu size={18} />
          </button>
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-2 text-cyan-400">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">WeatherOps AI</p>
              <p className="text-xs text-slate-400">Weather Intelligence</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="rounded-full border border-slate-700 bg-slate-900/70 p-2 text-slate-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
