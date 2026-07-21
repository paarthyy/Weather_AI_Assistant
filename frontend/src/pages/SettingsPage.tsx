import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SlidersHorizontal,
  Cpu,
  Database,
  Bell,
  Save
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [model, setModel] = useState('Gemini');
  const [unit, setUnit] = useState('°C');
  const [notifications, setNotifications] = useState(true);
  const saveSettings = () => {

  localStorage.setItem("weather_provider", model);

  localStorage.setItem("weather_notifications", String(notifications));

  localStorage.setItem("weather_unit", unit);

  if (notifications) {
    alert("Settings Saved!");
  }

};

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

  <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4">

    <div className="flex items-center gap-3">

      <Cpu className="text-cyan-400" size={18}/>

      <div>

        <p className="font-medium text-white">
          Preferred AI Provider
        </p>

        <p className="text-sm text-slate-400">
          Choose which provider to use first.
        </p>

      </div>

    </div>

    <select
      value={model}
      onChange={(e)=>setModel(e.target.value)}
      className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2"
    >
      <option>Auto</option>
      <option>Gemini</option>
      <option>Groq</option>
    </select>

  </label>


  <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4">

    <div className="flex items-center gap-3">

      <Bell className="text-cyan-400" size={18}/>

      <div>

        <p className="font-medium text-white">
          Notifications
        </p>

        <p className="text-sm text-slate-400">
          Enable WeatherOps notifications.
        </p>

      </div>

    </div>

    <input
      type="checkbox"
      checked={notifications}
      onChange={()=>setNotifications(!notifications)}
      className="h-5 w-5"
    />

  </label>


  <button
    onClick={saveSettings}

    className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 py-3 font-medium hover:bg-cyan-500"

  >

    <Save size={18}/>

    Save Settings

  </button>

</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-cyan-300">
            <SlidersHorizontal size={18} />
            <p className="text-sm font-medium">AI System Information</p>
          </div>
          <div className="mt-6 space-y-3">

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 flex justify-between">

            <span className="text-slate-300">Backend</span>

            <span className="text-emerald-400 font-semibold">
            ONLINE
            </span>

            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 flex justify-between">

            <span className="text-slate-300">Framework</span>

            <span className="text-cyan-400">
            LangGraph
            </span>

            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 flex justify-between">

            <span className="text-slate-300">LLM Stack</span>

            <span className="text-white">
            Gemini + Groq
            </span>

            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 flex justify-between">

            <span className="text-slate-300">Weather API</span>

            <span className="text-emerald-400">
            Connected
            </span>

            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 flex justify-between">

            <span className="text-slate-300">IMD Dataset</span>

            <span className="text-emerald-400">
            Loaded
            </span>

            </div>

            </div>
        </motion.div>
      </div>
    </div>
  );
}
