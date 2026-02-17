# Phase 3: Database & Data Layer

**dispatched_by: mayor**
**phase:** 3 of 10
**blocks:** Phase 5
**dependencies:** Phase 1

## Description

Set up the SQLite database in the Electron main process, define the schema, create a migration system, build repository modules for data access, and wire up IPC handlers so the renderer can read/write data through the preload bridge. This is the data backbone of the app.

## Tasks

### Task 3.1: SQLite Database Initialization

Set up better-sqlite3 in the main process. The database file lives in the app's user data directory (platform-appropriate). Create an initialization module that opens the database connection, enables WAL mode for performance, and runs any pending migrations.

**Files to create:**
- `src/main/database/db.ts` - Database connection singleton
- `src/main/database/index.ts` - Re-export

**Database location:**
```typescript
import { app } from 'electron'
import path from 'path'

const DB_PATH = path.join(app.getPath('userData'), 'precept-tracker.db')
```

**Initialization:**
```typescript
import Database from 'better-sqlite3'

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')
```

**Acceptance Criteria:**
- [ ] Database file created in the app's userData directory
- [ ] WAL mode enabled for concurrent read performance
- [ ] Foreign keys enforced
- [ ] Database connection is a singleton (one connection per app lifecycle)
- [ ] Connection closes cleanly on app quit (`app.on('before-quit')`)
- [ ] TypeScript compiles without errors

### Task 3.2: Migration System

Create a simple, file-based migration system. Each migration is a numbered SQL file. The system tracks which migrations have been applied in a `_migrations` table.

**Files to create:**
- `src/main/database/migrate.ts` - Migration runner
- `src/main/database/migrations/001-initial-schema.sql` - Initial schema

**Migration runner logic:**
1. Create `_migrations` table if it doesn't exist: `(id INTEGER PRIMARY KEY, name TEXT, applied_at TEXT)`
2. Read all `.sql` files from the migrations directory, sorted by number prefix
3. Skip already-applied migrations
4. Run each new migration in a transaction
5. Record applied migration in `_migrations`

**Acceptance Criteria:**
- [ ] Migration runner creates `_migrations` table on first run
- [ ] Migrations run in numeric order
- [ ] Each migration runs inside a transaction (rollback on failure)
- [ ] Already-applied migrations are skipped
- [ ] Migration runner is idempotent (safe to run multiple times)
- [ ] TypeScript compiles without errors

### Task 3.3: Initial Database Schema

Design and implement the schema in `001-initial-schema.sql`. This covers all data needs for the app.

**File:** `src/main/database/migrations/001-initial-schema.sql`

**Schema:**

```sql
-- Daily journal entries (one per day)
CREATE TABLE entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL UNIQUE,  -- ISO date string: YYYY-MM-DD
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Individual precept reflections (up to 16 per entry)
CREATE TABLE precept_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entry_id INTEGER NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
  precept_number INTEGER NOT NULL CHECK (precept_number BETWEEN 1 AND 16),
  response TEXT,             -- Free-text reflection
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  prompt_text TEXT,          -- The prompt that was shown (for history)
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(entry_id, precept_number)
);

-- Meditation log (one per entry)
CREATE TABLE meditation_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entry_id INTEGER NOT NULL UNIQUE REFERENCES entries(id) ON DELETE CASCADE,
  meditated INTEGER NOT NULL DEFAULT 0,  -- boolean: 0 or 1
  minutes INTEGER DEFAULT 0,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Weekly reflections
CREATE TABLE weekly_reflections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  week_start TEXT NOT NULL UNIQUE,  -- ISO date of the week's start (Monday)
  reflection TEXT,                   -- Free-form weekly reflection
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Custom prompts per precept
CREATE TABLE custom_prompts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  precept_number INTEGER NOT NULL CHECK (precept_number BETWEEN 1 AND 16),
  prompt_text TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,  -- boolean: can be deactivated
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- User settings (key-value store)
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Default settings
INSERT INTO settings (key, value) VALUES
  ('reminder_time', '20:00'),
  ('reminder_enabled', 'true'),
  ('weekly_reflection_day', 'sunday'),
  ('theme', 'system'),
  ('onboarding_complete', 'false');

-- Indexes for common queries
CREATE INDEX idx_entries_date ON entries(date);
CREATE INDEX idx_precept_responses_entry ON precept_responses(entry_id);
CREATE INDEX idx_precept_responses_precept ON precept_responses(precept_number);
CREATE INDEX idx_meditation_logs_entry ON meditation_logs(entry_id);
CREATE INDEX idx_weekly_reflections_week ON weekly_reflections(week_start);
```

**Acceptance Criteria:**
- [ ] All tables created successfully
- [ ] Foreign key constraints work (cascade deletes)
- [ ] Unique constraints prevent duplicate entries per day and per precept
- [ ] Default settings inserted
- [ ] Indexes created for query performance
- [ ] Schema runs cleanly through the migration system
- [ ] TypeScript compiles without errors

### Task 3.4: TypeScript Type Definitions

Define TypeScript interfaces for all database entities. These types are shared between main and renderer processes.

**Files to create:**
- `src/shared/types.ts` - Shared type definitions

**Types:**
```typescript
export interface Entry {
  id: number
  date: string            // YYYY-MM-DD
  createdAt: string
  updatedAt: string
}

export interface PreceptResponse {
  id: number
  entryId: number
  preceptNumber: number   // 1-16
  response: string | null
  rating: number | null   // 1-5
  promptText: string | null
  createdAt: string
  updatedAt: string
}

export interface MeditationLog {
  id: number
  entryId: number
  meditated: boolean
  minutes: number
  notes: string | null
  createdAt: string
  updatedAt: string
}

export interface WeeklyReflection {
  id: number
  weekStart: string       // YYYY-MM-DD (Monday)
  reflection: string | null
  createdAt: string
  updatedAt: string
}

export interface CustomPrompt {
  id: number
  preceptNumber: number
  promptText: string
  isActive: boolean
  createdAt: string
}

export interface Setting {
  key: string
  value: string
  updatedAt: string
}

// Composite types for the UI
export interface DailyEntry {
  entry: Entry
  responses: PreceptResponse[]
  meditation: MeditationLog
}

export interface WeeklySummary {
  weekStart: string
  weekEnd: string
  daysCompleted: number
  totalMeditationMinutes: number
  averageRatings: { preceptNumber: number; average: number }[]
  reflection: WeeklyReflection | null
}

export interface StreakInfo {
  current: number
  longest: number
  lastEntryDate: string | null
}
```

**Acceptance Criteria:**
- [ ] All database entity types defined
- [ ] Composite types for UI consumption defined
- [ ] Types importable from both main and renderer processes
- [ ] TypeScript compiles without errors

### Task 3.5: Repository Modules

Create data access modules in the main process. Each repository wraps SQLite queries with typed inputs/outputs. Use prepared statements for performance.

**Files to create:**
- `src/main/database/repositories/entries.ts`
- `src/main/database/repositories/precept-responses.ts`
- `src/main/database/repositories/meditation.ts`
- `src/main/database/repositories/weekly-reflections.ts`
- `src/main/database/repositories/prompts.ts`
- `src/main/database/repositories/settings.ts`
- `src/main/database/repositories/stats.ts` - Aggregation queries for trends
- `src/main/database/repositories/index.ts` - Barrel export

**Key repository methods:**

**entries.ts:**
- `getOrCreateEntry(date: string): DailyEntry` - Gets existing or creates new entry for a date
- `getEntry(date: string): DailyEntry | null`
- `listEntries(startDate: string, endDate: string): Entry[]`
- `searchEntries(query: string): Entry[]` - Full-text search across responses

**precept-responses.ts:**
- `upsertResponse(entryId: number, preceptNumber: number, response: string | null, rating: number | null, promptText: string): PreceptResponse`
- `getResponsesForEntry(entryId: number): PreceptResponse[]`

**meditation.ts:**
- `upsertMeditation(entryId: number, meditated: boolean, minutes: number, notes: string | null): MeditationLog`
- `getMeditation(entryId: number): MeditationLog | null`

**stats.ts:**
- `getStreak(): StreakInfo`
- `getMeditationTrend(days: number): { date: string; minutes: number }[]`
- `getCompletionHeatmap(days: number): { date: string; count: number }[]`
- `getAverageRatings(startDate: string, endDate: string): { preceptNumber: number; average: number }[]`

**Acceptance Criteria:**
- [ ] All repository modules created with typed interfaces
- [ ] Prepared statements used for all queries
- [ ] `getOrCreateEntry` is idempotent (safe to call multiple times for same date)
- [ ] `upsertResponse` creates or updates without duplicates
- [ ] `searchEntries` performs keyword search across precept response text
- [ ] `getStreak` correctly calculates consecutive days
- [ ] All queries handle empty results gracefully
- [ ] TypeScript compiles without errors

### Task 3.6: IPC Bridge

Wire up IPC handlers in the main process and expose them through the preload script so the renderer can call data operations. Use Electron's contextBridge for security.

**Files to create/modify:**
- `src/main/ipc/handlers.ts` - IPC handler registration
- `src/preload/preload.ts` - Expose typed API via contextBridge
- `src/shared/ipc-channels.ts` - Channel name constants
- `src/renderer/lib/data/api.ts` - Renderer-side typed API wrapper

**IPC channel pattern:**
```typescript
// ipc-channels.ts
export const IPC = {
  // Entries
  ENTRY_GET_OR_CREATE: 'entry:getOrCreate',
  ENTRY_GET: 'entry:get',
  ENTRY_LIST: 'entry:list',
  ENTRY_SEARCH: 'entry:search',
  // Precept responses
  RESPONSE_UPSERT: 'response:upsert',
  // Meditation
  MEDITATION_UPSERT: 'meditation:upsert',
  // Weekly
  WEEKLY_GET: 'weekly:get',
  WEEKLY_UPSERT: 'weekly:upsert',
  WEEKLY_SUMMARY: 'weekly:summary',
  // Prompts
  PROMPT_LIST: 'prompt:list',
  PROMPT_CREATE: 'prompt:create',
  PROMPT_UPDATE: 'prompt:update',
  PROMPT_DELETE: 'prompt:delete',
  // Settings
  SETTING_GET: 'setting:get',
  SETTING_SET: 'setting:set',
  SETTING_GET_ALL: 'setting:getAll',
  // Stats
  STATS_STREAK: 'stats:streak',
  STATS_MEDITATION_TREND: 'stats:meditationTrend',
  STATS_HEATMAP: 'stats:heatmap',
  STATS_AVERAGE_RATINGS: 'stats:averageRatings',
} as const
```

**Preload bridge:**
```typescript
// preload.ts
contextBridge.exposeInMainWorld('api', {
  entry: {
    getOrCreate: (date: string) => ipcRenderer.invoke(IPC.ENTRY_GET_OR_CREATE, date),
    get: (date: string) => ipcRenderer.invoke(IPC.ENTRY_GET, date),
    // ... etc
  },
  // ... other namespaces
})
```

**Renderer API wrapper (api.ts):**
```typescript
// Typed wrapper around window.api
export const api = window.api as {
  entry: {
    getOrCreate: (date: string) => Promise<DailyEntry>
    get: (date: string) => Promise<DailyEntry | null>
    list: (startDate: string, endDate: string) => Promise<Entry[]>
    search: (query: string) => Promise<Entry[]>
  }
  // ... fully typed
}
```

**Acceptance Criteria:**
- [ ] All IPC channels defined as constants (no magic strings)
- [ ] Main process handlers registered for all channels
- [ ] Preload script exposes typed API via contextBridge
- [ ] Renderer API wrapper provides full TypeScript types
- [ ] Round-trip works: renderer calls api → IPC → main → SQLite → response back to renderer
- [ ] Error handling: IPC errors propagate to renderer as rejected promises
- [ ] TypeScript compiles without errors
