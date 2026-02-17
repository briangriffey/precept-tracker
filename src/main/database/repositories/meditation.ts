import { getDatabase } from '../db'
import type { MeditationLog } from '../../../shared/types'

interface MeditationRow {
  id: number
  entry_id: number
  meditated: number
  minutes: number
  notes: string | null
  created_at: string
  updated_at: string
}

function toMeditationLog(row: MeditationRow): MeditationLog {
  return {
    id: row.id,
    entryId: row.entry_id,
    meditated: row.meditated === 1,
    minutes: row.minutes,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function createDefaultMeditation(entryId: number): MeditationLog {
  const db = getDatabase()

  db.prepare(
    'INSERT INTO meditation_logs (entry_id, meditated, minutes) VALUES (?, 0, 0)'
  ).run(entryId)

  const row = db
    .prepare('SELECT * FROM meditation_logs WHERE entry_id = ?')
    .get(entryId) as MeditationRow

  return toMeditationLog(row)
}

export function upsertMeditation(
  entryId: number,
  meditated: boolean,
  minutes: number,
  notes: string | null
): MeditationLog {
  const db = getDatabase()

  db.prepare(
    `INSERT INTO meditation_logs (entry_id, meditated, minutes, notes)
     VALUES (?, ?, ?, ?)
     ON CONFLICT (entry_id)
     DO UPDATE SET meditated = excluded.meditated,
                   minutes = excluded.minutes,
                   notes = excluded.notes,
                   updated_at = datetime('now')`
  ).run(entryId, meditated ? 1 : 0, minutes, notes)

  const row = db
    .prepare('SELECT * FROM meditation_logs WHERE entry_id = ?')
    .get(entryId) as MeditationRow

  return toMeditationLog(row)
}

export function getMeditation(entryId: number): MeditationLog | null {
  const db = getDatabase()

  const row = db
    .prepare('SELECT * FROM meditation_logs WHERE entry_id = ?')
    .get(entryId) as MeditationRow | undefined

  return row ? toMeditationLog(row) : null
}
