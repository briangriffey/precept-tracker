# Phase 10: Settings, Onboarding, Notifications & Export

**dispatched_by: mayor**
**phase:** 10 of 10
**blocks:** None (final phase)
**dependencies:** Phase 7, Phase 8, Phase 9

## Description

Build the remaining features that tie the app together: the settings page, first-launch onboarding flow, system notification reminders, journal export, and final packaging configuration. This is the integration and polish phase.

## Tasks

### Task 10.1: Settings Page

Build the SettingsPage with all user-configurable options.

**Files to modify:**
- `src/renderer/pages/SettingsPage.tsx` - Replace placeholder

**Files to create:**
- `src/renderer/hooks/useSettings.ts` - Hook for reading/writing settings

**Settings layout (sections):**

```
┌─────────────────────────────────────────┐
│  Settings                                │
│                                          │
│  Practice                                │
│  ─────────────────────────               │
│  Daily reminder time     [20:00 ▼]       │
│  Reminders enabled       [Toggle]        │
│  Weekly reflection day   [Sunday ▼]      │
│                                          │
│  Prompts                                 │
│  ─────────────────────────               │
│  [Customize prompts →]                   │
│    (links to PromptManager from Phase 6) │
│                                          │
│  Appearance                              │
│  ─────────────────────────               │
│  Theme                   [System ▼]      │
│    Options: Light, Dark, System          │
│                                          │
│  Data                                    │
│  ─────────────────────────               │
│  [Export journal →]                      │
│  Database location: ~/Library/.../       │
│                                          │
│  About                                   │
│  ─────────────────────────               │
│  Precept Tracker v1.0.0                  │
│  [Restart onboarding]                    │
└─────────────────────────────────────────┘
```

**useSettings hook:**
```typescript
function useSettings(): {
  settings: Record<string, string>
  loading: boolean
  getSetting: (key: string) => string | undefined
  setSetting: (key: string, value: string) => Promise<void>
}
```

**Acceptance Criteria:**
- [ ] All settings display with current values
- [ ] Changes persist immediately to SQLite
- [ ] Theme setting updates the active theme (integrate with useTheme from Phase 2)
- [ ] "System" theme option follows OS preference
- [ ] Customize prompts navigates to the PromptManager UI (from Phase 6)
- [ ] Database location shown (informational)
- [ ] App version shown
- [ ] Restart onboarding resets the onboarding_complete setting
- [ ] TypeScript compiles without errors

### Task 10.2: Onboarding Flow

Build the first-launch experience that welcomes the user and introduces the app.

**Files to create:**
- `src/renderer/components/onboarding/OnboardingFlow.tsx` - Multi-step flow container
- `src/renderer/components/onboarding/OnboardingStep.tsx` - Individual step component
- `src/renderer/components/onboarding/steps/WelcomeStep.tsx`
- `src/renderer/components/onboarding/steps/PreceptsIntroStep.tsx`
- `src/renderer/components/onboarding/steps/PracticeSetupStep.tsx`

**Flow (3 steps):**

**Step 1: Welcome**
- "Welcome to Precept Tracker"
- Brief explanation: "A daily journal for reflecting on the 16 Precepts of Soto Zen Buddhism. Each day, you'll be guided through practical questions about how you lived the precepts."
- "This isn't about perfection. It's about paying attention."
- [Continue] button

**Step 2: The Precepts**
- Brief overview of the three groups:
  - "The Three Refuges: Your foundation - Buddha, Dharma, Sangha"
  - "The Three Pure Precepts: Your compass - avoid harm, do good, serve all beings"
  - "The Ten Grave Precepts: Your daily practice - specific guidelines for awakened living"
- "Each day, you'll reflect on all sixteen through practical questions grounded in daily life."
- [Continue] button

**Step 3: Practice Setup**
- "When would you like to be reminded to reflect?"
- Time picker for daily reminder (default 8:00 PM)
- Toggle for enabling/disabling notifications
- "Which day would you like for your weekly reflection?"
- Day picker (default Sunday)
- [Begin Practice] button

**Behavior:**
- Shows on first launch (when `onboarding_complete` is `false`)
- Steps transition with smooth horizontal slide animation
- Settings from Step 3 are saved to the database
- On completion, sets `onboarding_complete` to `true` and navigates to `/today`
- Can be restarted from Settings

**Acceptance Criteria:**
- [ ] Onboarding shows on first launch
- [ ] Does NOT show on subsequent launches
- [ ] Three steps with smooth slide transitions
- [ ] Step 3 saves reminder time, notification toggle, and weekly day to settings
- [ ] "Begin Practice" navigates to the daily journal
- [ ] Can be re-triggered from Settings
- [ ] Skip button available on each step
- [ ] Visual design is calm and welcoming (generous whitespace, centered content)
- [ ] TypeScript compiles without errors

### Task 10.3: System Notifications

Implement daily reminder notifications using Electron's Notification API.

**Files to create:**
- `src/main/notifications/reminder.ts` - Notification scheduling logic

**Files to modify:**
- `src/main/main.ts` - Start notification scheduler on app ready

**Notification behavior:**
- Reads `reminder_time` and `reminder_enabled` settings from the database
- Schedules a system notification at the configured time each day
- Uses a simple interval check (every minute, check if it's notification time)
- Only fires if the app is running (Electron notifications require the app process)

**Notification content (rotating, warm messages):**
- "A few minutes of reflection can shift your whole evening."
- "Your journal is waiting whenever you're ready."
- "Time to sit with the precepts for a moment?"
- "A gentle reminder to check in with your practice today."
- "When you're ready, your daily reflection is here."

**On click:** Focus the app window and navigate to `/today`

**Acceptance Criteria:**
- [ ] Notification fires at the configured time
- [ ] Only fires when reminders are enabled
- [ ] Notification text is warm and inviting (not nagging)
- [ ] Clicking the notification focuses the app and shows the daily journal
- [ ] Notification does not fire if today's entry already has responses
- [ ] Settings changes (time, enabled) take effect without restarting the app
- [ ] TypeScript compiles without errors

### Task 10.4: Journal Export

Build the export feature that lets users save their journal entries as Markdown or JSON files.

**Files to create:**
- `src/main/ipc/export-handlers.ts` - Export IPC handlers
- `src/renderer/components/export/ExportDialog.tsx` - Export configuration UI

**Export dialog (accessible from Settings):**
```
┌─────────────────────────────────────────┐
│  Export Journal                           │
│                                          │
│  Date range:                             │
│    ○ All entries                          │
│    ○ Custom range:  [Feb 1] to [Feb 16]  │
│                                          │
│  Format:                                 │
│    ○ Markdown (.md)                      │
│    ○ JSON (.json)                        │
│                                          │
│  Include meditation data?  [Toggle: On]  │
│                                          │
│              [Cancel]  [Export]           │
└─────────────────────────────────────────┘
```

**Markdown export format:**
```markdown
# Precept Tracker Journal

## Monday, February 16, 2026

### The Three Refuges

**1. I take refuge in Buddha**
*Prompt: "Was there a moment today when you doubted your ability to grow?"*

Today I noticed that when I received critical feedback at work, my first
reaction was to shut down. But then I remembered...

Rating: ●●●●○ (4/5)

**2. I take refuge in Dharma**
...

### Meditation
- Meditated: Yes
- Duration: 30 minutes
- Notes: Sat with the breath. Mind was busy but settled after 10 minutes.

---

## Sunday, February 15, 2026
...
```

**JSON export format:**
```json
{
  "exportedAt": "2026-02-16T20:00:00Z",
  "entries": [
    {
      "date": "2026-02-16",
      "responses": [...],
      "meditation": {...}
    }
  ]
}
```

**IPC flow:**
1. Renderer sends export request with date range, format, and options
2. Main process queries the database
3. Main process formats the data
4. Main process opens a save dialog (`dialog.showSaveDialog`)
5. Main process writes the file
6. Main process returns success/failure to renderer

**Acceptance Criteria:**
- [ ] Export dialog renders with date range, format, and options
- [ ] Markdown export is human-readable and well-formatted
- [ ] JSON export includes all entry data
- [ ] File save dialog lets user choose destination
- [ ] Export handles large datasets (1000+ entries) without freezing
- [ ] Empty date ranges show a helpful message
- [ ] Success/error feedback shown to user
- [ ] TypeScript compiles without errors

### Task 10.5: Final Integration & Polish

Wire together any remaining loose ends, ensure all pages and features work together, and verify the full user flow from onboarding through daily use.

**Files to modify:** Various - this is an integration task.

**Checklist:**
- [ ] Onboarding → daily journal → weekly reflection flow works end-to-end
- [ ] Navigation between all pages is smooth with transitions
- [ ] Dark mode works correctly on ALL pages and components
- [ ] Auto-save works reliably across daily and weekly entries
- [ ] Streak calculation updates in real-time as entries are created
- [ ] All charts render with smooth animations on the trends page
- [ ] Export produces correct output for both formats
- [ ] Search works across the full history
- [ ] Calendar view correctly marks days with entries
- [ ] Notification fires at the correct time
- [ ] Settings changes take effect immediately
- [ ] App window title is "Precept Tracker"
- [ ] No console errors in production build
- [ ] TypeScript compiles with zero errors
- [ ] `npm run build` produces a working build
- [ ] `npm run package` produces a distributable app

### Task 10.6: Electron Packaging Configuration

Configure Electron Forge for distributing the app on macOS, Windows, and Linux.

**Files to modify:**
- `forge.config.ts` - Packaging and maker configuration
- `package.json` - App metadata

**Configuration:**
- App name: "Precept Tracker"
- App ID: "com.precepttracker.app"
- macOS: DMG maker
- Windows: Squirrel maker
- Linux: deb/rpm makers
- Icon: placeholder icon (can be replaced later with a proper design)
- File associations: none needed
- Auto-updater: not for v1 (out of scope)

**Acceptance Criteria:**
- [ ] `npm run make` produces distributable artifacts
- [ ] macOS DMG installs and launches correctly
- [ ] Windows installer works (if testable)
- [ ] Linux package installs (if testable)
- [ ] App metadata (name, version, description) correct in packaged app
- [ ] Native modules (better-sqlite3) work in packaged builds
- [ ] TypeScript compiles without errors
