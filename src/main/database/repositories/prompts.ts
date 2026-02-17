import { getDatabase } from '../db'
import type { CustomPrompt } from '../../../shared/types'

interface CustomPromptRow {
  id: number
  precept_number: number
  prompt_text: string
  is_active: number
  created_at: string
}

function toCustomPrompt(row: CustomPromptRow): CustomPrompt {
  return {
    id: row.id,
    preceptNumber: row.precept_number,
    promptText: row.prompt_text,
    isActive: row.is_active === 1,
    createdAt: row.created_at,
  }
}

export function listPrompts(preceptNumber?: number): CustomPrompt[] {
  const db = getDatabase()

  if (preceptNumber !== undefined) {
    const rows = db
      .prepare(
        'SELECT * FROM custom_prompts WHERE precept_number = ? ORDER BY created_at'
      )
      .all(preceptNumber) as CustomPromptRow[]
    return rows.map(toCustomPrompt)
  }

  const rows = db
    .prepare('SELECT * FROM custom_prompts ORDER BY precept_number, created_at')
    .all() as CustomPromptRow[]

  return rows.map(toCustomPrompt)
}

export function createPrompt(
  preceptNumber: number,
  promptText: string
): CustomPrompt {
  const db = getDatabase()

  const result = db
    .prepare(
      'INSERT INTO custom_prompts (precept_number, prompt_text) VALUES (?, ?)'
    )
    .run(preceptNumber, promptText)

  const row = db
    .prepare('SELECT * FROM custom_prompts WHERE id = ?')
    .get(result.lastInsertRowid) as CustomPromptRow

  return toCustomPrompt(row)
}

export function updatePrompt(
  id: number,
  updates: { promptText?: string; isActive?: boolean }
): CustomPrompt {
  const db = getDatabase()

  if (updates.promptText !== undefined) {
    db.prepare('UPDATE custom_prompts SET prompt_text = ? WHERE id = ?').run(
      updates.promptText,
      id
    )
  }

  if (updates.isActive !== undefined) {
    db.prepare('UPDATE custom_prompts SET is_active = ? WHERE id = ?').run(
      updates.isActive ? 1 : 0,
      id
    )
  }

  const row = db
    .prepare('SELECT * FROM custom_prompts WHERE id = ?')
    .get(id) as CustomPromptRow

  return toCustomPrompt(row)
}

export function deletePrompt(id: number): void {
  const db = getDatabase()
  db.prepare('DELETE FROM custom_prompts WHERE id = ?').run(id)
}
