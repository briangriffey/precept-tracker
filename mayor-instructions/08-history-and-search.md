# Phase 8: Journal History & Search

**dispatched_by: mayor**
**phase:** 8 of 10
**blocks:** Phase 10
**dependencies:** Phase 5

## Description

Build the history page where users can browse, search, and revisit past journal entries. Provides both a calendar view and a list view with keyword search and date filtering.

## Tasks

### Task 8.1: History Page Layout

Build the HistoryPage with a toggle between calendar view and list view, plus a search bar.

**Files to modify:**
- `src/renderer/pages/HistoryPage.tsx` - Replace placeholder

**Files to create:**
- `src/renderer/components/history/HistoryHeader.tsx` - Search bar + view toggle
- `src/renderer/hooks/useEntryHistory.ts` - Hook for fetching/filtering entries

**Page layout:**
```
┌─────────────────────────────────────────┐
│  Journal History                          │
│                                           │
│  [🔍 Search entries...        ]           │
│                                           │
│  [Calendar] [List]     Feb 1 - Feb 16 ▼  │
│                                           │
│  (Calendar or List view renders here)     │
└─────────────────────────────────────────┘
```

**useEntryHistory hook:**
```typescript
function useEntryHistory(): {
  entries: Entry[]
  loading: boolean
  searchQuery: string
  setSearchQuery: (q: string) => void
  dateRange: { start: string; end: string }
  setDateRange: (range: { start: string; end: string }) => void
  view: 'calendar' | 'list'
  setView: (v: 'calendar' | 'list') => void
}
```

**Acceptance Criteria:**
- [ ] Page renders with search bar, view toggle, and date range selector
- [ ] View toggle switches between calendar and list smoothly
- [ ] Search input debounces (300ms) before querying
- [ ] Date range filter constrains results
- [ ] TypeScript compiles without errors

### Task 8.2: Calendar View

Build a month-view calendar that shows which days have journal entries. Clicking a day opens that day's entry.

**Files to create:**
- `src/renderer/components/history/CalendarView.tsx`
- `src/renderer/components/history/CalendarDay.tsx`

**Calendar specs:**
- Standard month grid (7 columns for days of week, rows for weeks)
- Days with entries show a filled dot indicator using `--color-primary`
- Days with meditation show a second smaller dot using `--color-accent`
- Today is subtly highlighted
- Future days are dimmed
- Clicking a day navigates to the entry detail view
- Month navigation arrows (< February 2026 >)
- Smooth month transition animation

**Acceptance Criteria:**
- [ ] Calendar renders correct days for each month
- [ ] Days with entries are visually marked
- [ ] Days with meditation have a distinct indicator
- [ ] Month navigation works
- [ ] Clicking a day with an entry navigates to that entry
- [ ] Clicking a day without an entry offers to start one (navigate to /today with date override)
- [ ] Today is highlighted
- [ ] Future days are non-interactive
- [ ] Calendar renders using design system colors
- [ ] TypeScript compiles without errors

### Task 8.3: List View

Build a chronological list of entries with preview text and key metadata.

**Files to create:**
- `src/renderer/components/history/ListView.tsx`
- `src/renderer/components/history/EntryPreviewCard.tsx`

**EntryPreviewCard layout:**
```
┌─────────────────────────────────────────┐
│  Monday, February 16, 2026               │
│                                           │
│  12 precepts reflected on  •  30 min ☸   │
│                                           │
│  "Today I noticed that when talking with  │
│   my coworker about the project, I was..." │  ← First 100 chars of first response
└─────────────────────────────────────────┘
```

**Behavior:**
- Entries listed in reverse chronological order (newest first)
- Each card shows: date, precept count, meditation minutes (if any), preview of first response text
- Clicking a card navigates to the full entry view
- Infinite scroll or "Load more" for long histories
- Search results highlight matching text in the preview

**Acceptance Criteria:**
- [ ] Entries display in reverse chronological order
- [ ] Each card shows date, precept count, meditation summary, and text preview
- [ ] Clicking a card navigates to the entry detail
- [ ] Search results show matching entries with highlighted keywords
- [ ] Empty state shows "No entries found" with a gentle message
- [ ] Performance is acceptable with 365+ entries
- [ ] TypeScript compiles without errors

### Task 8.4: Entry Detail View

Build a read-mode view of a past entry with an option to edit.

**Files to create:**
- `src/renderer/pages/EntryDetailPage.tsx`
- `src/renderer/components/history/EntryReadView.tsx`

**Route:** `/history/:date` (e.g., `/history/2026-02-16`)

**Read view layout:**
- Date as header
- Each precept group section (same grouped layout as daily journal)
- Each precept shows: vow, the prompt that was shown that day, the response text, the rating
- Meditation section at the bottom
- "Edit" button in the header that navigates to the daily journal page for that date (reusing the TodayPage with a date parameter)

**Acceptance Criteria:**
- [ ] Entry loads for the specified date
- [ ] All precept responses displayed in grouped layout
- [ ] Prompt text from that day is shown (stored in `prompt_text` column)
- [ ] Ratings displayed as filled circles (read-only)
- [ ] Meditation data displayed
- [ ] Edit button navigates to editable view
- [ ] 404/empty state if no entry exists for that date
- [ ] Page transition animation from history to detail
- [ ] TypeScript compiles without errors
