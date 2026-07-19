import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [model, setModel] = useState('Gemini');
  const [unit, setUnit] = useState('°C');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
        <p className="text-sm text-slate-400">Workspace preferences</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Configure your WeatherOps experience</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-cyan-300">
            <SlidersHorizontal size={18} />
            <p className="text-sm font-medium">Appearance</p>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-slate-300">
              <div>
                <p className="font-medium text-white">Dark Mode</p>
                <p className="text-sm text-slate-400">Use the premium dark visual system.</p>
              </div>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-full border border-slate-700 bg-slate-900/70 p-2">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-slate-300">
              <div>
                <p className="font-medium text-white">Light Mode</p>
                <p className="text-sm text-slate-400">Switch to a lighter workspace.</p>
              </div>
              <button onClick={() => setTheme('light')} className="rounded-full border border-slate-700 bg-slate-900/70 p-2">
                <Sun size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-cyan-300">
            <SlidersHorizontal size={18} />
            <p className="text-sm font-medium">Preferences</p>
          </div>
          <div className="mt-6 space-y-4">
            <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-slate-300">
              <span>LLM Model</span>
              <select value={model} onChange={(event) => setModel(event.target.value)} className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white">
                <option>Gemini</option>
                <option>Qwen</option>
              </select>
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-slate-300">
              <span>Backend URL</span>
              <input className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white" defaultValue={import.meta.env.VITE_API_URL || 'http://localhost:8000'} />
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-slate-300">
              <span>Temperature Unit</span>
              <select value={unit} onChange={(event) => setUnit(event.target.value)} className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white">
                <option>°C</option>
                <option>°F</option>
              </select>
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-slate-300">
              <span>Notifications</span>
              <input type="checkbox" checked={notifications} onChange={() => setNotifications((value) => !value)} className="h-5 w-5 rounded border-slate-700 bg-slate-900/70" />
            </label>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
