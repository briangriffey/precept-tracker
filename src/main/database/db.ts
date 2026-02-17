import { app } from 'electron'
import path from 'node:path'
import Database from 'better-sqlite3'
import { runMigrations } from './migrate'

let db: Database.Database | null = null

export function getDatabase(): Database.Database {
  if (db) return db

  const dbPath = path.join(app.getPath('userData'), 'precept-tracker.db')
  db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  runMigrations(db)

  return db
}

export function closeDatabase(): void {
  if (db) {
    db.close()
    db = null
  }
}
