import React, { useState, FormEvent, useEffect } from "react";
import { X, Mail, Lock, User as UserIcon, Sparkles, Loader2, ArrowRight, CheckCircle2, Copy, Check, ExternalLink, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { name: string; email: string }) => void;
  initialMode?: "signin" | "signup";
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = "signup" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [showConfigInstructions, setShowConfigInstructions] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Sync mode changes
  useEffect(() => {
    setMode(initialMode);
    setError("");
    setShowConfigInstructions(false);
  }, [initialMode, isOpen]);

  // Set up message listener for the authentic Google OAuth Callback popup window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin is from AI Studio preview or localhost
      const origin = event.origin;
      if (!origin.endsWith(".run.app") && !origin.includes("localhost")) {
        return;
      }
      if (event.data?.type === "OAUTH_AUTH_SUCCESS") {
        const userData = event.data.user;
        if (userData && userData.email) {
          setLoading(false);
          setSuccess(true);
          setTimeout(() => {
            onAuthSuccess(userData);
            setSuccess(false);
            onClose();
          }, 1200);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onAuthSuccess, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && !name.trim()) {
      setError("Please enter your name to register.");
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError("Please complete all credentials.");
      return;
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters for safety.");
      return;
    }

    setLoading(true);

    // Simulate high-end server verification and auth key generation
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      setTimeout(() => {
        onAuthSuccess({
          name: mode === "signup" ? name.trim() : email.split("@")[0],
          email: email.trim(),
        });
        setSuccess(false);
        onClose();
      }, 1200);
    }, 1500);
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    setShowConfigInstructions(false);

    try {
      const redirectUri = `${window.location.origin}/auth/callback`;
      const response = await fetch(`/api/auth/google/url?redirect_uri=${encodeURIComponent(redirectUri)}`);
      if (!response.ok) {
        throw new Error("Failed to contact Google authentication endpoints.");
      }

      const data = await response.json();
      if (!data.configured) {
        setLoading(false);
        setError("Google Client Credentials are not set in your environment variables yet.");
        setShowConfigInstructions(true);
        return;
      }

      // If keys are fully configured, initiate popup flow
      const width = 500;
      const height = 650;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      const authWindow = window.open(
        data.url,
        "google_oauth_popup",
        `width=${width},height=${height},top=${top},left=${left},status=no,resizable=yes`
      );

      if (!authWindow) {
        setLoading(false);
        setError("Popup was blocked by your browser. Please allow popups to sign in with Google.");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "An error occurred during Google authentication.");
    }
  };

  const copyCallbackUrl = () => {
    const callbackUrl = `${window.location.origin}/auth/callback`;
    navigator.clipboard.writeText(callbackUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleSimulateVerifiedGoogle = () => {
    setError("");
    setLoading(true);
    
    // Simulates completing a real Google Identity login with the user's authentic developer email address
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      setTimeout(() => {
        onAuthSuccess({
          name: "Ritsugandh Sugandh",
          email: "iamritsugandh@gmail.com",
        });
        setSuccess(false);
        onClose();
      }, 1200);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur Background Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#09090F]/80 backdrop-blur-md"
          ></motion.div>

          {/* Core Auth Glass Card Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-3xl bg-[#11111B]/90 border border-white/[0.08] shadow-3xl overflow-hidden p-8 z-10"
          >
            {/* Visual gradient accent blob behind modal */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/10 blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#3B82F6]/10 blur-2xl pointer-events-none"></div>

            {/* Header / Dismiss */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#3B82F6] flex items-center justify-center text-white shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-display text-sm font-bold text-[#A1A1AA] uppercase tracking-wider">PRIORA GATE</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[#A1A1AA] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Success Animation Overlay */}
            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10"
                >
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </motion.div>
                <h3 className="font-display text-xl font-bold text-white mb-1">Authorization Complete</h3>
                <p className="text-xs text-[#A1A1AA]">Instantiating secure productivity workspace...</p>
              </motion.div>
            ) : (
              <div>
                {/* Mode description text */}
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold text-white">
                    {mode === "signup" ? "Create secure account" : "Welcome back to Priora"}
                  </h2>
                  <p className="text-xs text-[#A1A1AA] mt-1">
                    {mode === "signup" 
                      ? "Register your nodes to enable intelligent scheduler synchronization." 
                      : "Access your cloud planner instance with email authentication."}
                  </p>
                </div>

                {/* Form fields */}
                <div className="space-y-4 mb-5">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-3 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer hover:border-white/15"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.5-1.14 2.78-2.4 3.63v3.02h3.87c2.26-2.08 3.66-5.14 3.66-8.5z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.02c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.13C3.26 21.31 7.21 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.27 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.6H1.29C.47 8.23 0 10.06 0 12s.47 3.77 1.29 5.4l3.98-3.13z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.21 0 3.26 2.69 1.29 6.6l3.98 3.13c.95-2.85 3.6-4.98 6.73-4.98z"
                      />
                    </svg>
                    <span>{mode === "signup" ? "Continue with Google" : "Sign in with Google"}</span>
                  </button>

                  {showConfigInstructions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-4 rounded-2xl bg-violet-500/5 border border-violet-500/10 text-xs space-y-3 mt-2 overflow-hidden"
                    >
                      <div className="flex items-start gap-2 text-violet-300 font-semibold text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-violet-400" />
                        <span>Google Client Credentials Required</span>
                      </div>
                      <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                        To enable direct Google Auth picker, create a Client ID in Google Cloud Console and paste these values.
                      </p>
                      
                      <div className="space-y-2.5">
                        <div className="bg-black/30 border border-white/[0.04] p-2.5 rounded-lg space-y-1.5">
                          <div className="text-[10px] text-white/40 uppercase font-mono tracking-wider font-semibold">1. Authorized Redirect URI</div>
                          <div className="flex items-center justify-between gap-2 bg-black/40 px-2 py-1.5 rounded border border-white/5 font-mono text-[10px] text-violet-300 overflow-x-auto">
                            <span className="whitespace-nowrap">{window.location.origin}/auth/callback</span>
                            <button
                              type="button"
                              onClick={copyCallbackUrl}
                              className="p-1 hover:bg-white/10 text-white/50 hover:text-white rounded transition-colors shrink-0 cursor-pointer"
                              title="Copy URL"
                            >
                              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        <div className="bg-black/30 border border-white/[0.04] p-2.5 rounded-lg text-[#A1A1AA] text-[11px] space-y-1">
                          <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider font-semibold">2. Setup Client Credentials</span>
                          <p>Add these variables inside the **Secrets / Environment Settings** panel:</p>
                          <ul className="list-disc pl-4 text-[10px] space-y-0.5 mt-1 text-white/80 font-mono">
                            <li>GOOGLE_CLIENT_ID</li>
                            <li>GOOGLE_CLIENT_SECRET</li>
                          </ul>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/[0.04]">
                        <button
                          type="button"
                          onClick={handleSimulateVerifiedGoogle}
                          className="w-full py-2.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-300 hover:text-white rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Bypass & Sign in as: iamritsugandh@gmail.com</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/[0.05]"></div>
                    <span className="text-[10px] font-mono font-semibold text-white/30 tracking-wider uppercase">or email credentials</span>
                    <div className="flex-1 h-px bg-white/[0.05]"></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                      {error}
                    </div>
                  )}

                  {mode === "signup" && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono tracking-wider font-bold text-[#A1A1AA] uppercase">Full Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-white/30" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Henderson"
                          className="w-full bg-black/30 border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider font-bold text-[#A1A1AA] uppercase">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-white/30" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@domain.com"
                        className="w-full bg-black/30 border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider font-bold text-[#A1A1AA] uppercase">Secure Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-white/30" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-black/30 border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#8B5CF6] hover:to-[#60A5FA] text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-purple-500/10 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{mode === "signup" ? "Creating Account..." : "Authenticating..."}</span>
                      </>
                    ) : (
                      <>
                        <span>{mode === "signup" ? "Generate Free Account" : "Access Workspace"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Switch switcher mode */}
                <div className="mt-6 text-center border-t border-white/[0.05] pt-4">
                  <p className="text-xs text-[#A1A1AA]">
                    {mode === "signup" ? "Already have an account?" : "New to Priora AI?"}{" "}
                    <button
                      onClick={() => {
                        setMode(mode === "signup" ? "signin" : "signup");
                        setError("");
                      }}
                      className="text-purple-400 font-semibold hover:underline"
                    >
                      {mode === "signup" ? "Sign In" : "Register Free"}
                    </button>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
