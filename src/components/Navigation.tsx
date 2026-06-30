import { useState, useEffect } from "react";
import { Sparkles, Menu, X, ArrowRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  currentView: "landing" | "dashboard";
  setView: (view: "landing" | "dashboard") => void;
  user?: { name: string; email: string } | null;
  onOpenAuth: (mode?: "signin" | "signup") => void;
  onLogout: () => void;
}

export default function Navigation({ currentView, setView, user, onOpenAuth, onLogout }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setView("landing");
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#09090F]/85 backdrop-blur-md border-b border-white/[0.08] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => setView("landing")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#3B82F6] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#3B82F6] opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300"></span>
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-white">
            Priora<span className="text-gradient-primary">.AI</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick("features-section")}
            className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors duration-200"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick("how-it-works")}
            className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors duration-200"
          >
            Autonomous Engine
          </button>
          <button
            onClick={() => setView(currentView === "landing" ? "dashboard" : "landing")}
            className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors duration-200 flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4 text-[#7C3AED]" />
            {currentView === "landing" ? "Try Workspace" : "Landing Page"}
          </button>
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#A1A1AA]">
                Hi, <span className="text-white">{user.name}</span>
              </span>
              <button
                id="workspace-toggle-btn"
                onClick={() => setView(currentView === "landing" ? "dashboard" : "landing")}
                className={`px-5 py-2.5 rounded-xl font-medium text-xs transition-all duration-300 flex items-center gap-2 hover:scale-[1.02] shadow-md cursor-pointer ${
                  currentView === "landing"
                    ? "bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white shadow-purple-500/20"
                    : "bg-white/[0.06] hover:bg-white/10 text-white border border-white/[0.08]"
                }`}
              >
                <span>{currentView === "landing" ? "Launch Workspace" : "Return Home"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onLogout}
                className="text-xs font-semibold text-red-400 hover:text-red-350 bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAuth("signin")}
                className="text-xs font-semibold text-[#A1A1AA] hover:text-white px-4 py-2 transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => onOpenAuth("signup")}
                className="bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#8B5CF6] hover:to-[#60A5FA] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-purple-500/10 hover:scale-[1.02] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Sign Up</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/[0.04] border border-white/10 text-[#A1A1AA] hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#11111B] border-b border-white/[0.08]"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <button
                onClick={() => handleNavClick("features-section")}
                className="text-left py-2 text-base font-medium text-[#A1A1AA] hover:text-white border-b border-white/[0.03]"
              >
                Features
              </button>
              <button
                onClick={() => handleNavClick("how-it-works")}
                className="text-left py-2 text-base font-medium text-[#A1A1AA] hover:text-white border-b border-white/[0.03]"
              >
                Autonomous Engine
              </button>
              <button
                onClick={() => {
                  setView(currentView === "landing" ? "dashboard" : "landing");
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 text-base font-medium text-[#A1A1AA] hover:text-white border-b border-white/[0.03] flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4 text-[#7C3AED]" />
                {currentView === "landing" ? "Try Workspace" : "Landing Page"}
              </button>
              {user ? (
                <div className="flex flex-col gap-3 mt-2">
                  <div className="text-xs font-semibold text-[#A1A1AA] px-1">
                    Logged in as <span className="text-white font-bold">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setView(currentView === "landing" ? "dashboard" : "landing");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <span>{currentView === "landing" ? "Launch Workspace" : "Return Home"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 mt-2">
                  <button
                    onClick={() => {
                      onOpenAuth("signin");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 bg-white/[0.04] border border-white/10 text-white rounded-xl font-semibold text-center"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuth("signup");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
