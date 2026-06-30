export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  estimatedHours: number;
  aiConfidence: number; // percentage (e.g. 95)
  completed: boolean;
  category: string;
  risk: 'low' | 'medium' | 'high';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedDays: boolean[]; // last 7 days completed status
  frequency: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: 'meeting' | 'task' | 'focus';
  date: number; // day of current month
}
