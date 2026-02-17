import { getDatabase } from '../db'
import type { PreceptResponse } from '../../../shared/types'

interface PreceptResponseRow {
  id: number
  entry_id: number
  precept_number: number
  response: string | null
  rating: number | null
  prompt_text: string | null
  created_at: string
  updated_at: string
}

function toPreceptResponse(row: PreceptResponseRow): PreceptResponse {
  return {
    id: row.id,
    entryId: row.entry_id,
    preceptNumber: row.precept_number,
    response: row.response,
    rating: row.rating,
    promptText: row.prompt_text,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function upsertResponse(
  entryId: number,
  preceptNumber: number,
  response: string | null,
  rating: number | null,
  promptText: string
): PreceptResponse {
  const db = getDatabase()

  db.prepare(
    `INSERT INTO precept_responses (entry_id, precept_number, response, rating, prompt_text)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT (entry_id, precept_number)
     DO UPDATE SET response = excluded.response,
                   rating = excluded.rating,
                   prompt_text = excluded.prompt_text,
                   updated_at = datetime('now')`
  ).run(entryId, preceptNumber, response, rating, promptText)

  const row = db
    .prepare(
      'SELECT * FROM precept_responses WHERE entry_id = ? AND precept_number = ?'
    )
    .get(entryId, preceptNumber) as PreceptResponseRow

  return toPreceptResponse(row)
}

export function getResponsesForEntry(entryId: number): PreceptResponse[] {
  const db = getDatabase()

  const rows = db
    .prepare(
      'SELECT * FROM precept_responses WHERE entry_id = ? ORDER BY precept_number'
    )
    .all(entryId) as PreceptResponseRow[]

  return rows.map(toPreceptResponse)
}
