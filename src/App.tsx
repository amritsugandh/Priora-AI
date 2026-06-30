import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks";
import DashboardView from "./components/DashboardView";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // User Session State
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const stored = localStorage.getItem("priora_user");
    return stored ? JSON.parse(stored) : null;
  });

  // Auth modal management
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");

  // Global View State ('landing' representing SaaS platform or 'dashboard' representing interactive Priora Workspace)
  const [view, setView] = useState<"landing" | "dashboard">("landing");

  // Keep scroll position neat when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [view]);

  // Handle successful login or sign up
  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem("priora_user", JSON.stringify(userData));
    setView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("priora_user");
    setView("landing");
  };

  const handleSetView = (targetView: "landing" | "dashboard") => {
    if (targetView === "dashboard" && !user) {
      setAuthMode("signup");
      setIsAuthOpen(true);
      return;
    }
    setView(targetView);
  };

  const handleOpenAuth = (mode: "signin" | "signup" = "signup") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#09090F] text-white selection:bg-[#7C3AED]/30 selection:text-white">
      {/* 1. Subtle, eye-safe grain noise overlay */}
      <div className="noise-bg"></div>

      {/* 2. Glassmorphic sticky top-navigation bar */}
      <Navigation
        currentView={view}
        setView={handleSetView}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* 3. Page layout switcher with Framer Motion slide-fade transitions */}
      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* SaaS Landing Page */}
            <HeroSection setView={handleSetView} />
            <FeaturesSection />
            <HowItWorks />
            <Footer setView={handleSetView} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Interactive Workspace Dashboard */}
            <DashboardView user={user} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Elegant Glassmorphic Authentication System Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
