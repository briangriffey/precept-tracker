import { getDatabase } from '../db'
import type { Setting } from '../../../shared/types'

interface SettingRow {
  key: string
  value: string
  updated_at: string
}

function toSetting(row: SettingRow): Setting {
  return {
    key: row.key,
    value: row.value,
    updatedAt: row.updated_at,
  }
}

export function getSetting(key: string): string | null {
  const db = getDatabase()

  const row = db
    .prepare('SELECT * FROM settings WHERE key = ?')
    .get(key) as SettingRow | undefined

  return row ? row.value : null
}

export function setSetting(key: string, value: string): Setting {
  const db = getDatabase()

  db.prepare(
    `INSERT INTO settings (key, value)
     VALUES (?, ?)
     ON CONFLICT (key)
     DO UPDATE SET value = excluded.value,
                   updated_at = datetime('now')`
  ).run(key, value)

  const row = db
    .prepare('SELECT * FROM settings WHERE key = ?')
    .get(key) as SettingRow

  return toSetting(row)
}

export function getAllSettings(): Setting[] {
  const db = getDatabase()

  const rows = db
    .prepare('SELECT * FROM settings ORDER BY key')
    .all() as SettingRow[]

  return rows.map(toSetting)
}
