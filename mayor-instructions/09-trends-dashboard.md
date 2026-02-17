# Phase 9: Trends Dashboard

**dispatched_by: mayor**
**phase:** 9 of 10
**blocks:** Phase 10
**dependencies:** Phase 5

## Description

Build the trends dashboard that visualizes practice over time. Includes streak tracking, meditation minutes chart, journal completion heat map, and per-precept rating averages. Charts should animate smoothly and feel integrated with the app's calm aesthetic.

## Tasks

### Task 9.1: Trends Page Layout & Time Range Selector

Build the TrendsPage shell with a time range selector that controls all charts.

**Files to modify:**
- `src/renderer/pages/TrendsPage.tsx` - Replace placeholder

**Files to create:**
- `src/renderer/components/trends/TimeRangeSelector.tsx`
- `src/renderer/hooks/useTrendsData.ts`

**Time ranges:** 7 days, 30 days, 90 days, All time

**Page layout (top to bottom):**
1. Page title + time range selector (pill buttons)
2. Streak card (current + longest)
3. Meditation minutes line chart
4. Journal completion heat map
5. Per-precept average ratings bar chart

**useTrendsData hook:**
```typescript
function useTrendsData(range: '7d' | '30d' | '90d' | 'all'): {
  streak: StreakInfo
  meditationTrend: { date: string; minutes: number }[]
  completionMap: { date: string; count: number }[]
  averageRatings: { preceptNumber: number; average: number }[]
  loading: boolean
}
```

All data fetched via IPC from the stats repository (Phase 3).

**Acceptance Criteria:**
- [ ] Time range selector switches between 7d, 30d, 90d, all
- [ ] All chart data refetches when range changes
- [ ] Loading state while data fetches
- [ ] Page uses design system layout and spacing
- [ ] TypeScript compiles without errors

### Task 9.2: Streak Card

Display the current streak and longest streak prominently at the top of the dashboard.

**Files to create:**
- `src/renderer/components/trends/StreakCard.tsx`

**Layout:**
```
┌──────────────────────────────────────────┐
│                                           │
│  Current Streak        Longest Streak     │
│       12 days               34 days       │
│                                           │
│  Last entry: Today                        │
└──────────────────────────────────────────┘
```

**Styling:**
- Use the Card component from Phase 2
- Large numbers using light-weight heading font
- "days" label in muted text
- Current streak number uses `--color-primary` if active today, `--color-text-muted` if broken
- Subtle entrance animation (fade + scale from 0.95)

**Acceptance Criteria:**
- [ ] Current streak calculates consecutive days correctly
- [ ] Longest streak tracks all-time record
- [ ] Visual distinction between active and broken streak
- [ ] Last entry date shown
- [ ] Smooth entrance animation
- [ ] TypeScript compiles without errors

### Task 9.3: Meditation Minutes Chart

Build a line chart showing daily meditation minutes over the selected time range using Recharts.

**Files to create:**
- `src/renderer/components/trends/MeditationChart.tsx`

**Chart specs:**
- Line chart with filled area underneath
- X-axis: dates (formatted appropriately for the range: daily for 7d/30d, weekly aggregation for 90d/all)
- Y-axis: minutes
- Line color: `--color-primary`
- Area fill: primary color at 10% opacity
- Smooth curve (monotone interpolation)
- Tooltip on hover showing exact date and minutes
- Grid lines: very subtle (use `--color-border-light`)
- Animate on mount (500ms, ease-in-out)

**Recharts customization for calm aesthetic:**
- Remove default chart chrome (no heavy borders)
- Use design system font for axis labels
- Muted axis tick colors (`--color-text-muted`)
- Rounded tooltip card matching app Card style

**Acceptance Criteria:**
- [ ] Line chart renders correctly for all time ranges
- [ ] Area fill below the line
- [ ] Tooltip shows date and minutes on hover
- [ ] Chart animates smoothly on mount and when time range changes
- [ ] Visual style matches the calm app aesthetic (no default Recharts look)
- [ ] Handles empty data gracefully (show "No meditation data yet" message)
- [ ] Responsive to container width
- [ ] TypeScript compiles without errors

### Task 9.4: Journal Completion Heat Map

Build a GitHub-style contribution heat map showing journal entry completion density.

**Files to create:**
- `src/renderer/components/trends/CompletionHeatmap.tsx`

**Heat map specs:**
- Grid of small rounded squares, 7 rows (days of week) by N columns (weeks)
- Color intensity based on number of precepts reflected on that day (0-16 mapped to intensity)
- Empty (no entry): `--color-surface` or very light
- Partial (1-5 precepts): light primary at 20%
- Moderate (6-10 precepts): primary at 50%
- Good (11-15 precepts): primary at 75%
- Complete (16 precepts): full primary
- Tooltip on hover: "Feb 16: 12 of 16 precepts, 30 min meditation"
- Day-of-week labels on the left (M, W, F)
- Month labels above

**Acceptance Criteria:**
- [ ] Heat map renders correct grid for the selected time range
- [ ] Color intensity correctly maps to precept completion count
- [ ] Tooltip shows date, precept count, and meditation minutes
- [ ] Visual style is calm and integrated (subtle squares, not garish)
- [ ] Responsive to container width
- [ ] Handles empty periods correctly
- [ ] TypeScript compiles without errors

### Task 9.5: Per-Precept Rating Averages Chart

Build a horizontal bar chart showing the average rating for each precept over the selected time range.

**Files to create:**
- `src/renderer/components/trends/PreceptRatingsChart.tsx`

**Chart specs:**
- Horizontal bar chart (precept names on left, bars extending right)
- 16 bars, one per precept, ordered by precept number
- Grouped by precept group with subtle group labels/separators
- Bar color: `--color-primary`
- Bar length proportional to average rating (scale 0-5)
- Show the numeric average at the end of each bar
- Bars with no data shown as empty/gray
- Animate bars on mount (staggered, 30ms per bar)

**Grouping:**
```
The Three Refuges
  1. Refuge in Buddha          ████████░░  3.8
  2. Refuge in Dharma          ██████░░░░  3.1
  3. Refuge in Sangha          ████████░░  4.0

The Three Pure Precepts
  4. Refrain from evil         ██████████  4.5
  ...

The Ten Grave Precepts
  7. Affirm life               ████████░░  3.9
  ...
```

**Acceptance Criteria:**
- [ ] All 16 precepts shown with correct average ratings
- [ ] Bars grouped by precept group with labels
- [ ] Staggered entrance animation
- [ ] Numeric average displayed at bar end
- [ ] Empty/no-data precepts handled gracefully
- [ ] Responsive to container width
- [ ] Visual style matches the app aesthetic
- [ ] TypeScript compiles without errors
