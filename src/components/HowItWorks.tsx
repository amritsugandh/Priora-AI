import { Plus, Cpu, Calendar, TrendingUp, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Add Task",
    icon: Plus,
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    lineColor: "from-blue-500",
    desc: "Speak naturally or input tasks. Priora reads natural language, parsing dates, deadlines, and requirements instantly."
  },
  {
    number: "02",
    title: "AI Analyzes",
    icon: Cpu,
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    lineColor: "from-blue-500 to-purple-500",
    desc: "Gemini evaluates your cognitive capacity, task difficulty, risk factors, and existing schedule constraints."
  },
  {
    number: "03",
    title: "Generates Schedule",
    icon: Calendar,
    color: "bg-[#7C3AED]/10 text-purple-400 border-[#7C3AED]/20",
    lineColor: "from-purple-500 to-emerald-500",
    desc: "Priora generates a real-time calendar agenda, reserving deep work blocks for your most complex responsibilities."
  },
  {
    number: "04",
    title: "Tracks Progress",
    icon: TrendingUp,
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    lineColor: "from-emerald-500 to-amber-500",
    desc: "Adaptive timers watch over your active sessions. If you overflow, the schedule dynamically morphs to prevent stress."
  },
  {
    number: "05",
    title: "Completes Successfully",
    icon: CheckCircle,
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    lineColor: "from-amber-500 to-emerald-500",
    desc: "Slam your deadlines and log deep insights. Your workspace metrics compile detailed trends to calibrate your next loop."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-6 bg-[#09090F] border-t border-white/[0.04]">
      {/* Background radial effects */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono font-bold uppercase tracking-widest text-[#3B82F6] mb-3"
          >
            How it works
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4"
          >
            The Autonomous Engine
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#A1A1AA] text-base sm:text-lg max-w-[600px] mx-auto leading-relaxed"
          >
            Five highly integrated structural layers coordinating in perfect synergy to protect your focus and accelerate output.
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 mt-12">
          {/* Connecting line on desktop */}
          <div className="absolute top-[38px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hidden lg:block opacity-25 z-0"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative flex flex-col items-start lg:items-center text-left lg:text-center px-4 group z-10"
              >
                {/* Step Circle with Icon */}
                <div className="flex items-center justify-between lg:justify-center w-full lg:w-auto mb-5">
                  <div className={`w-18 h-18 rounded-2xl flex items-center justify-center border ${step.color} shadow-lg shadow-black/40 group-hover:scale-105 group-hover:border-white/20 transition-all duration-300 relative`}>
                    <Icon className="w-8 h-8" />
                    {/* Floating Step Number */}
                    <span className="absolute -top-3.5 -right-3.5 text-xs font-mono font-bold bg-[#11111B] border border-white/10 text-[#A1A1AA] w-6 h-6 rounded-lg flex items-center justify-center shadow-md">
                      {step.number}
                    </span>
                  </div>

                  {/* Connect Line inside mobile */}
                  <div className="h-0.5 flex-1 bg-white/[0.04] mx-4 lg:hidden"></div>
                </div>

                {/* Step Title */}
                <h3 className="font-display text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-gradient-primary transition-all">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-xs lg:max-w-none px-0 lg:px-2">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
