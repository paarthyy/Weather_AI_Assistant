import { motion } from 'framer-motion';
import { ArrowRight, Bot, BrainCircuit, Cloud, Compass, DatabaseZap, Gauge, Map, Sparkles, Telescope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FeatureCard } from '../components/features/FeatureCard';
import { Button } from '../components/ui/Button';

const featureCards = [
  { icon: Bot, title: 'AI Chat', description: 'Conversational weather intelligence with tool-aware reasoning.' },
  { icon: Cloud, title: 'Live Weather', description: 'Current conditions and rapid updates from live APIs.' },
  { icon: DatabaseZap, title: 'IMD Dataset', description: 'Explore historical and station-based IMD weather data.' },
  { icon: Gauge, title: 'Forecast Analysis', description: 'Understand trends, confidence, and forecast accuracy.' },
  { icon: Map, title: 'Interactive Maps', description: 'Navigate India’s weather stations with live markers.' },
  { icon: Compass, title: 'Station Explorer', description: 'Search and inspect crucial stations with rich metadata.' },
  { icon: Telescope, title: 'Analytics Dashboard', description: 'Visualize temperature, humidity, and bias trends.' },
];

const stack = ['LangGraph', 'Gemini', 'Qwen', 'FastAPI', 'React', 'Tailwind'];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(135deg,_#020617,_#0f172a_48%,_#111827)] text-slate-100">
      <main className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-8 shadow-[0_0_120px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                <Sparkles size={16} />
                AI Powered Weather Intelligence Platform
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                WeatherOps AI
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                A premium weather operating system for forecasting, station analysis, and AI-guided decision support.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/chat">
                  <Button>Start Chat <ArrowRight className="ml-2 inline" size={16} /></Button>
                </Link>
                <a href="#features">
                  <Button variant="secondary">Learn More</Button>
                </a>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Live Weather Pulse</p>
                  <p className="mt-1 text-4xl font-semibold text-white">31°</p>
                </div>
                <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-cyan-300">
                  <Cloud size={28} />
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {['Humidity 49%', 'Wind 13 km/h', 'Pressure 1008 hPa', 'Feels Like 34°'].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <section id="features" className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-8 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-cyan-300">
              <BrainCircuit size={18} />
              <p className="text-sm font-medium">Platform capabilities</p>
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white">Everything you need for weather intelligence</h2>
            <p className="mt-3 text-slate-400">From live forecasts to IMD datasets and station-level analysis, the experience is designed for modern operators and analysts.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {featureCards.slice(0, 4).map((card) => (
                <FeatureCard key={card.title} {...card} />
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-8 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-cyan-300">
              <Sparkles size={18} />
              <p className="text-sm font-medium">Technology stack</p>
            </div>
            <div className="mt-8 grid gap-4">
              {stack.map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-300"
                >
                  <span>{item}</span>
                  <span className="text-sm text-cyan-300">Ready</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-8 backdrop-blur-xl">
          <div className="grid gap-5 lg:grid-cols-3">
            {featureCards.slice(4).map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
