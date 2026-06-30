import { Sparkles, Github, Twitter, Layers } from "lucide-react";

interface FooterProps {
  setView: (view: "landing" | "dashboard") => void;
}

export default function Footer({ setView }: FooterProps) {
  return (
    <footer className="relative bg-[#09090F] border-t border-white/[0.05] py-16 px-6 z-10 overflow-hidden">
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-20 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start justify-between gap-10">
        {/* Brand Column */}
        <div className="flex flex-col gap-4 max-w-sm">
          <div
            onClick={() => {
              setView("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 cursor-pointer group w-fit"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#3B82F6] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Priora<span className="text-gradient-primary">.AI</span>
            </span>
          </div>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Your Autonomous Productivity Companion. Orchestrating schedules, protecting deep cognitive focus, and completing tasks autonomously using Google Gemini AI.
          </p>
          <div className="text-[10px] text-[#A1A1AA] font-mono mt-2">
            © 2026 Priora AI, Inc. All rights reserved.
          </div>
        </div>

        {/* Links Columns */}
        <div className="flex flex-wrap gap-12 sm:gap-16">
          {/* Column 1: Ecosystem */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-mono font-bold tracking-wider uppercase text-white/50">Ecosystem</h4>
            <button onClick={() => setView("dashboard")} className="text-left text-xs font-medium text-[#A1A1AA] hover:text-white transition-colors">
              AI Planner
            </button>
            <button onClick={() => setView("dashboard")} className="text-left text-xs font-medium text-[#A1A1AA] hover:text-white transition-colors">
              Smart Scheduler
            </button>
            <button onClick={() => setView("dashboard")} className="text-left text-xs font-medium text-[#A1A1AA] hover:text-white transition-colors">
              Focus Engine
            </button>
          </div>

          {/* Column 2: Legal / Docs */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-mono font-bold tracking-wider uppercase text-white/50">Developer Nodes</h4>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xs font-medium text-[#A1A1AA] hover:text-white transition-colors flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xs font-medium text-[#A1A1AA] hover:text-white transition-colors flex items-center gap-1.5">
              <Twitter className="w-3.5 h-3.5" />
              <span>Twitter / X</span>
            </a>
            <span className="text-xs font-medium text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              All Nodes Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
