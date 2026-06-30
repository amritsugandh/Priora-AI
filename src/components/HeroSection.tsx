import { Play, ArrowRight, Sparkles, Calendar, CheckSquare, Clock, TrendingUp, AlertTriangle, MessageSquare, Mic, PlayCircle } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  setView: (view: "landing" | "dashboard") => void;
}

export default function HeroSection({ setView }: HeroSectionProps) {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden flex flex-col items-center px-6">
      {/* Background gradients and visual grid */}
      <div className="absolute inset-0 grid-pattern pointer-events-none z-0 opacity-40"></div>
      <div className="absolute inset-0 radial-glow-purple pointer-events-none z-0"></div>
      <div className="absolute inset-0 radial-glow-blue pointer-events-none z-0"></div>

      {/* Decorative floating background blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "2s" }}></div>

      {/* AI Badge above the heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs text-white/90 font-medium tracking-wide shadow-lg border border-white/[0.08] hover:border-[#7C3AED]/30 transition-colors cursor-pointer"
        onClick={() => setView("dashboard")}
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C3AED]"></span>
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#7C3AED] animate-pulse" />
        <span className="font-mono uppercase tracking-widest text-[10px]">Powered by Google Gemini AI</span>
      </motion.div>

      {/* Hero Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="relative z-10 font-display text-4xl sm:text-6xl md:text-7.5xl font-bold tracking-tight text-center max-w-[900px] leading-[1.1] mb-6 text-white"
      >
        Meet <span className="text-gradient-primary">Priora AI</span>
        <br />
        Your Autonomous Productivity Companion
      </motion.h1>

      {/* Hero Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 text-base sm:text-lg md:text-[#A1A1AA] text-center max-w-[700px] leading-relaxed mb-10 text-white/75 px-4"
      >
        Experience hands-free time-management. Priora automatically designs your schedule, predicts deadline vulnerabilities, integrates with your calendars, and completes tasks autonomously using Gemini-powered intelligence.
      </motion.p>

      {/* Primary and Secondary CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-20 w-full sm:w-auto px-6"
      >
        <button
          onClick={() => setView("dashboard")}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#8B5CF6] hover:to-[#60A5FA] text-white rounded-2xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.03] shadow-lg shadow-purple-500/25 cursor-pointer"
        >
          <span>Start Free</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => setView("dashboard")}
          className="w-full sm:w-auto px-8 py-4 glass-panel hover:bg-white/[0.08] text-white rounded-2xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 border border-white/[0.08] hover:border-white/20 hover:scale-[1.03] cursor-pointer"
        >
          <PlayCircle className="w-5 h-5 text-[#3B82F6]" />
          <span>Watch Demo</span>
        </button>
      </motion.div>

      {/* Immersive Dashboard Mock Preview container */}
      <div className="relative w-full max-w-[1050px] mx-auto z-10 px-4 md:px-0">
        {/* Slow floating elements revolving around the dashboard */}
        {/* Floating Element 1: Upcoming Meeting */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-12 top-10 hidden lg:flex items-center gap-3.5 px-4 py-3 rounded-2xl glass-panel border border-white/[0.08] shadow-2xl z-20 w-56"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-blue-400">Upcoming Meeting</div>
            <div className="text-xs font-semibold text-white truncate">Sprint Alignment</div>
            <div className="text-[10px] text-[#A1A1AA]">9:30 AM (In 15m)</div>
          </div>
        </motion.div>

        {/* Floating Element 2: Deadline Risk Alert */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-16 top-24 hidden lg:flex items-center gap-3.5 px-4 py-3 rounded-2xl glass-panel border border-red-500/20 shadow-2xl z-20 w-60"
        >
          <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center text-red-400 animate-pulse">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-red-400 font-semibold">Deadline Alert</div>
            <div className="text-xs font-semibold text-white truncate">Database Schema Review</div>
            <div className="text-[10px] text-[#A1A1AA]">Risk Level: Critical</div>
          </div>
        </motion.div>

        {/* Floating Element 3: AI Recommendation */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -left-20 bottom-24 hidden lg:flex items-center gap-3.5 px-4 py-3 rounded-2xl glass-panel border border-purple-500/25 shadow-2xl z-20 w-64"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#7C3AED] font-semibold">AI Assistant</div>
            <div className="text-xs font-semibold text-white truncate">Optimizing Calendar Blocks...</div>
            <div className="text-[10px] text-emerald-400 font-medium">+1.5 hrs Focus Time Found</div>
          </div>
        </motion.div>

        {/* Floating Element 4: Productivity Score */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -right-12 bottom-16 hidden lg:flex items-center gap-3.5 px-4 py-3 rounded-2xl glass-panel border border-emerald-500/20 shadow-2xl z-20 w-52"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-400">Activity Score</div>
            <div className="text-lg font-bold text-white font-mono">94% <span className="text-xs text-emerald-400 font-normal">▲ 8%</span></div>
          </div>
        </motion.div>

        {/* Outer frame of large visual mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative rounded-3xl p-1.5 sm:p-2 bg-gradient-to-tr from-white/10 to-white/[0.03] border border-white/[0.08] shadow-3xl overflow-hidden cursor-pointer"
          onClick={() => setView("dashboard")}
        >
          <div className="absolute -inset-0 bg-gradient-to-tr from-[#7C3AED]/10 to-[#3B82F6]/5 blur-xl pointer-events-none"></div>

          {/* Real-looking Dashboard Preview Mock */}
          <div className="relative rounded-[20px] bg-[#11111B] overflow-hidden border border-white/[0.05] p-5 sm:p-6 select-none">
            {/* Header Mock */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/[0.05] pb-5 mb-5 gap-3">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  Good Evening, Alex <span className="animate-wave origin-bottom-right inline-block">👋</span>
                </h3>
                <p className="text-xs text-[#A1A1AA] mt-0.5">Let's check your AI-optimized focus itinerary for today</p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-xs bg-[#181825] px-3 py-1.5 rounded-lg border border-white/5 text-[#A1A1AA] font-mono">UTC: 17:19</span>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Gemini Active
                </span>
              </div>
            </div>

            {/* Core dashboard mock content: 3 column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Left Column: AI Daily Brief & Productivity Score */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {/* AI Daily Brief Glass Card Mock */}
                <div className="rounded-2xl p-5 bg-gradient-to-r from-[#7C3AED]/15 to-[#3B82F6]/10 border border-purple-500/20">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#7C3AED]" />
                      <h4 className="text-sm font-semibold text-white">AI Daily Brief</h4>
                    </div>
                    <span className="text-[10px] font-mono bg-purple-500/10 text-[#7C3AED] border border-purple-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">Gemini Suggested</span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
                    You have <span className="text-white font-medium">5 active tasks</span> and <span className="text-white font-medium">2 looming deadlines</span> today. AI predicts a <span className="text-emerald-400 font-semibold">Medium</span> deadline risk. Recommended start time is <span className="text-white font-semibold">9:00 AM</span>.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="bg-black/20 rounded-xl p-3 border border-white/[0.04] flex items-center justify-between">
                      <span className="text-xs text-[#A1A1AA]">Deadline Risk:</span>
                      <span className="text-xs font-semibold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">Medium</span>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 border border-white/[0.04] flex items-center justify-between">
                      <span className="text-xs text-[#A1A1AA]">Confidence:</span>
                      <span className="text-xs font-semibold text-emerald-400 font-mono">92%</span>
                    </div>
                  </div>
                </div>

                {/* Today's Tasks */}
                <div className="rounded-2xl p-5 bg-[#181825] border border-white/[0.05]">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs uppercase font-semibold text-[#A1A1AA] tracking-wider">Priority Focus Tasks</h4>
                    <span className="text-xs text-[#7C3AED] hover:underline font-semibold flex items-center gap-0.5">View Workspace <ArrowRight className="w-3 h-3" /></span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.03]">
                      <div className="flex items-center gap-3">
                        <CheckSquare className="w-4.5 h-4.5 text-[#7C3AED]" />
                        <span className="text-xs text-white font-medium">Database Schema Review</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-semibold uppercase">High</span>
                        <span className="text-[10px] font-mono text-[#A1A1AA]">2 hrs</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.03]">
                      <div className="flex items-center gap-3">
                        <CheckSquare className="w-4.5 h-4.5 text-white/20" />
                        <span className="text-xs text-white/80">Integrate Gemini API</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold uppercase">Medium</span>
                        <span className="text-[10px] font-mono text-[#A1A1AA]">3 hrs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Focus Timer, Calendar Widget */}
              <div className="flex flex-col gap-5">
                {/* Focus Timer */}
                <div className="rounded-2xl p-5 bg-[#181825] border border-white/[0.05] flex flex-col items-center">
                  <h4 className="text-xs uppercase font-semibold text-[#A1A1AA] tracking-wider mb-3.5 self-start">Focus Block</h4>
                  <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="56" cy="56" r="48" fill="transparent" stroke="rgba(255,255,255,0.02)" strokeWidth="6" />
                      <circle cx="56" cy="56" r="48" fill="transparent" stroke="url(#timerGradient)" strokeWidth="6" strokeDasharray="301.59" strokeDashoffset="75.4" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#7C3AED" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-xl font-bold text-white font-mono">18:45</span>
                      <p className="text-[9px] text-[#A1A1AA] font-mono">FOCUSING</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium bg-black/25 px-4 py-2 rounded-xl border border-white/[0.03] w-full justify-around font-mono">
                    <div>🔥 4/5 Streak</div>
                    <div>🎯 90m Done</div>
                  </div>
                </div>

                {/* AI Assistant Chat Widget Mock */}
                <div className="rounded-2xl p-4 bg-black/40 border border-white/[0.05] flex flex-col gap-3">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-xs font-semibold text-white">Ask Priora</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#181825] text-[11px] text-[#A1A1AA] leading-normal border border-white/5">
                    "Alex, would you like me to optimize your remaining focus slots?"
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Ask Gemini to plan..."
                      disabled
                      className="bg-[#181825] border border-white/5 rounded-lg px-3 py-1.5 text-[10px] w-full text-white placeholder-white/30"
                    />
                    <button className="p-1.5 rounded-lg bg-[#7C3AED] text-white">
                      <Mic className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
