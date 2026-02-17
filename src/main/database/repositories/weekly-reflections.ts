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

  const daysWithEntries = (
    db
      .prepare('SELECT COUNT(*) as count FROM entries WHERE date BETWEEN ? AND ?')
      .get(weekStart, weekEnd) as { count: number }
  ).count

  const totalPrecepts = (
    db
      .prepare(
        `SELECT COUNT(*) as count
         FROM precept_responses pr
         JOIN entries e ON e.id = pr.entry_id
         WHERE e.date BETWEEN ? AND ?
           AND (pr.response IS NOT NULL OR pr.rating IS NOT NULL)`
      )
      .get(weekStart, weekEnd) as { count: number }
  ).count

  const meditationStats = db
    .prepare(
      `SELECT COALESCE(SUM(ml.minutes), 0) as total,
              COUNT(CASE WHEN ml.meditated = 1 THEN 1 END) as days
       FROM meditation_logs ml
       JOIN entries e ON e.id = ml.entry_id
       WHERE e.date BETWEEN ? AND ?`
    )
    .get(weekStart, weekEnd) as { total: number; days: number }

  const avgRows = db
    .prepare(
      `SELECT pr.precept_number, AVG(pr.rating) as average, COUNT(*) as count
       FROM precept_responses pr
       JOIN entries e ON e.id = pr.entry_id
       WHERE e.date BETWEEN ? AND ? AND pr.rating IS NOT NULL
       GROUP BY pr.precept_number
       ORDER BY pr.precept_number`
    )
    .all(weekStart, weekEnd) as { precept_number: number; average: number; count: number }[]

  const averageRatings = avgRows.map((r) => ({
    preceptNumber: r.precept_number,
    average: r.average,
    count: r.count,
  }))

  // Top 3 highest-rated precepts
  const sorted = [...averageRatings].sort((a, b) => b.average - a.average)
  const topPrecepts = sorted.slice(0, 3).map((r) => r.preceptNumber)

  // Bottom 3 rated precepts (areas for growth)
  const growthPrecepts = sorted
    .slice()
    .reverse()
    .slice(0, 3)
    .map((r) => r.preceptNumber)

  const reflection = getWeeklyReflection(weekStart)

  return {
    weekStart,
    weekEnd,
    daysWithEntries,
    totalPrecepts,
    totalMeditationMinutes: meditationStats.total,
    daysWithMeditation: meditationStats.days,
    averageRatings,
    topPrecepts,
    growthPrecepts,
    reflection,
  }
}
