// Database entity types

export interface Entry {
  id: number
  date: string // YYYY-MM-DD
  createdAt: string
  updatedAt: string
}

export interface PreceptResponse {
  id: number
  entryId: number
  preceptNumber: number // 1-16
  response: string | null
  rating: number | null // 1-5
  promptText: string | null
  createdAt: string
  updatedAt: string
}

export interface MeditationLog {
  id: number
  entryId: number
  meditated: boolean
  minutes: number
  notes: string | null
  createdAt: string
  updatedAt: string
}

export interface WeeklyReflection {
  id: number
  weekStart: string // YYYY-MM-DD (Monday)
  reflection: string | null
  createdAt: string
  updatedAt: string
}

export interface CustomPrompt {
  id: number
  preceptNumber: number
  promptText: string
  isActive: boolean
  createdAt: string
}

export interface Setting {
  key: string
  value: string
  updatedAt: string
}

// Composite types for the UI

export interface DailyEntry {
  entry: Entry
  responses: PreceptResponse[]
  meditation: MeditationLog
}

export interface WeeklySummary {
  weekStart: string
  weekEnd: string
  daysCompleted: number
  totalMeditationMinutes: number
  averageRatings: { preceptNumber: number; average: number }[]
  reflection: WeeklyReflection | null
}

export interface StreakInfo {
  current: number
  longest: number
  lastEntryDate: string | null
}
