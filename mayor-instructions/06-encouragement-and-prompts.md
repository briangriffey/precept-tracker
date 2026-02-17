# Phase 6: Encouragement System & Prompt Customization

**dispatched_by: mayor**
**phase:** 6 of 10
**blocks:** Phase 7
**dependencies:** Phase 5

## Description

Add the layer of warmth and encouragement that makes the app feel supportive rather than clinical. This includes rotating daily greetings, completion messages, streak milestone celebrations, and the ability for users to customize prompts per precept.

## Tasks

### Task 6.1: Encouraging Message Pools

Define pools of encouraging messages for different moments in the app. Messages should be warm, non-judgmental, and acknowledge that practice is a journey.

**Files to create:**
- `src/renderer/lib/encouragement/messages.ts` - Message pools
- `src/renderer/lib/encouragement/types.ts` - Types
- `src/renderer/lib/encouragement/index.ts` - Barrel export

**Message categories:**

**Daily greetings (shown in DailyHeader, rotating):**
At least 20 messages. Examples:
- "Welcome back. Today is a new opportunity to practice."
- "Every day you show up is a day of practice."
- "The precepts aren't about perfection. They're about paying attention."
- "You're here. That's already the first step."
- "A calm moment of reflection can change the texture of your whole day."
- "The path is made by walking. Welcome to today's step."
- "No judgment today - just honest looking."
- "Showing up to reflect is itself a form of practice."
- "Whatever today held, you can meet it with awareness now."
- "This is your time. There's no rush."

**Completion messages (shown after reflecting on all 16 precepts):**
At least 10 messages. Examples:
- "You've reflected on all sixteen precepts today. That takes real dedication."
- "A full reflection - well done. Let the insights settle."
- "All precepts considered. Now carry this awareness gently into tomorrow."
- "Complete. Remember, the reflection continues in how you live the rest of the day."

**Partial completion messages (shown when some but not all precepts reflected on):**
At least 10 messages. Examples:
- "Every precept you reflect on matters. There's no need to do them all."
- "Even reflecting on one precept is a valuable practice."
- "You showed up today. That counts."

**Streak milestone messages (3, 7, 14, 21, 30, 60, 90, 180, 365 days):**
One unique message per milestone. Examples:
- 3 days: "Three days in a row. A habit begins with consistency like this."
- 7 days: "A full week of practice. You're building something meaningful."
- 30 days: "Thirty days. This is no longer something you're trying - it's something you do."
- 365 days: "A year of daily practice. The precepts are woven into the rhythm of your life now."

**Important:** Messages must NEVER use guilt, shame, or pressure language. No "you should," "you failed to," "don't forget to." Always affirming, always gentle.

**Acceptance Criteria:**
- [ ] At least 20 daily greetings
- [ ] At least 10 completion messages
- [ ] At least 10 partial completion messages
- [ ] Unique milestone message for each streak milestone
- [ ] No guilt, shame, or pressure language in any message
- [ ] All messages are warm, genuine, and non-cliched
- [ ] TypeScript compiles without errors

### Task 6.2: Message Selection Logic

Build the logic that selects which encouraging message to show and when.

**Files to create:**
- `src/renderer/lib/encouragement/selector.ts`

**Functions:**
```typescript
// Select a daily greeting (rotates, deterministic per date)
function getDailyGreeting(date: string): string

// Select a completion/partial message based on reflection count
function getCompletionMessage(reflectedCount: number, totalCount: number): string

// Check if today's streak hits a milestone and return the message
function getStreakMilestoneMessage(currentStreak: number): string | null
```

**Selection logic:**
- Daily greeting uses date-based hash for deterministic daily rotation
- Completion vs. partial message is chosen based on count (16 = complete, <16 = partial)
- Streak milestones only trigger once per milestone (store in settings which milestones have been shown)

**Acceptance Criteria:**
- [ ] Same greeting shows for the same date all day
- [ ] Different greetings show on different days
- [ ] Correct message type chosen based on reflection count
- [ ] Streak milestones trigger at the right numbers
- [ ] Each milestone only triggers once (not every time the app opens on that streak day)
- [ ] TypeScript compiles without errors

### Task 6.3: Integrate Encouragement into Journal Flow

Wire the encouraging messages into the daily journal page and add a completion overlay.

**Files to modify:**
- `src/renderer/components/journal/DailyHeader.tsx` - Show daily greeting
- `src/renderer/pages/TodayPage.tsx` - Show completion message when all 16 reflected on

**Files to create:**
- `src/renderer/components/journal/CompletionMessage.tsx` - Gentle completion overlay/card
- `src/renderer/components/journal/StreakMilestone.tsx` - Milestone celebration component

**CompletionMessage:**
- Appears as a calm card at the top of the page (not a modal - not intrusive)
- Fades in with a smooth animation
- Shows the completion message text
- Can be dismissed (fades out)

**StreakMilestone:**
- Shows as a subtle banner/toast when a milestone is reached
- Warm background (soft gold accent)
- Auto-dismisses after 8 seconds, or can be manually dismissed
- Animates in/out with Framer Motion

**Acceptance Criteria:**
- [ ] Daily greeting appears in the header area
- [ ] Completion card appears when all 16 precepts have a response or rating
- [ ] Completion card uses smooth fade-in animation
- [ ] Streak milestone shows on the appropriate days
- [ ] All components use design system styling
- [ ] Nothing is intrusive or modal-blocking
- [ ] TypeScript compiles without errors

### Task 6.4: Prompt Customization

Allow users to add, edit, and remove custom prompts for each precept. Custom prompts are mixed into the rotation pool alongside defaults.

**Files to create:**
- `src/renderer/components/prompts/PromptManager.tsx` - UI for managing custom prompts
- `src/renderer/hooks/useCustomPrompts.ts` - Hook for CRUD operations on custom prompts

**PromptManager layout (used within Settings page, Phase 10):**
```
Select a precept: [Dropdown: 1. I take refuge in Buddha ▼]

Default prompts (read-only):
  • "Was there a moment today when you doubted..."
  • "Did you notice yourself or someone else..."
  • ...

Your custom prompts:
  • "My custom prompt here"  [Edit] [Delete]
  • "Another custom prompt"  [Edit] [Delete]

[+ Add custom prompt]
```

**useCustomPrompts hook:**
```typescript
function useCustomPrompts(preceptNumber: number): {
  defaultPrompts: string[]
  customPrompts: CustomPrompt[]
  allActivePrompts: string[]  // defaults + active customs, combined
  addPrompt: (text: string) => Promise<void>
  updatePrompt: (id: number, text: string) => Promise<void>
  deletePrompt: (id: number) => Promise<void>
}
```

**Acceptance Criteria:**
- [ ] User can view default prompts for any precept (read-only)
- [ ] User can add a new custom prompt for any precept
- [ ] User can edit an existing custom prompt
- [ ] User can delete a custom prompt
- [ ] Custom prompts are stored in SQLite via the IPC bridge
- [ ] Custom prompts appear in the rotation pool for daily reflection
- [ ] TypeScript compiles without errors
