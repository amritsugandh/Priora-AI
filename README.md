# 🌌 Priora AI — Autonomous Productivity Companion

> Your unified, intelligent, and highly-immersive productivity workspace powered by Google Gemini AI.

| Service | Live Link |
| :--- | :--- |
| **SaaS Deployed Application (Live Preview)** | [https://ais-pre-b4cziruebxo5t3sdfdewqg-253907788341.asia-east1.run.app](https://ais-pre-b4cziruebxo5t3sdfdewqg-253907788341.asia-east1.run.app) |
| **Development Sandbox Preview** | [https://ais-dev-b4cziruebxo5t3sdfdewqg-253907788341.asia-east1.run.app](https://ais-dev-b4cziruebxo5t3sdfdewqg-253907788341.asia-east1.run.app) |

---

## 📋 Table of Contents
1. [🎯 Problem Statement Selected](#-problem-statement-selected)
2. [✨ Solution Overview](#-solution-overview)
3. [🚀 Key Features](#-key-features)
4. [🛠️ Technologies Used](#%EF%B8%8F-technologies-used)
5. [🌐 Google Technologies Utilized](#-google-technologies-utilized)
6. [🔧 Local Setup & Environment Variables](#-local-setup--environment-variables)
7. [⚙️ Deployment Architecture](#%EF%B8%8F-deployment-architecture)

---

## 🎯 Problem Statement Selected

In today's fast-paced digital workspace, knowledge workers are plagued by **cognitive fragmentation** and **reactive planning**. 
* **Tool Overload**: Users are forced to juggle disparate applications to manage their day—switching between static todo-list apps, calendars, habit trackers, AI chat tools, and focus timers.
* **Passive Checklists**: Standard productivity tools are purely passive databases. They store text lists but lack the intelligence to predict bottle-necks, analyze workload risks, adjust dynamically to calendar conflicts, or actively prompt a calm "flow state".
* **Lack of Contextual Guidance**: Checklists don't understand the user's focus metrics, historical streaks, or high-priority dependencies, resulting in visual clutter, deadline slippage, and anxiety.

### **The Selected Focus Area**: 
*"AI-Powered Holistic Daily Organizer & Hyper-Focused Workspace"* — A unified, calm, and predictive productivity hub that actively coordinates daily tasks, schedules focus blocks, manages continuous habit loops, and communicates interactively with the user's authentic environment.

---

## ✨ Solution Overview

**Priora AI** is an autonomous, full-stack workspace designed to transition knowledge workers from chaotic multitasking to high-agency, deep flow. 

Rather than simply hosting checklists, Priora AI functions as an **Active Workspace Partner**. The application features two distinct structural views:
1. **SaaS Landing Platform**: A visually stunning, high-converting product showcase framing Priora's core philosophies and design principles.
2. **Interactive Productivity Workspace**: A unified desktop-class dashboard containing a task manager, calendar sync interface, habit loop card, Pomodoro focus deck, and an integrated real-time Gemini planner.

Priora AI maintains a distraction-free **"Cosmic" UI**—relying on deep, dark space tones, subtle layout transitions, elegant glassmorphic effects, and responsive layout rails. By hosting the **Google Gemini API** and authentic **Google OAuth 2.0** handlers server-side, it keeps user credentials fully hidden from the browser while enabling powerful natural language interactions.

---

## 🚀 Key Features

### 🌌 1. Authentic Google OAuth 2.0 Sign-In Flow
* Built a fully compliant, pop-up-driven Google Authentication flow.
* Handles authorization code exchange entirely on the backend (`/api/auth/google/url` and `/auth/callback`) to exchange codes for profile tokens and store user email records securely.
* Leverages secure `window.postMessage` handshake protocols to close the login window and transition the parent workspace instantly.

### 🧠 2. Predictive AI Daily Brief & Workspace Metrics
* Computes real-time workspace metrics including a **Productivity Score** (percentage), **Completion Confidence** indicators, and **Deadline Risk Ratings** (Low, Medium, High).
* Automatically lists custom-generated, action-oriented scheduler recommendations based on pending task priorities and upcoming calendar meetings.

### 📝 3. Intelligent Task Management
* Fully interactive list enabling creation, prioritization, category tagging, and hours estimations.
* Simulates AI calibration models to tag completion odds and task risk profiles dynamically.

### 💬 4. Live Gemini Chat Assistant
* Integrated chatbot terminal powered directly by the Google Gemini API.
* Acts as an active co-pilot. Ask it to `"Plan my day"`, `"Analyze my schedule"`, or `"Recommend priority shifts"` for custom schedule parsing and planning guides.

### 🔄 5. Multi-Day Habit Tracker & Streaks
* Clean grid detailing multi-day progress, continuous active streaks, and interactive completions to encourage mental clarity.

### ⏱️ 6. Deep Work Pomodoro Deck
* Integrated focus timer containing responsive, micro-animated progress cycles and customizable intervals for distraction-free work.

---

## 🛠️ Technologies Used

### **Frontend Architecture**
* **React 18** (Functional components, custom state hooks, and side-effect portals)
* **TypeScript** (Strong typing across global entities, including `Task`, `Habit`, `ChatMessage`, and `CalendarEvent`)
* **Tailwind CSS** (Utility-first styling, glassmorphism, responsive desktop margins, and adaptive mobile prefixes)
* **Framer Motion** (Staggered element entering animations, slide transitions, and tab switching animations)
* **Lucide React** (Consistent, high-contrast, scalable iconography library)

### **Backend Architecture**
* **Express.js (Node.js)** (Fast, lightweight server handling API routes and hosting the client)
* **TSX Engine** (Direct TypeScript execution in development)
* **ESBuild Compiler** (Bundles backend modules to highly optimized standalone CJS files for rapid production loading)

---

## 🌐 Google Technologies Utilized

### **1. Google Gemini API**
* Leveraged server-side via the modern, official `@google/genai` TypeScript SDK.
* Handles prompt structuring, text extraction, schedule summarization, and chat history preservation in a secure server-side model context without revealing API keys to the browser dev tools.

### **2. Google Identity & APIs Console**
* Standard, verified Google Client Authentication setup under the project ID `Priora-AI`.
* Maps redirect callbacks securely to authorize developers on matching preview and custom origins.

---

## 🔧 Local Setup & Environment Variables

Create a `.env` file in the project root directory or add these directly to your hosting control panel:

```env
# Server Ingress Routing 
PORT=3000

# Google Gemini API Key
GEMINI_API_KEY="your-gemini-api-key-here"

# Google Developer Console Credentials (For Sign-In)
GOOGLE_CLIENT_ID="your-client-id-here.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret-here"
```

### Run the Application Locally:
```bash
# 1. Install dependencies
npm install

# 2. Launch Dev Server (Vite + Express)
npm run dev

# 3. Build Production Artifacts
npm run build

# 4. Start Production Server
npm start
```

---

## ⚙️ Deployment Architecture

* **Containerization**: Runs on managed Cloud Run environments, enabling scales-to-zero capabilities and optimized server performance.
* **Production Pipeline**:
  * `Vite` builds and compresses all static frontend assets into `/dist`.
  * `esbuild` bundles and links `server.ts` into a unified `dist/server.cjs` file, removing filesystem bottlenecks and bypassing strict ES Module resolution issues.
  * Node.js executes the bundled CJS server directly (`node dist/server.cjs`) on Port `3000`.
