import React, { useState, useEffect, useRef, FormEvent } from "react";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  Sparkles, 
  MessageSquare, 
  TrendingUp, 
  Flame, 
  Settings, 
  User, 
  Bell, 
  HelpCircle, 
  LogOut, 
  Plus, 
  Trash2, 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  Loader2, 
  ShieldAlert, 
  Volume2, 
  Zap, 
  Search, 
  Filter, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  Sparkle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Task, ChatMessage, Habit, CalendarEvent } from "../types";

interface DashboardViewProps {
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
}

export default function DashboardView({ user, onLogout }: DashboardViewProps) {
  const userName = user?.name || "Alex";
  const userInitial = userName.substring(0, 2).toUpperCase() || "AL";

  // Sidebar navigation state
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Mock Tasks State (Fully Interactive)
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Database Schema Review",
      priority: "high",
      deadline: "Today, 2:00 PM",
      estimatedHours: 2,
      aiConfidence: 94,
      completed: false,
      category: "Database",
      risk: "high"
    },
    {
      id: "2",
      title: "Integrate Google Gemini API",
      priority: "high",
      deadline: "Today, 5:00 PM",
      estimatedHours: 3.5,
      aiConfidence: 96,
      completed: false,
      category: "AI Integration",
      risk: "medium"
    },
    {
      id: "3",
      title: "Google Calendar Sync Service",
      priority: "medium",
      deadline: "Tomorrow, 10:00 AM",
      estimatedHours: 4,
      aiConfidence: 88,
      completed: false,
      category: "Calendar Sync",
      risk: "medium"
    },
    {
      id: "4",
      title: "Calibrate Habit Loop UI",
      priority: "low",
      deadline: "In 3 days",
      estimatedHours: 1.5,
      aiConfidence: 98,
      completed: true,
      category: "Frontend",
      risk: "low"
    },
    {
      id: "5",
      title: "Configure Voice Command Synthesis",
      priority: "medium",
      deadline: "In 2 days",
      estimatedHours: 3,
      aiConfidence: 85,
      completed: false,
      category: "Voice Engine",
      risk: "low"
    }
  ]);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"high" | "medium" | "low">("medium");
  const [newTaskCategory, setNewTaskCategory] = useState("Development");
  const [newTaskHours, setNewTaskHours] = useState(2);

  // AI Daily Brief State
  const [aiBrief, setAiBrief] = useState({
    summary: "Alex, you have 4 pending priority focus blocks today. Your current deadline risk is Medium, with 'Database Schema Review' holding the highest critical latency.",
    recommendations: [
      "⚠️ Database Review is due in 3 hours. Complete this slot before starting other tasks.",
      "💡 Allocate a 90-minute Focus block at 11 AM for the Google Gemini integration.",
      "🌱 Daily habit progress stands at 60%. Completing 'Read tech articles' will trigger a 12-day streak."
    ],
    productivityScore: 84,
    completionConfidence: 92,
    riskRating: "medium" as "low" | "medium" | "high",
    loading: false
  });

  // Calendar Selection State (June 2026)
  const [selectedDay, setSelectedDay] = useState<number>(30); // Today June 30, 2026
  const calendarEvents: CalendarEvent[] = [
    { id: "e1", title: "Sprint Sync Meeting", time: "09:30 AM", duration: "30m", type: "meeting", date: 30 },
    { id: "e2", title: "Gemini Coding Focus Block", time: "11:00 AM", duration: "120m", type: "focus", date: 30 },
    { id: "e3", title: "Database Architecture", time: "02:00 PM", duration: "60m", type: "task", date: 30 },
    { id: "e4", title: "Design Feedback Review", time: "10:30 AM", duration: "45m", type: "meeting", date: 29 },
    { id: "e5", title: "Product Backlog Grooming", time: "03:00 PM", duration: "90m", type: "meeting", date: 1 }
  ];

  // Focus Timer States
  const [timerMode, setTimerMode] = useState<number>(1500); // 1500s = 25m
  const [timeLeft, setTimeLeft] = useState<number>(1500);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerStreak, setTimerStreak] = useState<number>(3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Habits State (Interactive Toggle)
  const [habits, setHabits] = useState<Habit[]>([
    { id: "h1", name: "Read Tech Articles", streak: 11, completedDays: [true, true, true, false, true, true, false], frequency: "Daily" },
    { id: "h2", name: "30-Min Gym Cardio", streak: 5, completedDays: [true, false, true, true, false, true, true], frequency: "Daily" },
    { id: "h3", name: "Log Deep Focus Block", streak: 8, completedDays: [true, true, true, true, true, false, true], frequency: "Daily" }
  ]);

  // AI Assistant Chat Terminal States
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Sync username in welcome text
  useEffect(() => {
    setChatMessages([
      { id: "1", role: "model", text: `Hello ${userName}. I am Priora, your Autonomous Productivity Companion. I have analyzed your calendar constraints and upcoming deadlines. Ask me to 'Plan My Day', 'Optimize Schedule', or 'Review Deadlines' to begin.`, timestamp: new Date() }
    ]);
    setAiBrief(prev => ({
      ...prev,
      summary: `${userName}, you have 4 pending priority focus blocks today. Your current deadline risk is Medium, with 'Database Schema Review' holding the highest critical latency.`
    }));
  }, [userName]);

  // Sync Focus Timer tick
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            setTimerStreak((s) => s + 1);
            return timerMode;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning, timerMode]);

  // Auto-scroll Chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  // Format focus timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Timer mode switcher helper
  const changeTimerMode = (duration: number) => {
    setTimerRunning(false);
    setTimerMode(duration);
    setTimeLeft(duration);
  };

  // Interactive Task Handlers
  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const confidence = Math.floor(Math.random() * 15) + 82; // 82 to 97% confidence
    const riskVal = newTaskPriority === "high" ? "high" : newTaskPriority === "medium" ? "medium" : "low";

    const createdTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      priority: newTaskPriority,
      deadline: newTaskPriority === "high" ? "Today, 9:00 PM" : "Tomorrow",
      estimatedHours: newTaskHours,
      aiConfidence: confidence,
      completed: false,
      category: newTaskCategory,
      risk: riskVal
    };

    setTasks([createdTask, ...tasks]);
    setNewTaskTitle("");
    setNewTaskHours(2);
  };

  // Interactive Habit Check
  const handleToggleHabitDay = (habitId: string, index: number) => {
    setHabits(habits.map(h => {
      if (h.id === habitId) {
        const updated = [...h.completedDays];
        updated[index] = !updated[index];
        const updatedStreak = updated[index] ? h.streak + 1 : Math.max(0, h.streak - 1);
        return { ...h, completedDays: updated, streak: updatedStreak };
      }
      return h;
    }));
  };

  // Call server-side /api/plan to generate today's briefing
  const handleGeneratePlan = async () => {
    setAiBrief(prev => ({ ...prev, loading: true }));
    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks, habits })
      });
      if (!response.ok) {
        throw new Error("Plan API responded with status " + response.status);
      }
      const data = await response.json();
      setAiBrief({
        summary: data.summary || "Completed analyzing your priority flow schedule.",
        recommendations: data.recommendations || [
          "⚡ Complete Database Schema Review first",
          "🎯 Focus hours block at 10 AM",
          "🌱 12-day streak available on tech reading habit"
        ],
        productivityScore: data.productivityScore || 85,
        completionConfidence: data.completionConfidence || 90,
        riskRating: data.riskRating || "medium",
        loading: false
      });
    } catch (error) {
      console.error("Failed to call plan API:", error);
      setAiBrief(prev => ({ ...prev, loading: false }));
    }
  };

  // Call server-side /api/chat to interact with Gemini AI
  const handleSendChatMessage = async (textToSend?: string) => {
    const userMsgText = textToSend || chatInput;
    if (!userMsgText.trim() || chatLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: userMsgText.trim(),
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage],
          tasks: tasks
        })
      });
      if (!response.ok) {
        throw new Error("Chat API responded with status " + response.status);
      }
      const data = await response.json();
      
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: data.text || "I have optimized your workspace logic successfully.",
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error("Chat API Error:", error);
      // Fallback
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: `My apologies, ${userName}. I had trouble connecting to the Google Gemini nodes. Based on your client-side tasks, I recommend locking in on 'Database Schema Review' immediately.`,
        timestamp: new Date()
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const triggerChatSuggestion = (prompt: string) => {
    setActiveTab("ai");
    setTimeout(() => {
      handleSendChatMessage(prompt);
    }, 100);
  };

  // Helper for background priority colors
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "medium": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default: return "bg-zinc-500/10 text-[#A1A1AA] border-zinc-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#09090F] flex pt-20">
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-20 z-0"></div>

      {/* 1. SIDEBAR PANEL */}
      <aside className="w-64 bg-[#11111B]/80 backdrop-blur-md border-r border-white/[0.08] hidden md:flex flex-col justify-between py-6 z-10 sticky top-20 h-[calc(100vh-80px)] shrink-0">
        <div className="flex flex-col gap-6 px-4">
          {/* Group 1: Workspace Core */}
          <div>
            <div className="px-3 mb-2.5 text-[10px] font-mono tracking-widest text-[#A1A1AA] uppercase font-semibold">Workspace</div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === "dashboard" ? "bg-[#7C3AED]/15 text-white border-l-2 border-[#7C3AED]" : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab("tasks")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === "tasks" ? "bg-[#7C3AED]/15 text-white border-l-2 border-[#7C3AED]" : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-4 h-4" />
                  <span>Tasks</span>
                </div>
                <span className="text-xs bg-[#181825] px-2 py-0.5 rounded text-[#A1A1AA] font-mono">{tasks.filter(t => !t.completed).length}</span>
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === "calendar" ? "bg-[#7C3AED]/15 text-white border-l-2 border-[#7C3AED]" : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Calendar</span>
              </button>
            </div>
          </div>

          {/* Group 2: AI Autonomous Layer */}
          <div>
            <div className="px-3 mb-2.5 text-[10px] font-mono tracking-widest text-[#A1A1AA] uppercase font-semibold">AI Engine</div>
            <div className="flex flex-col gap-1">
              <button
                onClick={handleGeneratePlan}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-purple-300 hover:text-white hover:bg-[#7C3AED]/10 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#7C3AED] animate-pulse" />
                <span>AI Planner</span>
              </button>
              <button
                onClick={() => setActiveTab("ai")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === "ai" ? "bg-[#7C3AED]/15 text-white border-l-2 border-[#7C3AED]" : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>AI Chat</span>
              </button>
            </div>
          </div>

          {/* Group 3: Habits & Metrics */}
          <div>
            <div className="px-3 mb-2.5 text-[10px] font-mono tracking-widest text-[#A1A1AA] uppercase font-semibold">Insights</div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setActiveTab("analytics")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === "analytics" ? "bg-[#7C3AED]/15 text-white border-l-2 border-[#7C3AED]" : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Analytics</span>
              </button>
              <button
                onClick={() => setActiveTab("habits")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === "habits" ? "bg-[#7C3AED]/15 text-white border-l-2 border-[#7C3AED]" : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>Habits</span>
              </button>
            </div>
          </div>
        </div>

        {/* User profile footer inside sidebar */}
        <div className="px-4 border-t border-white/[0.05] pt-4 mt-auto">
          <div className="flex items-center justify-between gap-2 px-3 py-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#3B82F6] flex items-center justify-center font-bold text-white text-xs shadow-md">
                {userInitial}
              </div>
              <div>
                <div className="text-xs font-semibold text-white max-w-[100px] truncate">{userName}</div>
                <div className="text-[10px] text-[#A1A1AA]">Enterprise Pro</div>
              </div>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-1.5 rounded-lg bg-white/[0.02] hover:bg-red-500/10 text-[#A1A1AA] hover:text-red-400 transition-colors border border-white/5 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* 2. MAIN ACTIVE VIEW CONTENT CONTAINER */}
      <main className="flex-1 px-4 sm:px-8 py-8 z-10 max-w-6xl mx-auto overflow-hidden">
        {/* Workspace Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/[0.05] mb-8 gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              Priora Workspace <Sparkle className="w-5 h-5 text-[#7C3AED]" />
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-1">
              Synchronized Local Time: <span className="font-mono text-white">2026-06-30 17:17</span> | Autonomous Engine Active
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Quick action: Mobile navigation tab togglers */}
            <div className="flex md:hidden bg-white/[0.03] border border-white/5 rounded-xl p-1 gap-1 text-xs w-full overflow-x-auto whitespace-nowrap scrollbar-none">
              <button onClick={() => setActiveTab("dashboard")} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === "dashboard" ? "bg-[#7C3AED] text-white" : "text-[#A1A1AA]"}`}>Dashboard</button>
              <button onClick={() => setActiveTab("tasks")} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === "tasks" ? "bg-[#7C3AED] text-white" : "text-[#A1A1AA]"}`}>Tasks</button>
              <button onClick={() => setActiveTab("ai")} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === "ai" ? "bg-[#7C3AED] text-white" : "text-[#A1A1AA]"}`}>AI Chat</button>
              <button onClick={() => setActiveTab("habits")} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === "habits" ? "bg-[#7C3AED] text-white" : "text-[#A1A1AA]"}`}>Habits</button>
            </div>

            <button
              onClick={handleGeneratePlan}
              className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:scale-105 transition-all text-white rounded-xl text-xs font-semibold shadow-md shadow-purple-500/10 flex items-center gap-1.5 shrink-0 hidden sm:flex"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Force Re-Analyze</span>
            </button>
          </div>
        </div>

        {/* A. DASHBOARD VIEW (Grid of Widgets) */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* AI DAILY BRIEF (Largest Visual Header) */}
            <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#7C3AED]/20 to-[#3B82F6]/10 border border-[#7C3AED]/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#7C3AED]/5 blur-3xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED]">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg sm:text-xl font-bold text-white">AI Daily Brief</h2>
                    <p className="text-[10px] font-mono text-[#A1A1AA]">PLANNING INSTANCE: GEMINI-3.5-FLASH</p>
                  </div>
                </div>

                <button
                  onClick={handleGeneratePlan}
                  disabled={aiBrief.loading}
                  className="px-4 py-2 bg-purple-500/15 border border-purple-500/35 text-purple-300 rounded-xl text-xs font-semibold hover:bg-purple-500/25 transition-all duration-200 flex items-center gap-1.5"
                >
                  {aiBrief.loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Analyzing Workspace...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>Re-Generate Daily Plan</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed mb-6">
                {aiBrief.summary}
              </p>

              {/* Recommendations list */}
              <div className="space-y-3 mb-6">
                <h3 className="text-xs uppercase font-bold text-white/50 tracking-widest mb-2 font-mono">Suggested Actions</h3>
                {aiBrief.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-black/20 border border-white/[0.03] text-xs text-[#A1A1AA] leading-normal">
                    <span className="text-[#7C3AED] mt-0.5">•</span>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>

              {/* Stats Block inside Daily Brief */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.05]">
                <div className="bg-black/25 rounded-xl p-3 border border-white/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">Productivity Score</span>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-1">{aiBrief.productivityScore}%</div>
                </div>
                <div className="bg-black/25 rounded-xl p-3 border border-white/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">AI Confidence</span>
                  <div className="text-xl font-bold text-[#3B82F6] font-mono mt-1">{aiBrief.completionConfidence}%</div>
                </div>
                <div className="bg-black/25 rounded-xl p-3 border border-white/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">Deadline Risk</span>
                  <div className="text-xl font-bold text-amber-400 font-mono mt-1 uppercase text-xs sm:text-sm pt-1">{aiBrief.riskRating}</div>
                </div>
                <div className="bg-black/25 rounded-xl p-3 border border-white/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#A1A1AA]">Estimated Work</span>
                  <div className="text-xl font-bold text-white font-mono mt-1">6.5h</div>
                </div>
              </div>
            </div>

            {/* WIDGETS GRID: Tasks Focus & Focus Timer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Today's Tasks Focus List (lg:col-span-7) */}
              <div className="lg:col-span-7 rounded-2xl bg-[#11111B]/80 border border-white/[0.08] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">Active Priorities</h3>
                      <p className="text-xs text-[#A1A1AA] mt-0.5">Quickly complete, filter, or re-structure below</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("tasks")}
                      className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1"
                    >
                      <span>Task Hub</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tasks.slice(0, 4).map((task) => (
                      <div
                        key={task.id}
                        className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 ${
                          task.completed 
                            ? "bg-black/20 border-white/[0.03] opacity-50" 
                            : "bg-[#181825] border-white/[0.05] hover:border-[#7C3AED]/20"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <button
                            onClick={() => handleToggleTask(task.id)}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              task.completed 
                                ? "bg-emerald-500 border-emerald-500 text-white" 
                                : "border-white/20 hover:border-[#7C3AED]"
                            }`}
                          >
                            {task.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                          </button>
                          <div>
                            <span className={`text-xs font-medium text-white ${task.completed ? "line-through text-[#A1A1AA]" : ""}`}>
                              {task.title}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[9px] text-[#A1A1AA] font-mono">{task.category}</span>
                              <span className="text-[9px] text-white/30">•</span>
                              <span className="text-[9px] text-[#A1A1AA] font-mono">{task.deadline}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-semibold">{task.aiConfidence}% match</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Manual Task Add form inside user dashboard widget */}
                  <form onSubmit={handleAddTask} className="mt-4 pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      required
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Add task manually..."
                      className="flex-1 bg-black/30 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                    />
                    <div className="flex gap-2">
                      <select
                        value={newTaskPriority}
                        onChange={(e: any) => setNewTaskPriority(e.target.value)}
                        className="bg-[#181825] border border-white/[0.08] rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#7C3AED]/50"
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                      <button
                        type="submit"
                        className="flex-1 sm:flex-none px-4 py-2 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </form>
                </div>

                <div className="pt-6 border-t border-white/[0.05] mt-6 flex items-center justify-between">
                  <span className="text-xs text-[#A1A1AA]">
                    {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed today
                  </span>
                  <div className="h-1.5 w-32 bg-white/[0.04] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6]" 
                      style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Focus Timer Pomodoro Card (lg:col-span-5) */}
              <div className="lg:col-span-5 rounded-2xl bg-[#11111B]/80 border border-white/[0.08] p-6 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6]"></div>

                <div className="flex justify-between w-full mb-6">
                  <div>
                    <h3 className="font-display text-sm font-bold text-white tracking-tight">Pomodoro Timer</h3>
                    <p className="text-[10px] text-[#A1A1AA]">BLOCK TIME RESERVATION</p>
                  </div>
                  <span className="text-[11px] bg-white/[0.04] text-[#A1A1AA] border border-white/10 px-2.5 py-1 rounded-lg font-mono">
                    🔥 STREAK: {timerStreak}
                  </span>
                </div>

                {/* Circular timer representation */}
                <div className="relative w-44 h-44 flex items-center justify-center mb-6">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="88" cy="88" r="76" fill="transparent" stroke="rgba(255,255,255,0.02)" strokeWidth="8" />
                    <circle 
                      cx="88" 
                      cy="88" 
                      r="76" 
                      fill="transparent" 
                      stroke="url(#timerGradDashboard)" 
                      strokeWidth="8" 
                      strokeDasharray="477.52" 
                      strokeDashoffset={(477.52 - (timeLeft / timerMode) * 477.52).toFixed(1)} 
                      strokeLinecap="round" 
                    />
                    <defs>
                      <linearGradient id="timerGradDashboard" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute text-center flex flex-col">
                    <span className="text-3xl font-extrabold text-white font-mono tracking-tighter">
                      {formatTime(timeLeft)}
                    </span>
                    <span className="text-[10px] text-[#A1A1AA] font-mono uppercase tracking-widest mt-0.5">
                      {timerRunning ? "Deep Focus" : "Paused"}
                    </span>
                  </div>
                </div>

                {/* Interval Swappers */}
                <div className="flex gap-2 mb-6">
                  <button 
                    onClick={() => changeTimerMode(1500)} 
                    className={`text-[10px] px-3 py-1.5 rounded-lg border font-semibold ${timerMode === 1500 ? "bg-[#7C3AED] border-[#7C3AED] text-white" : "bg-black/20 border-white/5 text-[#A1A1AA]"}`}
                  >
                    25m Focus
                  </button>
                  <button 
                    onClick={() => changeTimerMode(3000)} 
                    className={`text-[10px] px-3 py-1.5 rounded-lg border font-semibold ${timerMode === 3000 ? "bg-[#7C3AED] border-[#7C3AED] text-white" : "bg-black/20 border-white/5 text-[#A1A1AA]"}`}
                  >
                    50m Deep
                  </button>
                  <button 
                    onClick={() => changeTimerMode(900)} 
                    className={`text-[10px] px-3 py-1.5 rounded-lg border font-semibold ${timerMode === 900 ? "bg-[#7C3AED] border-[#7C3AED] text-white" : "bg-black/20 border-white/5 text-[#A1A1AA]"}`}
                  >
                    15m Break
                  </button>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 w-full">
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className="flex-1 py-3 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-opacity"
                  >
                    {timerRunning ? <Pause className="w-4.5 h-4.5" /> : <Play className="w-4.5 h-4.5" />}
                    <span>{timerRunning ? "PAUSE SESSION" : "START SESSION"}</span>
                  </button>
                  <button
                    onClick={() => changeTimerMode(timerMode)}
                    className="p-3 bg-white/[0.04] hover:bg-white/10 text-[#A1A1AA] hover:text-white rounded-xl border border-white/10 transition-colors"
                  >
                    <RotateCcw className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* LOWER GRID: Interactive Calendar & AI Chat Companion */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendar Module */}
              <div className="rounded-2xl bg-[#11111B]/80 border border-white/[0.08] p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Daily Itinerary</h3>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">June 2026 | Selected: June {selectedDay}</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">3 Active Blocks</span>
                  </div>
                </div>

                {/* Calendar Days Row Selector */}
                <div className="grid grid-cols-7 gap-2 text-center mb-6">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                    <span key={d} className="text-[10px] font-mono text-[#A1A1AA] font-bold uppercase">{d}</span>
                  ))}
                  {/* Render last week of June 2026 (24 to 30) */}
                  {[24, 25, 26, 27, 28, 29, 30].map(day => {
                    const isSelected = selectedDay === day;
                    const isToday = day === 30;
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                          isSelected 
                            ? "bg-gradient-to-tr from-[#7C3AED] to-[#3B82F6] text-white font-bold scale-105" 
                            : isToday 
                              ? "bg-[#7C3AED]/20 text-purple-300 border border-[#7C3AED]/40" 
                              : "bg-black/20 text-[#A1A1AA] border border-white/5 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div>{day}</div>
                        <div className="flex justify-center gap-0.5 mt-1">
                          <span className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-[#7C3AED]"}`}></span>
                          {day === 30 && <span className="w-1 h-1 rounded-full bg-[#3B82F6]"></span>}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Events list for selected day */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono tracking-wider font-bold text-[#A1A1AA] uppercase">Events & Schedule</h4>
                  {calendarEvents.filter(e => e.date === selectedDay).length === 0 ? (
                    <div className="text-center py-6 text-xs text-[#A1A1AA] border border-dashed border-white/10 rounded-xl">
                      No calendar activities logged on this date.
                    </div>
                  ) : (
                    calendarEvents.filter(e => e.date === selectedDay).map(event => (
                      <div key={event.id} className="flex items-center justify-between p-3 rounded-xl bg-black/25 border border-white/[0.03]">
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            event.type === "meeting" ? "bg-[#3B82F6]" : event.type === "focus" ? "bg-[#7C3AED]" : "bg-emerald-500"
                          }`}></div>
                          <div>
                            <div className="text-xs font-semibold text-white">{event.title}</div>
                            <div className="text-[10px] text-[#A1A1AA] mt-0.5 font-mono">{event.time} ({event.duration})</div>
                          </div>
                        </div>
                        <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-[#A1A1AA] bg-[#181825] px-2 py-0.5 rounded border border-white/5">
                          {event.type}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* AI Companion ChatGPT-Style Chat Terminal */}
              <div className="rounded-2xl bg-[#11111B]/80 border border-white/[0.08] p-6 flex flex-col h-[400px]">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-4 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#7C3AED] animate-pulse"></div>
                    <span className="text-sm font-semibold text-white">Ask Priora AI</span>
                  </div>
                  <span className="text-[10px] font-mono bg-white/[0.04] text-[#A1A1AA] border border-white/10 px-2 py-0.5 rounded-lg">
                    GEMINI-3.5-FLASH
                  </span>
                </div>

                {/* Messages Panel */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        msg.role === "user" 
                          ? "bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white shadow-md shadow-purple-500/10" 
                          : "bg-[#181825] border border-white/[0.05] text-[#A1A1AA]"
                      }`}>
                        <div className="font-semibold mb-1 text-[10px] text-white/55 font-mono">
                          {msg.role === "user" ? userName : "Priora AI"}
                        </div>
                        <div className="whitespace-pre-line">{msg.text}</div>
                      </div>
                    </div>
                  ))}

                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-[#181825] border border-white/[0.05] max-w-[85%] rounded-2xl px-4 py-3 text-xs text-[#A1A1AA] flex items-center gap-2 font-mono">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#7C3AED]" />
                        <span>Priora is processing your request...</span>
                      </div>
                    </div>
                  )}

                  <div ref={chatBottomRef}></div>
                </div>

                {/* Quick Suggestion Pills */}
                <div className="flex gap-1.5 overflow-x-auto py-3.5 shrink-0 whitespace-nowrap scrollbar-none">
                  <button 
                    onClick={() => handleSendChatMessage("Plan My Day")}
                    className="text-[10px] px-2.5 py-1.5 rounded-lg bg-black/30 border border-white/5 text-[#A1A1AA] hover:text-white hover:border-[#7C3AED] transition-all font-mono"
                  >
                    Plan My Day
                  </button>
                  <button 
                    onClick={() => handleSendChatMessage("Review Deadlines")}
                    className="text-[10px] px-2.5 py-1.5 rounded-lg bg-black/30 border border-white/5 text-[#A1A1AA] hover:text-white hover:border-[#7C3AED] transition-all font-mono"
                  >
                    Review Deadlines
                  </button>
                  <button 
                    onClick={() => handleSendChatMessage("Optimize Schedule")}
                    className="text-[10px] px-2.5 py-1.5 rounded-lg bg-black/30 border border-white/5 text-[#A1A1AA] hover:text-white hover:border-[#7C3AED] transition-all font-mono"
                  >
                    Optimize Schedule
                  </button>
                </div>

                {/* Input Panel */}
                <div className="flex gap-2 shrink-0">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                    placeholder="Ask Gemini to configure schedule blocks..."
                    className="flex-1 bg-black/30 border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                  />
                  <button
                    onClick={() => handleSendChatMessage()}
                    disabled={chatLoading}
                    className="px-4 py-3 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center shrink-0"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* B. TASKS MODULE (Full Interactive Management) */}
        {activeTab === "tasks" && (
          <div className="space-y-8">
            {/* Create Task Form */}
            <form onSubmit={handleAddTask} className="rounded-2xl p-6 bg-[#11111B]/80 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
                <h2 className="font-display text-lg font-bold text-white">Create New Focus Task</h2>
                <span className="text-[10px] font-mono bg-purple-500/10 text-purple-300 px-2.5 py-0.5 rounded border border-purple-500/25">AI-Powered Sorting</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Title */}
                <div className="md:col-span-6 flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono tracking-wider font-bold text-[#A1A1AA] uppercase">Task Title</label>
                  <input
                    type="text"
                    required
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="e.g. Integrate auth token validation middleware"
                    className="bg-black/30 border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
                  />
                </div>

                {/* Priority */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono tracking-wider font-bold text-[#A1A1AA] uppercase">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e: any) => setNewTaskPriority(e.target.value)}
                    className="bg-[#181825] border border-white/[0.08] rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-[#7C3AED]/50"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* Category */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono tracking-wider font-bold text-[#A1A1AA] uppercase">Category</label>
                  <input
                    type="text"
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="bg-black/30 border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Hours */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono tracking-wider font-bold text-[#A1A1AA] uppercase">Est. Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={newTaskHours}
                    onChange={(e) => setNewTaskHours(parseFloat(e.target.value) || 1)}
                    className="bg-black/30 border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:scale-105 transition-all text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insert Task Into Engine</span>
                </button>
              </div>
            </form>

            {/* Task list container */}
            <div className="rounded-2xl bg-[#11111B]/80 border border-white/[0.08] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
                <h3 className="font-display text-sm font-bold text-white tracking-tight">Active Task Repositories</h3>
                <span className="text-xs text-[#A1A1AA] font-mono">{tasks.length} total nodes</span>
              </div>

              {tasks.length === 0 ? (
                <div className="text-center py-12 text-xs text-[#A1A1AA] border border-dashed border-white/10 rounded-xl">
                  You have cleared your queue. Click 'Insert Task' to schedule focus blocks.
                </div>
              ) : (
                <div className="divide-y divide-white/[0.04] space-y-1">
                  {tasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleToggleTask(task.id)}
                          className={`w-5.5 h-5.5 rounded-lg border flex items-center justify-center transition-all ${
                            task.completed 
                              ? "bg-emerald-500 border-emerald-500 text-white" 
                              : "border-white/20 hover:border-[#7C3AED]"
                          }`}
                        >
                          {task.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                        </button>

                        <div>
                          <span className={`text-sm font-semibold ${task.completed ? "line-through text-[#A1A1AA]" : "text-white"}`}>
                            {task.title}
                          </span>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[10px] bg-white/[0.04] text-[#A1A1AA] border border-white/10 px-2 py-0.5 rounded font-mono uppercase">{task.category}</span>
                            <span className="text-[10px] text-[#A1A1AA] font-mono flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {task.estimatedHours}h Est
                            </span>
                            <span className="text-[10px] text-[#A1A1AA] font-mono">{task.deadline}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border uppercase ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>

                        <div className="text-right hidden sm:block">
                          <div className="text-xs font-bold text-emerald-400 font-mono">{task.aiConfidence}%</div>
                          <div className="text-[9px] text-[#A1A1AA] uppercase font-mono tracking-wider">AI Score</div>
                        </div>

                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-2 bg-white/[0.02] hover:bg-red-500/10 text-[#A1A1AA] hover:text-red-400 rounded-lg border border-white/5 hover:border-red-500/20 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* C. CALENDAR VIEW */}
        {activeTab === "calendar" && (
          <div className="space-y-8">
            <div className="rounded-2xl bg-[#11111B]/80 border border-white/[0.08] p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.05] pb-5 mb-6 gap-3">
                <div>
                  <h2 className="font-display text-lg font-bold text-white">Cloud Calendar Synchronization</h2>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">Dual-channel overlay engine | Focus integration</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-lg font-mono">
                    Google Calendar Synced
                  </span>
                </div>
              </div>

              {/* Monthly calendar matrix representation */}
              <div className="grid grid-cols-7 gap-2 border border-white/5 rounded-2xl p-4 bg-black/25">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                  <div key={d} className="py-2 text-center text-xs font-mono font-bold text-[#A1A1AA] border-b border-white/5">{d}</div>
                ))}
                {/* Pad first days of week */}
                <div className="py-6 border-b border-r border-white/5 opacity-20"></div>
                {/* Render typical monthly view 1 to 30 */}
                {Array.from({ length: 30 }).map((_, idx) => {
                  const day = idx + 1;
                  const isToday = day === 30;
                  const isSelected = selectedDay === day;
                  const eventsCount = calendarEvents.filter(e => e.date === day).length;

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDay(day)}
                      className={`relative py-6 border-b border-r border-white/5 transition-all flex flex-col justify-between h-24 text-left p-3 ${
                        isSelected 
                          ? "bg-[#7C3AED]/20 border border-[#7C3AED] shadow-inner" 
                          : isToday 
                            ? "bg-[#7C3AED]/10 text-purple-300" 
                            : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className={`text-xs font-bold font-mono ${isSelected ? "text-purple-300" : "text-white"}`}>{day}</span>
                      {eventsCount > 0 && (
                        <div className="flex flex-col gap-1 w-full mt-2">
                          {calendarEvents.filter(e => e.date === day).map(e => (
                            <div key={e.id} className="text-[8px] bg-[#181825] border border-white/5 px-1 py-0.5 rounded text-white font-mono truncate">
                              {e.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* D. AI CHAT MODULE */}
        {activeTab === "ai" && (
          <div className="rounded-2xl bg-[#11111B]/80 border border-white/[0.08] p-6 flex flex-col h-[600px] z-10 relative">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-4 shrink-0">
              <div>
                <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  Priora Autonomous Chat <Sparkles className="w-5 h-5 text-[#7C3AED] animate-pulse" />
                </h2>
                <p className="text-xs text-[#A1A1AA] mt-0.5">Consult Gemini on deadline mitigations, custom agenda creations, and performance feedback</p>
              </div>
              <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-lg font-mono">
                GEMINI-3.5-FLASH
              </span>
            </div>

            {/* Expanded Messages Panel */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white shadow-lg" 
                      : "bg-[#181825] border border-white/[0.05] text-[#A1A1AA]"
                  }`}>
                    <div className="font-semibold mb-1 text-[10px] text-white/55 font-mono">
                      {msg.role === "user" ? userName : "Priora AI Companion"}
                    </div>
                    <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#181825] border border-white/[0.05] max-w-[75%] rounded-2xl px-5 py-4 text-sm text-[#A1A1AA] flex items-center gap-3 font-mono">
                    <Loader2 className="w-4 h-4 animate-spin text-[#7C3AED]" />
                    <span>Gemini is modeling a custom schedule block...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef}></div>
            </div>

            {/* Quick Prompt Suggesters */}
            <div className="flex gap-2 overflow-x-auto py-4 shrink-0 whitespace-nowrap scrollbar-none">
              <button 
                onClick={() => handleSendChatMessage("Optimize my agenda schedule due to critical bottlenecks.")}
                className="text-xs px-3.5 py-2 rounded-xl bg-black/40 border border-white/5 text-[#A1A1AA] hover:text-white hover:border-[#7C3AED] transition-all font-mono"
              >
                Plan My Day
              </button>
              <button 
                onClick={() => handleSendChatMessage("What are my highest risk deadlines and how can I resolve them?")}
                className="text-xs px-3.5 py-2 rounded-xl bg-black/40 border border-white/5 text-[#A1A1AA] hover:text-white hover:border-[#7C3AED] transition-all font-mono"
              >
                Review Deadlines
              </button>
              <button 
                onClick={() => handleSendChatMessage("Summarize this week's productivity metrics and recommend improvements.")}
                className="text-xs px-3.5 py-2 rounded-xl bg-black/40 border border-white/5 text-[#A1A1AA] hover:text-white hover:border-[#7C3AED] transition-all font-mono"
              >
                Weekly Summary
              </button>
            </div>

            {/* Input Box */}
            <div className="flex gap-3 shrink-0">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                placeholder="Ask Priora to reorganize remaining focus blocks..."
                className="flex-1 bg-black/40 border border-white/[0.08] rounded-2xl px-5 py-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]/50 transition-colors"
              />
              <button
                onClick={() => handleSendChatMessage()}
                disabled={chatLoading}
                className="px-6 py-4 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white font-bold rounded-2xl text-xs transition-all flex items-center justify-center shadow-lg"
              >
                Generate Response
              </button>
            </div>
          </div>
        )}

        {/* E. HABITS */}
        {activeTab === "habits" && (
          <div className="space-y-8">
            <div className="rounded-2xl bg-[#11111B]/80 border border-white/[0.08] p-6">
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-6">
                <div>
                  <h2 className="font-display text-lg font-bold text-white">Daily Habits Tracker</h2>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">Toggle checkboxes below to build deep mental stamina</p>
                </div>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded font-semibold">Active Streak Engine</span>
              </div>

              <div className="space-y-6">
                {habits.map(habit => (
                  <div key={habit.id} className="p-4 rounded-2xl bg-black/20 border border-white/[0.03]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-white">{habit.name}</h3>
                        <span className="text-[10px] text-[#A1A1AA] font-mono">Frequency: {habit.frequency}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#A1A1AA]">Current Streak:</span>
                        <span className="text-sm font-bold text-amber-400 font-mono">🔥 {habit.streak} Days</span>
                      </div>
                    </div>

                    {/* Progress Checklist Rows last 7 days */}
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Today"].map((day, dIdx) => {
                        const isCompleted = habit.completedDays[dIdx];
                        return (
                          <div key={dIdx} className="flex flex-col items-center gap-1.5">
                            <span className="text-[10px] font-mono text-[#A1A1AA]">{day}</span>
                            <button
                              onClick={() => handleToggleHabitDay(habit.id, dIdx)}
                              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                                isCompleted 
                                  ? "bg-gradient-to-tr from-[#7C3AED] to-[#3B82F6] border-purple-500 text-white shadow-lg" 
                                  : "bg-black/30 border-white/5 hover:border-[#7C3AED]/30 text-[#A1A1AA]"
                              }`}
                            >
                              {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* F. ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="rounded-2xl bg-[#11111B]/80 border border-white/[0.08] p-6">
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-6">
                <div>
                  <h2 className="font-display text-lg font-bold text-white">Focus Performance Metrics</h2>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">Algorithmic efficiency trend charts | Weekly compile</p>
                </div>
              </div>

              {/* Gorgeous CSS/SVG Dashboard Chart */}
              <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#A1A1AA]">Productivity Trend Index (Last 7 Days)</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">▲ 14.5% vs Last Week</span>
                </div>

                <div className="relative w-full h-48 mt-6">
                  {/* Grid Lines */}
                  <div className="absolute inset-x-0 top-0 h-px bg-white/5"></div>
                  <div className="absolute inset-x-0 top-1/3 h-px bg-white/5"></div>
                  <div className="absolute inset-x-0 top-2/3 h-px bg-white/5"></div>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-white/5"></div>

                  {/* Pure SVG Beautiful glowing area chart */}
                  <svg className="w-full h-full" viewBox="0 0 600 180" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Glowing path */}
                    <path 
                      d="M 10,130 C 90,110 130,50 200,60 C 270,70 310,150 400,100 C 490,50 530,20 590,30 L 590,180 L 10,180 Z" 
                      fill="url(#chartGradient)" 
                    />
                    <path 
                      d="M 10,130 C 90,110 130,50 200,60 C 270,70 310,150 400,100 C 490,50 530,20 590,30" 
                      fill="transparent" 
                      stroke="#7C3AED" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                    />
                  </svg>

                  {/* Tooltips/Data labels overlay */}
                  <div className="absolute left-[33%] top-[30px] bg-[#181825] px-2 py-1 rounded border border-[#7C3AED]/40 text-[9px] text-white font-mono shadow-md">
                    Tue: 88% Score
                  </div>
                  <div className="absolute left-[88%] top-[10px] bg-[#181825] px-2 py-1 rounded border border-[#7C3AED]/40 text-[9px] text-white font-mono shadow-md">
                    Today: 94% Score
                  </div>
                </div>

                <div className="flex justify-between text-[10px] font-mono text-[#A1A1AA] mt-3 px-2">
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Today</span>
                </div>
              </div>

              {/* Grid block of statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-black/25 rounded-xl p-4 border border-white/5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#A1A1AA]">Total Focus Hours</span>
                  <div className="text-2xl font-bold text-white font-mono mt-1">28.5 hrs</div>
                  <span className="text-[9px] text-emerald-400 font-semibold font-mono">▲ 4.2h since Monday</span>
                </div>
                <div className="bg-black/25 rounded-xl p-4 border border-white/5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#A1A1AA]">Completed Tasks</span>
                  <div className="text-2xl font-bold text-white font-mono mt-1">19 blocks</div>
                  <span className="text-[9px] text-emerald-400 font-semibold font-mono">▲ 100% completion sync</span>
                </div>
                <div className="bg-black/25 rounded-xl p-4 border border-white/5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#A1A1AA]">AI Scheduler accuracy</span>
                  <div className="text-2xl font-bold text-white font-mono mt-1">96.8%</div>
                  <span className="text-[9px] text-[#A1A1AA] font-mono">Calibrated across 45 nodes</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
