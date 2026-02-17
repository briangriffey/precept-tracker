# PRD: Precept Tracker - Daily Zen Journal

## Introduction

Precept Tracker is an Electron desktop app for daily journaling centered around the 16 Precepts of Soto Zen Buddhism. Rather than a generic journal, it guides practitioners through practical, grounded reflection on how they lived the precepts each day. The app cultivates a calm, unhurried experience with smooth transitions and a muted visual palette. It also tracks meditation practice and provides weekly reflections to support sustained engagement with the precepts over time.

## Goals

- Provide a structured daily reflection practice grounded in the 16 Precepts of Soto Zen Buddhism
- Present precepts grouped by their three categories (Three Refuges, Three Pure Precepts, Ten Grave Precepts) for focused reflection
- Ask practical, life-applicable prompts rather than abstract philosophical questions
- Track daily meditation practice (minutes and completion)
- Offer encouraging, gentle feedback throughout the experience
- Provide weekly reflection summaries showing patterns and growth
- Display trends, streaks, and charts to support long-term practice
- Allow export of journal entries
- Support customizable reflection prompts
- Deliver a calm, distraction-free experience that feels like a sanctuary

## The 16 Precepts

The 16 Precepts are organized into three groups:

### The Three Refuges
Taking refuge is the fundamental act of becoming a Buddhist. You place yourself under the protection of, and commit yourself to, these three treasures.

**1. I take refuge in Buddha.**
On one level, this means the historical Buddha, Shakyamuni, who awakened and taught the path. But in Mahayana understanding, Buddha also means your own awakened nature, the capacity for enlightenment that's already present. Taking refuge in Buddha is trusting that awakening is possible—for the historical Buddha, for all beings, for you.

**2. I take refuge in Dharma.**
Dharma has multiple meanings: the Buddha's teachings, the truth those teachings point to, and reality itself. Taking refuge in Dharma means committing to the teachings as your guide and also trusting reality as it is, even when it's difficult. It's saying: I will align myself with what's true rather than with my preferences and delusions.

**3. I take refuge in Sangha.**
Sangha is the community of practitioners. Taking refuge in Sangha means recognizing you can't do this alone and committing to practice with others. It also means recognizing the interconnection of all beings—the sangha in its widest sense includes everyone.

### The Three Pure Precepts
These are the broadest ethical guidelines, sometimes called the three collective pure precepts. Everything else flows from them.

**4. I vow to refrain from all evil.**
This is the precept of restraint. You vow to stop doing harm—to others, to yourself, to the world. It acknowledges that your actions have consequences and that some actions cause suffering.

**5. I vow to do all good.**
This is the precept of active virtue. It's not enough to avoid harm; you also cultivate what's beneficial. Kindness, generosity, compassion, wisdom—these are to be actively developed, not just passively hoped for.

**6. I vow to save all beings.**
This is the bodhisattva vow, the heart of Mahayana Buddhism. You commit to awakening not just for yourself but for the benefit of all beings. It sounds impossibly ambitious, and it is—it's a vow you can never complete. But that's the point. It orients your life toward service rather than personal attainment.

### The Ten Grave Precepts
These are more specific ethical guidelines. In Soto Zen, they're understood not as commandments but as descriptions of how an awakened person naturally lives. They're also koans—each one opens into deeper investigation the more you sit with it.

**7. I vow not to kill.**
The precept of affirming life. This obviously means not murdering, but it extends into how you relate to all living things. How do you handle insects in your home? What do you eat? How do you speak about others—do your words kill their spirit or reputation? The precept invites continuous examination of how you support or diminish life.

**8. I vow not to steal.**
The precept of not taking what is not given. Beyond obvious theft, this includes taking more than your share, exploiting others' labor, wasting resources, taking credit for others' work. Positively, it points toward generosity and being satisfied with what you have.

**9. I vow not to misuse sexuality.**
The precept of respecting the body and intimate relationships. This means not causing harm through sexual conduct—no coercion, no betrayal of commitments, no using others for your gratification. More broadly, it's about bringing awareness and care to this powerful dimension of human life rather than acting out of compulsion.

**10. I vow not to lie.**
The precept of truthful speech. Beyond not telling outright lies, this includes not exaggerating, not omitting important truths, not using words to manipulate. It also means being honest with yourself—not hiding from uncomfortable realities behind comfortable stories.

**11. I vow not to intoxicate self or others.**
The precept of clarity. Traditionally this meant avoiding alcohol and drugs, but it extends to anything that clouds awareness or encourages escapism—excessive entertainment, compulsive consumption, even spiritual bypassing. The question is: what do you use to avoid being present with your life?

**12. I vow not to speak of the faults of others.**
The precept of not elevating oneself by criticizing others. Gossip, complaining about people behind their backs, dwelling on others' shortcomings—these actions harm both the person spoken about and the speaker. This doesn't mean you can't ever discuss problems or give honest feedback; it means watching the motivation. Are you speaking to help, or to make yourself feel superior?

**13. I vow not to praise myself while abusing others.**
The precept of humility. This is related to the previous one but focuses on the self-aggrandizing comparison. Putting others down to elevate yourself is a particularly toxic pattern. The precept invites you to notice when you're doing this, even subtly.

**14. I vow not to be possessive of anything.**
The precept of generosity. Clinging to possessions, status, relationships, ideas—all of this creates suffering. The precept doesn't mean you can't have things or care about people; it means holding them lightly, recognizing their impermanence, being willing to share and let go.

**15. I vow not to harbor ill will.**
The precept of loving-kindness. Anger arises—that's natural. But nursing resentment, cultivating hatred, holding grudges—these poison your own mind as much as they harm others. The practice is to feel anger when it arises and then let it move through rather than building a home for it.

**16. I vow not to disparage the Three Treasures.**
The precept of honoring Buddha, Dharma, and Sangha. This might seem like a loyalty oath, but it's subtler than that. Disparaging the Three Treasures includes dismissing your own capacity for awakening (Buddha), denying truth or deceiving yourself (Dharma), and separating yourself from others (Sangha). It's a vow to keep faith with the path.

## User Stories

### US-001: First Launch & Onboarding
**Description:** As a new user, I want a brief, welcoming introduction so that I understand how the app works and feel at ease.

**Acceptance Criteria:**
- [ ] First launch shows a 3-step onboarding flow explaining the app's purpose
- [ ] Onboarding briefly introduces the three precept groups
- [ ] User can set a preferred daily reflection time (used for reminders)
- [ ] Onboarding can be skipped and revisited from settings
- [ ] Smooth fade transitions between onboarding steps
- [ ] Typecheck/lint passes

### US-002: Daily Entry - Grouped Precept Reflection
**Description:** As a practitioner, I want to reflect on the 16 precepts grouped by category so I can focus my attention on each area of practice.

**Acceptance Criteria:**
- [ ] Daily entry screen shows three collapsible/expandable sections: Three Refuges, Three Pure Precepts, Ten Grave Precepts
- [ ] Each precept within a group displays its name, a brief description, and a practical prompt
- [ ] Prompts are grounded and applicable (e.g., "Was there a moment today where you chose honesty even when it was uncomfortable?" rather than "What does truth mean to you?")
- [ ] Each precept has a free-text response area
- [ ] User can rate each precept on a simple scale (e.g., 1-5 or a gentle visual like filled/unfilled circles)
- [ ] Progress indicator shows how many precepts have been reflected on
- [ ] Sections expand/collapse with smooth animation
- [ ] Entries auto-save as the user types (debounced)
- [ ] Typecheck/lint passes

### US-003: Practical Daily Prompts
**Description:** As a practitioner, I want prompts that connect precepts to real daily life so my reflections are grounded rather than theoretical.

**Acceptance Criteria:**
- [ ] Each precept has a pool of at least 5 rotating prompts
- [ ] Prompts reference common daily situations (work, relationships, errands, conversations, meals, commuting)
- [ ] Prompts rotate daily so the same prompt does not appear two days in a row
- [ ] Users can customize prompts (add, edit, remove) from settings
- [ ] A "refresh" button lets the user get a different prompt for any precept
- [ ] Typecheck/lint passes

### US-004: Encouraging Words
**Description:** As a practitioner, I want gentle encouragement throughout the app so I feel supported rather than judged.

**Acceptance Criteria:**
- [ ] A brief encouraging message appears when opening the app each day (rotating pool of messages)
- [ ] After completing a daily reflection, a warm closing message is shown
- [ ] Messages are non-judgmental and acknowledge that practice is a journey, not perfection
- [ ] Streak milestones (3 days, 7 days, 30 days, etc.) show a special encouraging message
- [ ] Encouragement never uses guilt or shame language
- [ ] Typecheck/lint passes

### US-005: Meditation Tracking
**Description:** As a practitioner, I want to log whether I meditated today and for how long so I can track my meditation habit.

**Acceptance Criteria:**
- [ ] Daily entry includes a "Did you meditate today?" toggle
- [ ] When toggled on, a minutes input field appears (number input or slider)
- [ ] Optional free-text field for notes about the meditation session
- [ ] Meditation data is stored alongside the daily journal entry
- [ ] Calendar or history view shows which days included meditation (visual indicator)
- [ ] Typecheck/lint passes

### US-006: Weekly Reflection
**Description:** As a practitioner, I want a weekly summary so I can see patterns in my practice and reflect on the week as a whole.

**Acceptance Criteria:**
- [ ] At the end of each week (configurable day, default Sunday), a weekly reflection prompt appears
- [ ] Weekly view shows a summary of which precepts were reflected on and average ratings per precept
- [ ] Total meditation minutes for the week are displayed
- [ ] Weekly reflection includes 2-3 guided questions about the week's practice
- [ ] User can write a free-form weekly reflection
- [ ] Encouraging summary message based on consistency (not perfection)
- [ ] Typecheck/lint passes

### US-007: Streaks & Trends Dashboard
**Description:** As a practitioner, I want to see my practice trends over time so I can stay motivated and notice growth.

**Acceptance Criteria:**
- [ ] Dashboard/home screen shows current streak (consecutive days with a journal entry)
- [ ] Line chart showing meditation minutes over the past 30/90 days
- [ ] Heat map or calendar view showing journal entry completion (similar to GitHub contribution graph)
- [ ] Bar chart showing average rating per precept over selected time period
- [ ] Trends are viewable for 7-day, 30-day, 90-day, and all-time ranges
- [ ] Charts animate smoothly on load
- [ ] Typecheck/lint passes

### US-008: Journal History & Search
**Description:** As a practitioner, I want to browse and search past entries so I can revisit previous reflections.

**Acceptance Criteria:**
- [ ] Calendar view allows navigating to any past date's entry
- [ ] List view shows entries in reverse chronological order with preview text
- [ ] Search by keyword across all journal entries
- [ ] Filter by date range
- [ ] Clicking an entry opens it in read mode; an edit button allows modifications
- [ ] Smooth page transitions between views
- [ ] Typecheck/lint passes

### US-009: Export Journal Entries
**Description:** As a practitioner, I want to export my journal entries so I can back up my reflections or use them elsewhere.

**Acceptance Criteria:**
- [ ] Export all entries or a selected date range
- [ ] Export formats: Markdown (.md) and JSON (.json)
- [ ] Exported Markdown is human-readable with dates, precept names, and responses
- [ ] Export includes meditation data
- [ ] File save dialog lets user choose destination
- [ ] Typecheck/lint passes

### US-010: Notification Reminders
**Description:** As a practitioner, I want to be reminded to journal so I can maintain a consistent practice.

**Acceptance Criteria:**
- [ ] System notification at user-configured time reminding them to reflect
- [ ] Notification text is warm and inviting, not nagging
- [ ] Notifications can be enabled/disabled from settings
- [ ] Clicking the notification opens the app to the daily entry
- [ ] Typecheck/lint passes

### US-011: Settings & Customization
**Description:** As a user, I want to configure the app to suit my practice so it feels personal.

**Acceptance Criteria:**
- [ ] Set daily reminder time
- [ ] Set weekly reflection day
- [ ] Customize prompts for each precept (add/edit/remove from prompt pool)
- [ ] Toggle notification reminders on/off
- [ ] Reset onboarding
- [ ] About section with app version
- [ ] All settings persist in local SQLite database
- [ ] Typecheck/lint passes

### US-012: Calm Visual Design & Transitions
**Description:** As a user, I want the app to feel calm and unhurried so that using it is itself a contemplative act.

**Acceptance Criteria:**
- [ ] Color palette uses muted, natural tones (e.g., warm whites, soft grays, muted sage/stone)
- [ ] Typography uses a clean sans-serif font (e.g., Inter, Source Sans, or similar)
- [ ] Page transitions use smooth fade or slide animations (200-400ms, ease-in-out)
- [ ] No jarring colors, flashing elements, or aggressive UI patterns
- [ ] Generous whitespace and padding throughout
- [ ] Dark mode support with equally calm dark palette
- [ ] Responsive layout that looks good at various window sizes
- [ ] Typecheck/lint passes

## Functional Requirements

- FR-1: The app must run as an Electron desktop application on macOS, Windows, and Linux
- FR-2: All data must be stored locally in a SQLite database (no cloud dependency)
- FR-3: The daily entry screen must present the 16 precepts in three collapsible groups: Three Refuges, Three Pure Precepts, and Ten Grave Precepts
- FR-4: Each precept must display a practical, rotating prompt drawn from a pool of at least 5 prompts per precept
- FR-5: Each precept must have a free-text response field and a 1-5 rating scale
- FR-6: Daily entries must auto-save with debounced writes (500ms after last keystroke)
- FR-7: The meditation tracker must include a toggle (meditated yes/no), a minutes field, and an optional notes field
- FR-8: The weekly reflection must appear on a configurable day and summarize the week's precept ratings, meditation totals, and journal consistency
- FR-9: The trends dashboard must show streak count, meditation chart (line), completion heat map, and precept rating averages (bar chart)
- FR-10: The app must display rotating encouraging messages on launch, after completing an entry, and at streak milestones
- FR-11: Users must be able to search past entries by keyword and filter by date range
- FR-12: Users must be able to export entries as Markdown or JSON for a selected date range or all time
- FR-13: The app must support system notifications for daily reminders at a user-configured time
- FR-14: Users must be able to customize prompts per precept (add, edit, delete from the prompt pool)
- FR-15: All page transitions must use smooth animations (fade/slide, 200-400ms)
- FR-16: The app must support both light and dark color modes with calm, muted palettes

## Non-Goals

- No cloud sync or multi-device support (v1 is local-only)
- No user accounts or authentication
- No social or sharing features
- No guided audio meditations or timers (this is a journal, not a meditation app)
- No mobile version (desktop Electron only for v1)
- No AI-generated reflections or responses
- No gamification beyond gentle streaks (no points, badges, or leaderboards)

## Design Considerations

### Color Palette (Light Mode)
- Background: warm white (#FAFAF8) or soft cream
- Surface/Cards: white (#FFFFFF) with subtle shadow
- Primary accent: muted sage green (#7C9082)
- Secondary accent: warm stone (#A89F91)
- Text primary: soft charcoal (#2D2D2D)
- Text secondary: warm gray (#6B6B6B)
- Rating/highlight: soft gold (#C4A962)

### Color Palette (Dark Mode)
- Background: deep charcoal (#1A1A1E)
- Surface/Cards: dark gray (#252529)
- Primary accent: muted sage (#8FA898)
- Text primary: soft white (#E8E8E4)
- Text secondary: muted gray (#9A9A9A)

### Typography
- Primary font: Inter or similar clean sans-serif
- Body: 16px, line-height 1.6
- Headings: light weight (300-400), generous letter-spacing

### Animation
- Page transitions: 300ms ease-in-out fade
- Section expand/collapse: 250ms ease-out
- Chart animations: 500ms ease-in-out on mount
- Micro-interactions: 150ms for buttons, toggles

### Layout
- Single-column centered layout (max-width ~720px) for journal content
- Sidebar navigation for main sections (Today, History, Trends, Settings)
- Generous padding (24-32px) and whitespace

## Technical Considerations

- **Electron** with electron-forge or electron-builder for packaging
- **React 18+** with TypeScript for the renderer process
- **SQLite** via better-sqlite3 (synchronous, fast, no native compilation issues with Electron) for local data persistence
- **React Router** for navigation between views
- **Recharts** or **Victory** for trend charts (both work well with React)
- **date-fns** for date manipulation
- **Framer Motion** for smooth animations and page transitions
- **electron-store** or SQLite for user settings
- **node-notifier** or Electron's native notification API for reminders
- IPC communication between main and renderer processes for database access
- Database schema should version with migrations for future updates

## Success Metrics

- User can complete a full daily reflection in under 10 minutes
- App launches to a usable state in under 2 seconds
- All animations run at 60fps with no jank
- Journal entries persist reliably across app restarts
- Weekly reflection accurately summarizes the week's data
- Export produces clean, readable Markdown files

## Open Questions

- Should the app include an optional meditation timer in a future version, or keep it purely as a journal?
- Should there be a way to import journal entries (e.g., from a previous export or another app)?
- Should the weekly reflection day be tied to a specific day or be based on 7 days from the first entry?
- Would practitioners benefit from a "precept of the day" focus mode that highlights one precept for deeper reflection?
