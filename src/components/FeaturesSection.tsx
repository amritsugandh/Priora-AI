import { 
  Sparkles, 
  BrainCircuit, 
  AlertTriangle, 
  CalendarRange, 
  Flame, 
  BarChart3, 
  Mic, 
  Timer, 
  ArrowRight 
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Sparkles,
    color: "from-purple-500 to-indigo-500",
    glowColor: "rgba(124, 58, 237, 0.15)",
    title: "AI Planner",
    description: "Gemini-powered priority generation. Generates complete, highly tailored productivity roadmaps based on your deadlines, cognitive energy, and tasks."
  },
  {
    icon: BrainCircuit,
    color: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.15)",
    title: "Smart Scheduler",
    description: "Adaptive time blocking that moves with your life. If a meeting runs late or a task overflows, the scheduler recalibrates your entire day in real-time."
  },
  {
    icon: AlertTriangle,
    color: "from-rose-500 to-orange-500",
    glowColor: "rgba(239, 68, 68, 0.15)",
    title: "Deadline Predictor",
    description: "Risk analysis models identify potential bottlenecks days before they happen, suggesting immediate mitigations to keep your commitments on track."
  },
  {
    icon: CalendarRange,
    color: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.15)",
    title: "Google Calendar Sync",
    description: "Bi-directional real-time cloud calendar sync. Seamlessly import corporate meetings and overlay focus blocks to prevent external scheduling conflicts."
  },
  {
    icon: Flame,
    color: "from-amber-500 to-red-500",
    glowColor: "rgba(245, 158, 11, 0.15)",
    title: "Habit Tracker",
    description: "Build ironclad daily disciplines. Track metrics, streaks, and frequency stats with intelligent notifications triggered by your peak energy blocks."
  },
  {
    icon: BarChart3,
    color: "from-violet-500 to-fuchsia-500",
    glowColor: "rgba(139, 92, 246, 0.15)",
    title: "AI Analytics",
    description: "Deep statistical performance reports. Understand exactly where your attention is going with automated charts and actionable daily efficiency logs."
  },
  {
    icon: Mic,
    color: "from-pink-500 to-rose-500",
    glowColor: "rgba(236, 72, 153, 0.15)",
    title: "Voice Assistant",
    description: "Speak naturally to plan your schedule. Hands-free task insertion and queries. Gemini interprets your intent and coordinates your agenda instantly."
  },
  {
    icon: Timer,
    color: "from-blue-600 to-indigo-600",
    glowColor: "rgba(37, 99, 235, 0.15)",
    title: "Focus Mode",
    description: "Immersive distraction-free dashboard. Leverages tailored micro-intervals, visual ticking timers, and offline protections to maximize cognitive flow."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features-section" className="relative py-24 px-6 bg-[#09090F]">
      <div className="absolute inset-0 radial-glow-purple-bottom pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono font-bold uppercase tracking-widest text-[#7C3AED] mb-3"
          >
            System Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Engineered For Maximum Output
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#A1A1AA] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed"
          >
            Unlike traditional notification apps, Priora coordinates an entire ecosystem of productivity micro-services operating autonomously for you.
          </motion.p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative rounded-2xl bg-[#11111B]/60 border border-white/[0.05] p-6 hover:bg-[#181825]/80 hover:border-white/[0.1] hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
                style={{
                  boxShadow: `hover: 0 10px 40px ${feature.glowColor}`
                }}
              >
                {/* Visual Glow overlay inside each card */}
                <div className="absolute -inset-0 bg-gradient-to-tr from-white/[0.01] to-white/[0.02] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none"></div>

                <div>
                  {/* Icon with customizable colorful backplate */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feature.color} p-3 mb-6 flex items-center justify-center text-white shadow-lg`}>
                    <IconComponent className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-white mb-2 tracking-tight group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6 group-hover:text-white/80 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Animated Learn More arrow link */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#7C3AED] group-hover:text-white transition-colors duration-300 mt-auto">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
