# Precept Tracker

A desktop journal for daily reflection on the 16 Precepts of Soto Zen Buddhism. Each day, the app presents grounded, practical prompts for each precept and saves your responses locally. No accounts, no cloud, no distractions — just you and your practice.

## What It Does

Precept Tracker organizes the 16 precepts into their traditional three groups and gives you a quiet space to reflect on each one daily:

**The Three Refuges** — Buddha, Dharma, Sangha. Trusting your own awakened nature, committing to truth, and recognizing interconnection.

**The Three Pure Precepts** — Refrain from harm, cultivate good, serve all beings. The broadest ethical guidelines from which everything else flows.

**The Ten Grave Precepts** — Affirming life, not stealing, respecting intimacy, truthful speech, clarity of mind, not gossiping, humility, generosity, loving-kindness, and honoring the path. Specific guidelines understood not as commandments but as descriptions of how an awakened person naturally lives.

Each precept has a pool of 5-6 prompts rooted in everyday situations — work, relationships, meals, conversations — rather than abstract philosophy. A different prompt appears each day, and you can refresh to cycle through others.

### Features

- **Daily journal** — Reflect on any or all 16 precepts each day with a 1-5 rating and free-form response. Changes auto-save as you type.
- **Meditation tracking** — Log whether you sat, for how long, and any notes.
- **Weekly reflection** — A summary of your week (days practiced, minutes sat, strongest and growth precepts) with space for longer reflection.
- **Trends** — Current and longest streaks, meditation charts, a completion heatmap, and average ratings per precept over configurable time ranges.
- **History** — Calendar and list views of past entries with full-text search.
- **Daily reminders** — Optional native notifications at a time you choose. Skips days you've already journaled.
- **Export** — Save your journal as Markdown or JSON, all entries or a date range.
- **Custom prompts** — Add, edit, or remove prompts for any precept.
- **Light and dark themes** — A calm palette of warm whites, sage greens, and soft golds. Switches with a toggle in the sidebar.
- **Onboarding** — A brief welcome flow that introduces the precepts and lets you configure reminders.

## Tech Stack

- [Electron](https://www.electronjs.org/) 40 + [Electron Forge](https://www.electronforge.io/)
- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/) 5.9
- [Vite](https://vite.dev/) for bundling
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) for local persistence
- [Recharts](https://recharts.org/) for trend visualizations
- [Framer Motion](https://www.framer.com/motion/) for page transitions and animations
- [date-fns](https://date-fns.org/) for date math
- [React Router](https://reactrouter.com/) for navigation

No external services. All data stays on your machine in a SQLite database.

## Getting Started

### Prerequisites

- Node.js >= 22
- npm

### Install and Run

```bash
git clone https://github.com/briangriffey/precept-tracker.git
cd precept-tracker
npm install
npm start
```

This launches the app in development mode with hot reload.

### Build for Distribution

```bash
# Package the app for your current platform
npm run package

# Build platform installers (DMG, Squirrel, deb, rpm)
npm run make
```

### Other Commands

```bash
npm run typecheck   # Run the TypeScript compiler (no emit)
npm run lint        # Run ESLint
```

## Architecture

```
src/
├── main/                   Electron main process
│   ├── main.ts             App lifecycle, window, IPC registration
│   ├── database/
│   │   ├── db.ts           SQLite init (WAL mode, foreign keys)
│   │   ├── migrate.ts      Migration runner
│   │   ├── migrations/     SQL schema files
│   │   └── repositories/   Data access (entries, responses, meditation,
│   │                        weekly reflections, prompts, settings, stats)
│   ├── ipc/                IPC handlers + export formatting
│   └── notifications/      Daily reminder scheduler
│
├── preload/
│   └── preload.ts          Secure contextBridge API
│
├── renderer/               React UI
│   ├── App.tsx             Router provider
│   ├── routes.tsx          Page routing
│   ├── pages/              TodayPage, HistoryPage, TrendsPage,
│   │                        WeeklyPage, SettingsPage, PromptsPage
│   ├── components/
│   │   ├── layout/         AppShell, Sidebar, page transitions
│   │   ├── journal/        PreceptCard, MeditationTracker, progress
│   │   ├── history/        CalendarView, ListView, search
│   │   ├── trends/         StreakCard, charts, heatmap
│   │   ├── weekly/         Week selector, summary, reflection form
│   │   ├── onboarding/     3-step welcome flow
│   │   ├── ui/             Base components (Card, Button, Input, etc.)
│   │   ├── export/         Export dialog
│   │   └── prompts/        Custom prompt manager
│   ├── hooks/              useDailyEntry, useAutoSave, useTrendsData,
│   │                        useSettings, useTheme, etc.
│   └── lib/
│       ├── precepts/       The 16 precept definitions and prompt rotation
│       ├── encouragement/  Daily greetings, streak milestones
│       └── design/         CSS theme variables, typography
│
└── shared/
    ├── types.ts            Shared TypeScript interfaces
    └── ipc-channels.ts     IPC channel constants
```

Data flows from the React UI through custom hooks, across the IPC bridge, into repository functions that read and write SQLite. Auto-save debounces writes by 500ms with optimistic UI updates so the journal feels immediate.

## Database

Seven tables in a local SQLite file:

| Table | Purpose |
|---|---|
| `entries` | One row per date |
| `precept_responses` | Up to 16 responses per entry (text + 1-5 rating) |
| `meditation_logs` | Daily meditation record (sat/minutes/notes) |
| `weekly_reflections` | Free-form weekly reflection text |
| `custom_prompts` | User-added prompts per precept |
| `settings` | Key-value config (theme, reminders, etc.) |
| `_migrations` | Schema version tracking |

Foreign keys and cascading deletes keep everything consistent. WAL mode enables safe concurrent reads.