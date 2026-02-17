import { Notification, BrowserWindow } from 'electron'
import { getSetting } from '../database/repositories/settings'
import { getEntry } from '../database/repositories/entries'

const REMINDER_MESSAGES = [
  'A few minutes of reflection can shift your whole evening.',
  'Your journal is waiting whenever you\'re ready.',
  'Time to sit with the precepts for a moment?',
  'A gentle reminder to check in with your practice today.',
  'When you\'re ready, your daily reflection is here.',
]

let checkInterval: ReturnType<typeof setInterval> | null = null
let lastFiredDate: string | null = null

function getTodayDate(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function getCurrentTime(): string {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

function getRandomMessage(): string {
  return REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)]
}

function hasEntryResponses(date: string): boolean {
  try {
    const entry = getEntry(date)
    if (!entry) return false
    return entry.responses.some((r) => r.response !== null && r.response !== '')
  } catch {
    return false
  }
}

function showReminder(): void {
  const message = getRandomMessage()
  const notification = new Notification({
    title: 'Precept Tracker',
    body: message,
    silent: false,
  })

  notification.on('click', () => {
    const windows = BrowserWindow.getAllWindows()
    if (windows.length > 0) {
      const win = windows[0]
      if (win.isMinimized()) win.restore()
      win.focus()
      win.webContents.executeJavaScript(
        `window.location.hash = '#/today'`
      )
    }
  })

  notification.show()
}

function checkAndNotify(): void {
  const enabled = getSetting('reminder_enabled')
  if (enabled === 'false') return

  const reminderTime = getSetting('reminder_time') ?? '20:00'
  const currentTime = getCurrentTime()
  const today = getTodayDate()

  // Only fire once per day, at the configured minute
  if (currentTime !== reminderTime) return
  if (lastFiredDate === today) return

  // Don't fire if today's entry already has responses
  if (hasEntryResponses(today)) return

  lastFiredDate = today
  showReminder()
}

export function startReminderScheduler(): void {
  if (checkInterval) return
  // Check every 30 seconds to avoid missing the minute window
  checkInterval = setInterval(checkAndNotify, 30_000)
}

export function stopReminderScheduler(): void {
  if (checkInterval) {
    clearInterval(checkInterval)
    checkInterval = null
  }
}
