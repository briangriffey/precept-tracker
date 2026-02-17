# Phase 7: Weekly Reflection

**dispatched_by: mayor**
**phase:** 7 of 10
**blocks:** Phase 10
**dependencies:** Phase 5, Phase 6

## Description

Build the weekly reflection feature. At the end of each week, the app presents a summary of the week's practice and guides the user through a broader reflection. This helps practitioners notice patterns and sustain their practice over time.

## Tasks

### Task 7.1: Weekly Summary Data Aggregation

Build the logic that computes a weekly summary from the daily entries. This runs in the renderer using data from the IPC bridge.

**Files to create:**
- `src/renderer/lib/weekly/summary.ts` - Summary computation
- `src/renderer/hooks/useWeeklySummary.ts` - Hook for fetching and computing

**WeeklySummary shape (from shared types):**
```typescript
interface WeeklySummary {
  weekStart: string          // Monday YYYY-MM-DD
  weekEnd: string            // Sunday YYYY-MM-DD
  daysWithEntries: number    // How many of the 7 days had a journal entry
  totalPrecepts: number      // Total precept responses written
  totalMeditationMinutes: number
  daysWithMeditation: number
  averageRatings: {          // Per-precept averages for the week
    preceptNumber: number
    average: number          // 1-5 scale
    count: number            // How many days had a rating for this precept
  }[]
  topPrecepts: number[]      // Top 3 highest-rated precepts this week
  growthPrecepts: number[]   // Bottom 3 rated precepts (areas for growth)
  reflection: WeeklyReflection | null  // User's written reflection if any
}
```

**useWeeklySummary hook:**
```typescript
function useWeeklySummary(weekStart: string): {
  summary: WeeklySummary | null
  loading: boolean
  error: string | null
}
```

**Week boundaries:**
- Weeks start on Monday and end on Sunday (configurable in a future version)
- The "current week" is determined by the user's configured weekly reflection day setting
- Default weekly reflection day: Sunday

**Acceptance Criteria:**
- [ ] Summary correctly aggregates daily entries for a 7-day window
- [ ] Average ratings computed correctly (handle missing ratings gracefully)
- [ ] Top and growth precepts identified correctly
- [ ] Meditation totals accurate
- [ ] Works for partial weeks (e.g., first week of use with only 3 entries)
- [ ] Returns null for weeks with no entries
- [ ] TypeScript compiles without errors

### Task 7.2: Weekly Reflection Page

Build the WeeklyPage that shows the summary and guides the user through a weekly reflection.

**Files to modify:**
- `src/renderer/pages/WeeklyPage.tsx` - Replace placeholder

**Files to create:**
- `src/renderer/components/weekly/WeekSelector.tsx` - Navigate between weeks
- `src/renderer/components/weekly/WeekSummaryCard.tsx` - Visual summary
- `src/renderer/components/weekly/WeeklyPrompts.tsx` - Guided reflection questions
- `src/renderer/components/weekly/WeeklyReflectionForm.tsx` - Free-form writing area

**Page layout (top to bottom):**

1. **WeekSelector** - Shows "Week of Feb 10 - Feb 16" with left/right arrows to navigate weeks. Cannot navigate to future weeks.

2. **WeekSummaryCard** - Visual overview:
   ```
   ┌────────────────────────────────────────┐
   │  This Week                              │
   │                                         │
   │  5 of 7 days journaled                  │
   │  42 of 80 precepts reflected on         │
   │  95 meditation minutes across 4 days    │
   │                                         │
   │  Strongest practice:                    │
   │    • Truthful speech                    │
   │    • Affirming life                     │
   │    • Generosity                         │
   │                                         │
   │  Areas for attention:                   │
   │    • Clarity (intoxication)             │
   │    • Humility                           │
   │    • Not harboring ill will             │
   └────────────────────────────────────────┘
   ```

3. **WeeklyPrompts** - 2-3 guided reflection questions:
   - "Looking at this week as a whole, which precept felt most alive in your daily life?"
   - "Was there a recurring challenge or pattern you noticed across multiple days?"
   - "What's one small thing you'd like to bring more attention to next week?"
   (These are fixed prompts, not rotating.)

4. **WeeklyReflectionForm** - A single large textarea for free-form weekly reflection. Auto-saves like daily entries.

5. **Encouraging closing message** from the encouragement system.

**Acceptance Criteria:**
- [ ] Week selector navigates between past weeks
- [ ] Cannot navigate to future weeks
- [ ] Summary card displays all key metrics
- [ ] Strongest and growth precepts use the precept short names
- [ ] Weekly prompts displayed clearly
- [ ] Free-form reflection auto-saves
- [ ] Previous weeks' reflections load correctly when navigating back
- [ ] Empty weeks show a gentle "No entries this week" state
- [ ] Encouraging message appears at the bottom
- [ ] TypeScript compiles without errors

### Task 7.3: Weekly Reflection Notification

When the configured weekly reflection day arrives, show a subtle prompt on the TodayPage encouraging the user to visit the weekly reflection.

**Files to modify:**
- `src/renderer/pages/TodayPage.tsx` - Add weekly reflection nudge

**Files to create:**
- `src/renderer/components/journal/WeeklyNudge.tsx` - Banner/card linking to weekly page

**Behavior:**
- On the configured weekly reflection day (default Sunday), show a calm card above the daily journal:
  ```
  ┌─────────────────────────────────────────┐
  │  It's time for your weekly reflection.   │
  │  Take a moment to look back at the week. │
  │                            [Reflect →]   │
  └─────────────────────────────────────────┘
  ```
- The "Reflect" link navigates to `/weekly` for the current week
- Card can be dismissed for the day
- Only shows if the user hasn't completed a weekly reflection for this week yet

**Acceptance Criteria:**
- [ ] Nudge card appears on the correct day of the week
- [ ] Navigates to the weekly page for the current week
- [ ] Doesn't show if a weekly reflection already exists
- [ ] Can be dismissed
- [ ] Uses design system card and button components
- [ ] TypeScript compiles without errors
