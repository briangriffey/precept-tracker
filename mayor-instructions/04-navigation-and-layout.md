# Phase 4: Navigation & Layout Shell

**dispatched_by: mayor**
**phase:** 4 of 10
**blocks:** Phase 5
**dependencies:** Phase 2

## Description

Build the app shell: sidebar navigation, page routing, animated page transitions, and the overall layout structure. After this phase, the app has a navigable skeleton with smooth transitions between placeholder pages.

## Tasks

### Task 4.1: React Router Setup

Configure React Router for the app's main pages. Each page is a route that will be populated in later phases.

**Files to create/modify:**
- `src/renderer/App.tsx` - Add RouterProvider
- `src/renderer/routes.tsx` - Route definitions

**Routes:**
```
/              → redirect to /today
/today         → Daily journal entry (Phase 5)
/history       → Journal history & search (Phase 8)
/trends        → Trends dashboard (Phase 9)
/weekly        → Weekly reflection (Phase 7)
/settings      → Settings page (Phase 10)
```

**Placeholder pages to create:**
- `src/renderer/pages/TodayPage.tsx`
- `src/renderer/pages/HistoryPage.tsx`
- `src/renderer/pages/TrendsPage.tsx`
- `src/renderer/pages/WeeklyPage.tsx`
- `src/renderer/pages/SettingsPage.tsx`

Each placeholder page just renders its name as a heading using the design system typography.

**Acceptance Criteria:**
- [ ] All routes defined and navigable
- [ ] `/` redirects to `/today`
- [ ] Each route renders its placeholder page
- [ ] Browser back/forward navigation works
- [ ] TypeScript compiles without errors

### Task 4.2: App Shell Layout

Create the persistent layout shell with a sidebar and content area. The sidebar provides navigation; the content area renders the active page.

**Files to create:**
- `src/renderer/components/layout/AppShell.tsx` - Overall layout wrapper
- `src/renderer/components/layout/Sidebar.tsx` - Navigation sidebar
- `src/renderer/components/layout/ContentArea.tsx` - Main content wrapper

**Layout structure:**
```
┌──────────────────────────────────────────┐
│  Sidebar (240px)  │  Content Area         │
│                   │                       │
│  ○ Today          │  ┌─────────────────┐  │
│  ○ History        │  │                 │  │
│  ○ Trends         │  │  Page Content   │  │
│  ○ Weekly         │  │  (max 720px,    │  │
│                   │  │   centered)     │  │
│                   │  │                 │  │
│  ─────────        │  └─────────────────┘  │
│  ○ Settings       │                       │
│                   │                       │
│  [Theme Toggle]   │                       │
└──────────────────────────────────────────┘
```

**Sidebar specs:**
- Fixed width: 240px
- Background: `--color-surface`
- Border-right: `--color-border-light`
- Nav items: icon + label, vertical stack
- Active item: subtle primary color background highlight
- Settings at the bottom, separated by a thin divider
- Theme toggle at the very bottom
- Icons: simple, thin line style (can use Unicode or simple SVG)

**Content area specs:**
- Fills remaining width
- Content centered with max-width 720px
- Padding: 32px (spacing.xl)
- Scrollable independently from sidebar

**Acceptance Criteria:**
- [ ] Sidebar renders with all navigation items
- [ ] Active route is visually highlighted in sidebar
- [ ] Content area centers content at max-width 720px
- [ ] Sidebar is fixed (doesn't scroll with content)
- [ ] Content area scrolls independently
- [ ] Theme toggle integrated in sidebar footer
- [ ] Layout works at window sizes from 800px to 1920px wide
- [ ] Uses design system colors and spacing
- [ ] TypeScript compiles without errors

### Task 4.3: Animated Page Transitions

Add smooth page transitions using Framer Motion's AnimatePresence. Pages should fade in/out when navigating between routes.

**Files to modify:**
- `src/renderer/components/layout/ContentArea.tsx` - Wrap route outlet with AnimatePresence
- `src/renderer/components/layout/PageTransition.tsx` - Reusable transition wrapper

**PageTransition component:**
```typescript
// Wraps each page with enter/exit animations
// Uses design token: animation.pageFade (300ms, ease-in-out)
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
>
  {children}
</motion.div>
```

Each placeholder page should be wrapped in `<PageTransition>`.

**Acceptance Criteria:**
- [ ] Pages fade in when navigated to
- [ ] Pages fade out when navigated away from
- [ ] No layout shift during transitions
- [ ] Animation duration is 300ms
- [ ] Transitions feel smooth and calm, not jarring
- [ ] No flash of blank content between pages
- [ ] TypeScript compiles without errors
