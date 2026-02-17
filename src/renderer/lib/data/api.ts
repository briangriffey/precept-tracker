import type {
  DailyEntry,
  Entry,
  PreceptResponse,
  MeditationLog,
  WeeklyReflection,
  WeeklySummary,
  CustomPrompt,
  Setting,
  StreakInfo,
  ExportRequest,
  ExportResult,
} from '../../../shared/types'

interface AppApi {
  entry: {
    getOrCreate: (date: string) => Promise<DailyEntry>
    get: (date: string) => Promise<DailyEntry | null>
    list: (startDate: string, endDate: string) => Promise<Entry[]>
    search: (query: string) => Promise<Entry[]>
  }
  response: {
    upsert: (
      entryId: number,
      preceptNumber: number,
      response: string | null,
      rating: number | null,
      promptText: string
    ) => Promise<PreceptResponse>
  }
  meditation: {
    upsert: (
      entryId: number,
      meditated: boolean,
      minutes: number,
      notes: string | null
    ) => Promise<MeditationLog>
  }
  weekly: {
    get: (weekStart: string) => Promise<WeeklyReflection | null>
    upsert: (weekStart: string, reflection: string) => Promise<WeeklyReflection>
    summary: (weekStart: string, weekEnd: string) => Promise<WeeklySummary>
  }
  prompt: {
    list: (preceptNumber?: number) => Promise<CustomPrompt[]>
    create: (preceptNumber: number, promptText: string) => Promise<CustomPrompt>
    update: (
      id: number,
      updates: { promptText?: string; isActive?: boolean }
    ) => Promise<CustomPrompt>
    delete: (id: number) => Promise<void>
  }
  setting: {
    get: (key: string) => Promise<string | null>
    set: (key: string, value: string) => Promise<Setting>
    getAll: () => Promise<Setting[]>
  }
  stats: {
    streak: () => Promise<StreakInfo>
    meditationTrend: (days: number) => Promise<{ date: string; minutes: number }[]>
    heatmap: (days: number) => Promise<{ date: string; count: number }[]>
    averageRatings: (
      startDate: string,
      endDate: string
    ) => Promise<{ preceptNumber: number; average: number }[]>
  }
  export: {
    journal: (request: ExportRequest) => Promise<ExportResult>
  }
}

declare global {
  interface Window {
    api: AppApi
  }
}

export const api: AppApi = window.api
