import { getDatabase } from '../db'
import type { StreakInfo } from '../../../shared/types'

export function getStreak(): StreakInfo {
  const db = getDatabase()

  const entries = db
    .prepare('SELECT date FROM entries ORDER BY date DESC')
    .all() as { date: string }[]

  if (entries.length === 0) {
    return { current: 0, longest: 0, lastEntryDate: null }
  }

  const lastEntryDate = entries[0].date
  const dateSet = new Set(entries.map((e) => e.date))

  // Calculate current streak (consecutive days ending at the most recent entry)
  let current = 0
  const startDate = new Date(lastEntryDate)
  const d = new Date(startDate)
  while (dateSet.has(d.toISOString().slice(0, 10))) {
    current++
    d.setDate(d.getDate() - 1)
  }

  // Calculate longest streak
  let longest = 0
  let streak = 0
  const sortedDates = entries.map((e) => e.date).sort()
  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      streak = 1
    } else {
      const prev = new Date(sortedDates[i - 1])
      const curr = new Date(sortedDates[i])
      const diffMs = curr.getTime() - prev.getTime()
      const diffDays = diffMs / (1000 * 60 * 60 * 24)
      streak = diffDays === 1 ? streak + 1 : 1
    }
    longest = Math.max(longest, streak)
  }

  return { current, longest, lastEntryDate }
}

export function getMeditationTrend(
  days: number
): { date: string; minutes: number }[] {
  const db = getDatabase()

  return db
    .prepare(
      `SELECT e.date, COALESCE(ml.minutes, 0) as minutes
       FROM entries e
       LEFT JOIN meditation_logs ml ON ml.entry_id = e.id
       WHERE e.date >= date('now', ? || ' days')
       ORDER BY e.date`
    )
    .all(`-${days}`) as { date: string; minutes: number }[]
}

export function getCompletionHeatmap(
  days: number
): { date: string; count: number }[] {
  const db = getDatabase()

  return db
    .prepare(
      `SELECT e.date, COUNT(pr.id) as count
       FROM entries e
       LEFT JOIN precept_responses pr ON pr.entry_id = e.id AND pr.response IS NOT NULL
       WHERE e.date >= date('now', ? || ' days')
       GROUP BY e.date
       ORDER BY e.date`
    )
    .all(`-${days}`) as { date: string; count: number }[]
}

export function getAverageRatings(
  startDate: string,
  endDate: string
): { preceptNumber: number; average: number }[] {
  const db = getDatabase()

  const rows = db
    .prepare(
      `SELECT pr.precept_number, AVG(pr.rating) as average
       FROM precept_responses pr
       JOIN entries e ON e.id = pr.entry_id
       WHERE e.date BETWEEN ? AND ? AND pr.rating IS NOT NULL
       GROUP BY pr.precept_number
       ORDER BY pr.precept_number`
    )
    .all(startDate, endDate) as { precept_number: number; average: number }[]

  return rows.map((r) => ({
    preceptNumber: r.precept_number,
    average: r.average,
  }))
}
