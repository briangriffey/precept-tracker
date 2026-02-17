# Phase 5: Daily Journal & Meditation Tracking

**dispatched_by: mayor**
**phase:** 5 of 10
**blocks:** Phase 6, Phase 7, Phase 8, Phase 9
**dependencies:** Phase 3, Phase 4

## Description

Build the core feature of the app: the daily journal entry page. Users reflect on the 16 precepts grouped by category (Three Refuges, Three Pure Precepts, Ten Grave Precepts), respond to practical prompts, rate their alignment, and log meditation practice. Entries auto-save as the user types. This is the heart of the application.

## Tasks

### Task 5.1: Precept Data Definitions

Define the 16 precepts as structured data, including their names, descriptions, group membership, and a pool of default practical prompts for each.

**Files to create:**
- `src/renderer/lib/precepts/definitions.ts` - Precept data
- `src/renderer/lib/precepts/types.ts` - Precept types
- `src/renderer/lib/precepts/index.ts` - Barrel export

**Types:**
```typescript
export type PreceptGroup = 'three-refuges' | 'three-pure-precepts' | 'ten-grave-precepts'

export interface PreceptDefinition {
  number: number           // 1-16
  group: PreceptGroup
  vow: string              // e.g., "I take refuge in Buddha"
  shortName: string        // e.g., "Refuge in Buddha"
  description: string      // 2-3 sentence description from the PRD
  defaultPrompts: string[] // Pool of 5+ practical daily prompts
}

export interface PreceptGroupDefinition {
  id: PreceptGroup
  name: string             // e.g., "The Three Refuges"
  description: string      // Group intro text from the PRD
  precepts: PreceptDefinition[]
}
```

**Prompt style guidelines (critical):**
Prompts must be practical and grounded in daily life - NOT abstract or philosophical. They should reference real situations: work, conversations, meals, commuting, family, errands, decisions.

**Example prompts per precept:**

**Precept 1 - I take refuge in Buddha (Trusting awakening is possible):**
- "Was there a moment today when you doubted your ability to grow or change? What happened?"
- "Did you notice yourself or someone else acting with genuine wisdom today? What did it look like?"
- "When did you feel most awake and present today?"
- "Was there a situation where you trusted your own capacity to handle something difficult?"
- "Did you catch yourself thinking 'I could never...' about something? What was it?"

**Precept 7 - I vow not to kill (Affirming life):**
- "How did you support or nurture life today - in your home, at work, or in passing?"
- "Did your words build someone up or diminish them today?"
- "Was there a moment where you chose care over convenience with another living being?"
- "Did you notice yourself dismissing or devaluing someone's experience today?"
- "How did you take care of your own vitality - rest, nourishment, movement?"

**Precept 10 - I vow not to lie (Truthful speech):**
- "Was there a moment today where you chose honesty even when it was uncomfortable?"
- "Did you catch yourself exaggerating or softening the truth? What was the situation?"
- "Were you honest with yourself about something you'd rather not face?"
- "Did you withhold something important from someone? Why?"
- "Was there a conversation where you said exactly what you meant, clearly and kindly?"

Create 5+ prompts for each of the 16 precepts following this same practical, daily-life style. All 16 precepts and their descriptions should come from the PRD's "The 16 Precepts" section.

**Acceptance Criteria:**
- [ ] All 16 precepts defined with vow, shortName, description, group, and 5+ prompts each
- [ ] Three groups defined with name and description text
- [ ] All prompts are practical, grounded in daily situations, and non-judgmental
- [ ] No abstract or philosophical prompts (e.g., NO "What does truth mean to you?")
- [ ] Types exported and importable
- [ ] At least 80 total prompts across all precepts (5 per precept minimum)
- [ ] TypeScript compiles without errors

### Task 5.2: Daily Entry Page - Layout & Structure

Build the TodayPage component. It shows today's date, the three precept groups as collapsible sections, and the meditation tracker at the bottom.

**Files to create/modify:**
- `src/renderer/pages/TodayPage.tsx` - Replace placeholder with real implementation
- `src/renderer/components/journal/DailyHeader.tsx` - Date display and greeting
- `src/renderer/components/journal/PreceptGroupSection.tsx` - Collapsible group wrapper
- `src/renderer/components/journal/PreceptCard.tsx` - Individual precept reflection card
- `src/renderer/components/journal/MeditationTracker.tsx` - Meditation section
- `src/renderer/components/journal/JournalProgress.tsx` - Completion progress indicator

**Page layout (top to bottom):**
1. **DailyHeader** - Today's date (formatted nicely, e.g., "Monday, February 16"), a brief encouraging greeting message
2. **JournalProgress** - Subtle progress bar or text showing "5 of 16 precepts reflected on"
3. **PreceptGroupSection: Three Refuges** (collapsible, contains PreceptCards 1-3)
4. **PreceptGroupSection: Three Pure Precepts** (collapsible, contains PreceptCards 4-6)
5. **PreceptGroupSection: Ten Grave Precepts** (collapsible, contains PreceptCards 7-16)
6. **MeditationTracker** - Toggle, minutes input, notes

**Acceptance Criteria:**
- [ ] Page loads today's entry (or creates a new one via `api.entry.getOrCreate`)
- [ ] Three collapsible sections render with correct precepts in each
- [ ] Each section shows its group name and description
- [ ] Sections expand/collapse with smooth animation (Collapsible component from Phase 2)
- [ ] Meditation tracker appears below precept sections
- [ ] Progress indicator updates as precepts are reflected on
- [ ] Page uses design system spacing and typography
- [ ] TypeScript compiles without errors

### Task 5.3: Precept Card Component

Build the individual precept reflection card. Each card shows the precept vow, a practical prompt, a text area for the response, and a rating.

**File:** `src/renderer/components/journal/PreceptCard.tsx`

**Card layout:**
```
┌─────────────────────────────────────────┐
│  7. I vow not to kill                    │  ← Precept number + vow
│                                          │
│  "How did you support or nurture life    │  ← Practical prompt (italic, muted)
│   today - in your home, at work, or      │
│   in passing?"                  [↻]      │  ← Refresh prompt button
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ Free-text response area          │   │  ← Textarea (auto-grow)
│  │                                  │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ○ ○ ○ ○ ○                              │  ← Rating circles (1-5)
└─────────────────────────────────────────┘
```

**Behavior:**
- Prompt is selected from the precept's prompt pool (rotation logic in Task 5.4)
- Refresh button [↻] picks a different prompt from the pool
- Textarea auto-grows as user types (min 2 rows, max ~8 rows)
- Rating uses the Rating component from Phase 2
- Changes call the auto-save hook (Task 5.5)

**Acceptance Criteria:**
- [ ] Card displays precept number, vow, and a practical prompt
- [ ] Prompt text is visually distinct (italic or lighter color)
- [ ] Refresh button swaps to a different prompt
- [ ] Textarea auto-grows with content
- [ ] Rating component works (click to set, click again to unset)
- [ ] Existing response and rating are loaded if returning to a previously started entry
- [ ] Card uses design system components (Card, Textarea, Rating)
- [ ] TypeScript compiles without errors

### Task 5.4: Prompt Rotation Logic

Build the logic that selects which prompt to show for each precept on a given day. Prompts should rotate daily and never repeat the same prompt two days in a row.

**Files to create:**
- `src/renderer/lib/precepts/prompt-rotation.ts`

**Logic:**
```typescript
// Use a deterministic hash based on date + precept number to select a prompt
// This ensures the same prompt shows all day, but changes the next day
function getPromptForDay(
  preceptNumber: number,
  date: string,             // YYYY-MM-DD
  prompts: string[],        // Available prompts (default + custom)
  previousPrompt?: string   // Yesterday's prompt (to avoid repeat)
): string
```

**Algorithm:**
1. Combine default prompts with any active custom prompts for this precept
2. Hash `date + preceptNumber` to get a deterministic index
3. If the selected prompt matches `previousPrompt`, pick the next one in the pool
4. Return the selected prompt

The refresh button should cycle to the next prompt in the pool (wrapping around), stored in component state only (not persisted until the response is saved).

**Acceptance Criteria:**
- [ ] Same prompt shows for the same precept on the same day (deterministic)
- [ ] Different prompts show on different days (rotation)
- [ ] Never shows the same prompt as the previous day for the same precept
- [ ] Refresh button cycles through available prompts
- [ ] Works with both default and custom prompts
- [ ] TypeScript compiles without errors

### Task 5.5: Auto-Save with Debouncing

Implement auto-save so the user never has to manually save. Responses should persist after 500ms of inactivity.

**Files to create:**
- `src/renderer/hooks/useAutoSave.ts`
- `src/renderer/hooks/useDailyEntry.ts` - Composite hook managing the full daily entry state

**useAutoSave hook:**
```typescript
// Debounces a save function by 500ms
// Calls save immediately on unmount (if pending)
function useAutoSave<T>(
  value: T,
  saveFn: (value: T) => Promise<void>,
  delay?: number  // default 500ms
): { saving: boolean }
```

**useDailyEntry hook:**
```typescript
// Manages loading, state, and auto-saving for a full daily entry
function useDailyEntry(date: string): {
  entry: DailyEntry | null
  loading: boolean
  saving: boolean
  updateResponse: (preceptNumber: number, response: string | null, rating: number | null, promptText: string) => void
  updateMeditation: (meditated: boolean, minutes: number, notes: string | null) => void
}
```

**Behavior:**
- On mount, calls `api.entry.getOrCreate(date)` to load or create the entry
- Each change updates local state immediately (responsive UI)
- Debounced save fires 500ms after the last change
- A subtle "Saving..." → "Saved" indicator shows in the header
- On page navigation (unmount), any pending save fires immediately

**Acceptance Criteria:**
- [ ] Typing in a precept response triggers a save after 500ms of inactivity
- [ ] Rapid typing only results in one save (proper debouncing)
- [ ] Rating changes trigger a save
- [ ] Meditation changes trigger a save
- [ ] Pending saves fire on page navigation
- [ ] Save status indicator works (idle → saving → saved)
- [ ] Loading state shows while fetching entry
- [ ] No data loss on rapid navigation between pages
- [ ] TypeScript compiles without errors

### Task 5.6: Meditation Tracker Component

Build the meditation tracking section that appears below the precept groups.

**File:** `src/renderer/components/journal/MeditationTracker.tsx`

**Layout:**
```
┌─────────────────────────────────────────┐
│  Meditation                              │
│                                          │
│  Did you meditate today?    [Toggle]     │
│                                          │
│  (When toggled on, these appear:)        │
│                                          │
│  Minutes: [___30___]                     │  ← Number input or slider
│                                          │
│  Notes (optional):                       │
│  ┌──────────────────────────────────┐   │
│  │                                  │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**Behavior:**
- Toggle defaults to off for new entries
- When toggled on, minutes input and notes field appear with smooth animation
- Minutes input: number field, min 0, step 5, with +/- buttons or a simple slider
- Notes: optional textarea for session reflections
- All changes auto-save via `useDailyEntry`

**Acceptance Criteria:**
- [ ] Toggle component works smoothly
- [ ] Minutes and notes fields appear/disappear with animation when toggled
- [ ] Minutes input accepts numbers and has reasonable bounds
- [ ] Notes field is optional and auto-grows
- [ ] State persists via auto-save
- [ ] Existing meditation data loads correctly when revisiting today's entry
- [ ] TypeScript compiles without errors
