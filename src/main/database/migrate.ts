import type Database from 'better-sqlite3'
import initialSchema from './migrations/001-initial-schema.sql?raw'

interface Migration {
  name: string
  sql: string
}

const migrations: Migration[] = [
  { name: '001-initial-schema', sql: initialSchema },
]

export function runMigrations(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `)

  const applied = new Set(
    db
      .prepare('SELECT name FROM _migrations')
      .all()
      .map((row: { name: string }) => row.name)
  )

  for (const migration of migrations) {
    if (applied.has(migration.name)) continue

    const run = db.transaction(() => {
      db.exec(migration.sql)
      db.prepare('INSERT INTO _migrations (name) VALUES (?)').run(
        migration.name
      )
    })

    run()
  }
}
