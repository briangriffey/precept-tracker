import { getDatabase } from '../db'
import type { WeeklyReflection, WeeklySummary } from '../../../shared/types'

interface WeeklyReflectionRow {
  id: number
  week_start: string
  reflection: string | null
  created_at: string
  updated_at: string
}

function toWeeklyReflection(row: WeeklyReflectionRow): WeeklyReflection {
  return {
    id: row.id,
    weekStart: row.week_start,
    reflection: row.reflection,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function getWeeklyReflection(weekStart: string): WeeklyReflection | null {
  const db = getDatabase()

  const row = db
    .prepare('SELECT * FROM weekly_reflections WHERE week_start = ?')
    .get(weekStart) as WeeklyReflectionRow | undefined

  return row ? toWeeklyReflection(row) : null
}

export function upsertWeeklyReflection(
  weekStart: string,
  reflection: string
): WeeklyReflection {
  const db = getDatabase()

  db.prepare(
    `INSERT INTO weekly_reflections (week_start, reflection)
     VALUES (?, ?)
     ON CONFLICT (week_start)
     DO UPDATE SET reflection = excluded.reflection,
                   updated_at = datetime('now')`
  ).run(weekStart, reflection)

  const row = db
    .prepare('SELECT * FROM weekly_reflections WHERE week_start = ?')
    .get(weekStart) as WeeklyReflectionRow

  return toWeeklyReflection(row)
}

export function getWeeklySummary(weekStart: string, weekEnd: string): WeeklySummary {
  const db = getDatabase()

  const daysCompleted = (
    db
      .prepare('SELECT COUNT(*) as count FROM entries WHERE date BETWEEN ? AND ?')
      .get(weekStart, weekEnd) as { count: number }
  ).count

  const totalMeditationMinutes = (
    db
      .prepare(
        `SELECT COALESCE(SUM(ml.minutes), 0) as total
         FROM meditation_logs ml
         JOIN entries e ON e.id = ml.entry_id
         WHERE e.date BETWEEN ? AND ?`
      )
      .get(weekStart, weekEnd) as { total: number }
  ).total

  const avgRows = db
    .prepare(
      `SELECT pr.precept_number, AVG(pr.rating) as average
       FROM precept_responses pr
       JOIN entries e ON e.id = pr.entry_id
       WHERE e.date BETWEEN ? AND ? AND pr.rating IS NOT NULL
       GROUP BY pr.precept_number
       ORDER BY pr.precept_number`
    )
    .all(weekStart, weekEnd) as { precept_number: number; average: number }[]

  const averageRatings = avgRows.map((r) => ({
    preceptNumber: r.precept_number,
    average: r.average,
  }))

  const reflection = getWeeklyReflection(weekStart)

  return {
    weekStart,
    weekEnd,
    daysCompleted,
    totalMeditationMinutes,
    averageRatings,
    reflection,
  }
}
