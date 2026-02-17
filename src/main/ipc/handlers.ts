import { ipcMain } from 'electron'
import { IPC } from '../../shared/ipc-channels'
import * as repos from '../database/repositories'

export function registerIpcHandlers(): void {
  // Entries
  ipcMain.handle(IPC.ENTRY_GET_OR_CREATE, (_event, date: string) =>
    repos.getOrCreateEntry(date)
  )

  ipcMain.handle(IPC.ENTRY_GET, (_event, date: string) =>
    repos.getEntry(date)
  )

  ipcMain.handle(
    IPC.ENTRY_LIST,
    (_event, startDate: string, endDate: string) =>
      repos.listEntries(startDate, endDate)
  )

  ipcMain.handle(IPC.ENTRY_SEARCH, (_event, query: string) =>
    repos.searchEntries(query)
  )

  // Precept responses
  ipcMain.handle(
    IPC.RESPONSE_UPSERT,
    (
      _event,
      entryId: number,
      preceptNumber: number,
      response: string | null,
      rating: number | null,
      promptText: string
    ) => repos.upsertResponse(entryId, preceptNumber, response, rating, promptText)
  )

  // Meditation
  ipcMain.handle(
    IPC.MEDITATION_UPSERT,
    (
      _event,
      entryId: number,
      meditated: boolean,
      minutes: number,
      notes: string | null
    ) => repos.upsertMeditation(entryId, meditated, minutes, notes)
  )

  // Weekly reflections
  ipcMain.handle(IPC.WEEKLY_GET, (_event, weekStart: string) =>
    repos.getWeeklyReflection(weekStart)
  )

  ipcMain.handle(
    IPC.WEEKLY_UPSERT,
    (_event, weekStart: string, reflection: string) =>
      repos.upsertWeeklyReflection(weekStart, reflection)
  )

  ipcMain.handle(
    IPC.WEEKLY_SUMMARY,
    (_event, weekStart: string, weekEnd: string) =>
      repos.getWeeklySummary(weekStart, weekEnd)
  )

  // Prompts
  ipcMain.handle(IPC.PROMPT_LIST, (_event, preceptNumber?: number) =>
    repos.listPrompts(preceptNumber)
  )

  ipcMain.handle(
    IPC.PROMPT_CREATE,
    (_event, preceptNumber: number, promptText: string) =>
      repos.createPrompt(preceptNumber, promptText)
  )

  ipcMain.handle(
    IPC.PROMPT_UPDATE,
    (
      _event,
      id: number,
      updates: { promptText?: string; isActive?: boolean }
    ) => repos.updatePrompt(id, updates)
  )

  ipcMain.handle(IPC.PROMPT_DELETE, (_event, id: number) =>
    repos.deletePrompt(id)
  )

  // Settings
  ipcMain.handle(IPC.SETTING_GET, (_event, key: string) =>
    repos.getSetting(key)
  )

  ipcMain.handle(IPC.SETTING_SET, (_event, key: string, value: string) =>
    repos.setSetting(key, value)
  )

  ipcMain.handle(IPC.SETTING_GET_ALL, () => repos.getAllSettings())

  // Stats
  ipcMain.handle(IPC.STATS_STREAK, () => repos.getStreak())

  ipcMain.handle(IPC.STATS_MEDITATION_TREND, (_event, days: number) =>
    repos.getMeditationTrend(days)
  )

  ipcMain.handle(IPC.STATS_HEATMAP, (_event, days: number) =>
    repos.getCompletionHeatmap(days)
  )

  ipcMain.handle(
    IPC.STATS_AVERAGE_RATINGS,
    (_event, startDate: string, endDate: string) =>
      repos.getAverageRatings(startDate, endDate)
  )
}
