# Precept Tracker - Mayor Dispatch Plan

**dispatched_by: mayor**
**source_prd:** `prds/prd-precept-journal.md`

## Overview

Build an Electron desktop app for daily journaling centered around the 16 Precepts of Soto Zen Buddhism. The app uses React + TypeScript for the renderer, SQLite for local storage, and Framer Motion for calm, smooth animations.

**Current State:** Empty project directory. Greenfield build.

**Target State:** Full-featured Electron app with daily precept reflection, meditation tracking, weekly reviews, trends/streaks dashboard, export, and notification reminders. Calm, contemplative aesthetic throughout.

## Dispatch Phases

Work is broken into 10 phases. Each phase has its own instruction file with detailed tasks, acceptance criteria, and specific files to create. Phases are designed so that each phase's beads can be dispatched to polecats using the `shiny` formula.

| Phase | File | Summary | Dependencies |
|-------|------|---------|--------------|
| 1 | `01-project-scaffolding.md` | Electron + React + TS + SQLite project setup | None |
| 2 | `02-design-system.md` | Color palette, typography, theme, base components | Phase 1 |
| 3 | `03-database-and-data-layer.md` | SQLite schema, migrations, IPC bridge, repositories | Phase 1 |
| 4 | `04-navigation-and-layout.md` | App shell, sidebar, routing, page transitions | Phase 2 |
| 5 | `05-daily-journal.md` | Grouped precept reflection, prompts, ratings, auto-save, meditation tracking | Phase 3, 4 |
| 6 | `06-encouragement-and-prompts.md` | Prompt pools, rotation, encouraging messages, customization | Phase 5 |
| 7 | `07-weekly-reflection.md` | Weekly summaries, guided reflection, configurable day | Phase 5, 6 |
| 8 | `08-history-and-search.md` | Calendar view, list view, keyword search, date filtering | Phase 5 |
| 9 | `09-trends-dashboard.md` | Streaks, charts, heat map, time range selectors | Phase 5 |
| 10 | `10-settings-notifications-export.md` | Settings page, onboarding, notifications, export, packaging | Phase 7, 8, 9 |

## Dispatch Strategy

### Parallelism Opportunities

- **Phase 2 and Phase 3** can run in parallel after Phase 1 completes (design system and data layer are independent).
- **Phase 7, Phase 8, and Phase 9** can run in parallel after Phase 5 and Phase 6 complete (weekly reflection, history, and trends are independent features that all read from the same data layer).

### Bead Creation

For each phase file:
1. Read the phase instruction file
2. Create one bead per task (e.g., Task 1.1 becomes a bead)
3. Set `blockedBy` dependencies as noted in each task
4. Assign the `shiny` formula to each bead

### Polecat Dispatch

- Spawn at most 2 polecats at a time
- Prioritize foundation work (Phase 1) first
- After Phase 1 lands, spawn Phase 2 and Phase 3 in parallel
- After Phase 4 lands, spawn Phase 5 (critical path - everything depends on it)
- After Phase 5 + 6 land, spawn Phase 7, 8, 9 in parallel (3 independent features)
- Phase 10 is the final integration phase

### Monitoring

- Verify each phase's acceptance criteria before unblocking dependents
- Run `npm run build` and `npm run typecheck` after each merge to main
- Ensure no regressions in existing functionality when merging later phases

## Success Criteria

- App builds and launches on macOS, Windows, and Linux
- All 16 precepts displayed with practical prompts in grouped layout
- Daily entries persist in SQLite across app restarts
- Meditation minutes tracked per day
- Weekly reflection summarizes the week accurately
- Trends charts render with smooth animations
- Export produces clean Markdown and JSON
- All page transitions are smooth (200-400ms)
- Light and dark mode both work with calm palettes
- Typecheck passes with zero errors throughout
