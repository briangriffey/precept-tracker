import { getDatabase } from '../db'
import type { DailyEntry, Entry } from '../../../shared/types'
import { getResponsesForEntry } from './precept-responses'
import { getMeditation, createDefaultMeditation } from './meditation'

// Row shape from SQLite (snake_case)
interface EntryRow {
  id: number
  date: string
  created_at: string
  updated_at: string
}

function toEntry(row: EntryRow): Entry {
  return {
    id: row.id,
    date: row.date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function buildDailyEntry(entryRow: EntryRow): DailyEntry {
  const entry = toEntry(entryRow)
  const responses = getResponsesForEntry(entry.id)
  const meditation = getMeditation(entry.id) ?? createDefaultMeditation(entry.id)
  return { entry, responses, meditation }
}

export function getOrCreateEntry(date: string): DailyEntry {
  const db = getDatabase()

  const existing = db
    .prepare('SELECT * FROM entries WHERE date = ?')
    .get(date) as EntryRow | undefined

  if (existing) return buildDailyEntry(existing)

  const result = db
    .prepare('INSERT INTO entries (date) VALUES (?)')
    .run(date)

  const created = db
    .prepare('SELECT * FROM entries WHERE id = ?')
    .get(result.lastInsertRowid) as EntryRow

  return buildDailyEntry(created)
}

export function getEntry(date: string): DailyEntry | null {
  const db = getDatabase()

  const row = db
    .prepare('SELECT * FROM entries WHERE date = ?')
    .get(date) as EntryRow | undefined

  if (!row) return null
  return buildDailyEntry(row)
}

export function listEntries(startDate: string, endDate: string): Entry[] {
  const db = getDatabase()

  const rows = db
    .prepare('SELECT * FROM entries WHERE date BETWEEN ? AND ? ORDER BY date DESC')
    .all(startDate, endDate) as EntryRow[]

  return rows.map(toEntry)
}

export function searchEntries(query: string): Entry[] {
  const db = getDatabase()

  const rows = db
    .prepare(
      `SELECT DISTINCT e.* FROM entries e
       JOIN precept_responses pr ON pr.entry_id = e.id
       WHERE pr.response LIKE ?
       ORDER BY e.date DESC`
    )
    .all(`%${query}%`) as EntryRow[]

  return rows.map(toEntry)
}
