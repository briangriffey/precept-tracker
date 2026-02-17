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
