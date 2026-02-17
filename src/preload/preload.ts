import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '../shared/ipc-channels'

contextBridge.exposeInMainWorld('api', {
  entry: {
    getOrCreate: (date: string) =>
      ipcRenderer.invoke(IPC.ENTRY_GET_OR_CREATE, date),
    get: (date: string) => ipcRenderer.invoke(IPC.ENTRY_GET, date),
    list: (startDate: string, endDate: string) =>
      ipcRenderer.invoke(IPC.ENTRY_LIST, startDate, endDate),
    search: (query: string) => ipcRenderer.invoke(IPC.ENTRY_SEARCH, query),
  },
  response: {
    upsert: (
      entryId: number,
      preceptNumber: number,
      response: string | null,
      rating: number | null,
      promptText: string
    ) =>
      ipcRenderer.invoke(
        IPC.RESPONSE_UPSERT,
        entryId,
        preceptNumber,
        response,
        rating,
        promptText
      ),
  },
  meditation: {
    upsert: (
      entryId: number,
      meditated: boolean,
      minutes: number,
      notes: string | null
    ) =>
      ipcRenderer.invoke(
        IPC.MEDITATION_UPSERT,
        entryId,
        meditated,
        minutes,
        notes
      ),
  },
  weekly: {
    get: (weekStart: string) =>
      ipcRenderer.invoke(IPC.WEEKLY_GET, weekStart),
    upsert: (weekStart: string, reflection: string) =>
      ipcRenderer.invoke(IPC.WEEKLY_UPSERT, weekStart, reflection),
    summary: (weekStart: string, weekEnd: string) =>
      ipcRenderer.invoke(IPC.WEEKLY_SUMMARY, weekStart, weekEnd),
  },
  prompt: {
    list: (preceptNumber?: number) =>
      ipcRenderer.invoke(IPC.PROMPT_LIST, preceptNumber),
    create: (preceptNumber: number, promptText: string) =>
      ipcRenderer.invoke(IPC.PROMPT_CREATE, preceptNumber, promptText),
    update: (
      id: number,
      updates: { promptText?: string; isActive?: boolean }
    ) => ipcRenderer.invoke(IPC.PROMPT_UPDATE, id, updates),
    delete: (id: number) => ipcRenderer.invoke(IPC.PROMPT_DELETE, id),
  },
  setting: {
    get: (key: string) => ipcRenderer.invoke(IPC.SETTING_GET, key),
    set: (key: string, value: string) =>
      ipcRenderer.invoke(IPC.SETTING_SET, key, value),
    getAll: () => ipcRenderer.invoke(IPC.SETTING_GET_ALL),
  },
  stats: {
    streak: () => ipcRenderer.invoke(IPC.STATS_STREAK),
    meditationTrend: (days: number) =>
      ipcRenderer.invoke(IPC.STATS_MEDITATION_TREND, days),
    heatmap: (days: number) =>
      ipcRenderer.invoke(IPC.STATS_HEATMAP, days),
    averageRatings: (startDate: string, endDate: string) =>
      ipcRenderer.invoke(IPC.STATS_AVERAGE_RATINGS, startDate, endDate),
  },
})
