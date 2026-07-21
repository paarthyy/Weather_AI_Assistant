import { motion } from "framer-motion";
import {
  Info,
  User,
  Cpu,
  Sparkles,
  Code2,
  CheckCircle,
} from "lucide-react";

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-5 py-4">
      <span className="text-slate-400">{label}</span>

      <span className="font-medium text-cyan-400">{value}</span>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="flex h-full w-full flex-col space-y-6">

      {/* Header */}
      <div className="w-full rounded-[32px] border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
        <p className="text-sm text-slate-400">
          About WeatherOps AI
        </p>

        <h2 className="mt-2 text-3xl font-semibold text-white">
          Learn more about the platform
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="h-[650px] w-full overflow-hidden rounded-[32px] border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">

        <div className="h-full overflow-y-auto p-8 space-y-6">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 text-cyan-300">
              <Info size={18} />
              <p className="text-sm font-medium">
                About WeatherOps AI
              </p>
            </div>

            <h1 className="mt-4 text-4xl font-bold text-white">
              WeatherOps AI
            </h1>

            <p className="mt-5 max-w-4xl text-slate-400 leading-8">
              WeatherOps AI is an intelligent weather analytics platform
              that combines Artificial Intelligence, meteorological
              datasets, and real-time weather APIs into one unified
              application. It enables natural language interaction,
              weather intelligence, IMD station exploration, and
              AI-powered forecast analysis through a modern dashboard.
            </p>
          </motion.div>

          {/* Application Information */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 text-cyan-300">
              <Cpu size={18} />
              <p className="text-sm font-medium">
                Application Information
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <InfoRow label="Application" value="WeatherOps AI" />
              <InfoRow label="Version" value="1.0.0" />
              <InfoRow label="Developer" value="Paarth Sehgal" />
              <InfoRow label="Backend" value="FastAPI" />
              <InfoRow label="Frontend" value="React + TypeScript" />
              <InfoRow label="AI Framework" value="LangGraph" />
              <InfoRow label="LLM Providers" value="Gemini + Groq" />
              <InfoRow label="Weather API" value="OpenWeather API" />
              <InfoRow label="Dataset" value="IMD Forecast Archive" />
              <InfoRow label="License" value="Academic Research" />
            </div>
          </motion.div>

          {/* Technology Stack */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 text-cyan-300">
              <Code2 size={18} />
              <p className="text-sm font-medium">
                Technology Stack
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {[
                "React",
                "TypeScript",
                "TailwindCSS",
                "FastAPI",
                "Python",
                "LangGraph",
                "LangChain",
                "Gemini",
                "Groq",
                "OpenWeather API",
                "Pandas",
                "IMD Dataset",
              ].map((tech) => (
                <div
                  key={tech}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 py-5 text-center font-medium text-cyan-400"
                >
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 text-cyan-300">
              <Sparkles size={18} />
              <p className="text-sm font-medium">
                Platform Features
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                "AI Weather Assistant",
                "Live Weather Monitoring",
                "Station Explorer",
                "Interactive India Map",
                "Nearby Station Discovery",
                "Weather Analytics Dashboard",
                "Gemini + Groq Multi-LLM Support",
                "IMD Dataset Integration",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4"
                >
                  <CheckCircle
                    className="text-emerald-400"
                    size={20}
                  />
                  <span className="text-white">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Developer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-[32px] border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 text-cyan-300">
              <User size={18} />
              <p className="text-sm font-medium">
                Developer
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <h2 className="text-3xl font-bold text-white">
                Paarth Sehgal
              </h2>

              <p className="text-slate-400">
                B.Tech Computer Science (AI & ML)
              </p>

              <p className="text-slate-400">
                NIIT University
              </p>

              <p className="text-slate-400 leading-7">
                Passionate about Artificial Intelligence,
                Weather Analytics, Machine Learning,
                Full-Stack Development, and building
                intelligent applications that combine
                research with real-world usability.
              </p>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="pb-4 pt-2 text-center text-sm text-slate-500">
            © 2026 Paarth Sehgal • WeatherOps AI • Version 1.0
          </div>

        </div>
      </div>
    </div>
  );
}