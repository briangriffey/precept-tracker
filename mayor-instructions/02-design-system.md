# Phase 2: Design System & Theming

**dispatched_by: mayor**
**phase:** 2 of 10
**blocks:** Phase 4
**dependencies:** Phase 1

## Description

Establish the visual foundation of the app. The entire aesthetic should feel like a calm, contemplative space - muted natural tones, clean typography, generous whitespace, smooth animations. This phase creates the design tokens, theme system (light + dark), base CSS, and reusable UI primitives that every other phase will use.

## Tasks

### Task 2.1: Design Tokens & CSS Custom Properties

Define the complete design token system as TypeScript constants and CSS custom properties. These are the single source of truth for all visual decisions.

**Files to create:**
- `src/renderer/lib/design/tokens.ts` - TypeScript design tokens
- `src/renderer/lib/design/theme.css` - CSS custom properties for both themes

**Token definitions:**

```typescript
// tokens.ts
export const colors = {
  light: {
    bg: '#FAFAF8',
    surface: '#FFFFFF',
    surfaceHover: '#F5F5F3',
    primary: '#7C9082',       // muted sage green
    primaryHover: '#6B7F71',
    secondary: '#A89F91',     // warm stone
    secondaryHover: '#978E80',
    text: '#2D2D2D',          // soft charcoal
    textSecondary: '#6B6B6B', // warm gray
    textMuted: '#9A9A9A',
    accent: '#C4A962',        // soft gold (ratings)
    border: '#E8E5E0',
    borderLight: '#F0EDE8',
    shadow: 'rgba(0, 0, 0, 0.06)',
  },
  dark: {
    bg: '#1A1A1E',
    surface: '#252529',
    surfaceHover: '#2E2E33',
    primary: '#8FA898',
    primaryHover: '#A0B9A9',
    secondary: '#A89F91',
    secondaryHover: '#B8AFA1',
    text: '#E8E8E4',
    textSecondary: '#9A9A9A',
    textMuted: '#6B6B6B',
    accent: '#C4A962',
    border: '#3A3A40',
    borderLight: '#2E2E33',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
}

export const spacing = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
}

export const radius = {
  sm: '0.375rem',  // 6px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  full: '9999px',
}

export const animation = {
  pageFade: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  sectionExpand: { duration: 0.25, ease: [0, 0, 0.2, 1] },
  chartMount: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  micro: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
}
```

**CSS custom properties (theme.css):**
```css
:root {
  /* Light theme (default) */
  --color-bg: #FAFAF8;
  --color-surface: #FFFFFF;
  /* ... all light colors ... */
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --line-height: 1.6;
}

[data-theme="dark"] {
  --color-bg: #1A1A1E;
  --color-surface: #252529;
  /* ... all dark colors ... */
}
```

**Acceptance Criteria:**
- [ ] TypeScript tokens file exports typed color, spacing, radius, and animation objects
- [ ] CSS custom properties defined for light and dark themes
- [ ] Theme switching works via `data-theme` attribute on `<html>`
- [ ] All values match the PRD color specifications
- [ ] TypeScript compiles without errors

### Task 2.2: Typography & Font Setup

Install and configure the Inter font. Set up base typography styles that create the calm, crisp feel described in the PRD.

**Files to create/modify:**
- `src/renderer/lib/design/typography.css` - Typography base styles
- `src/renderer/assets/fonts/` - Inter font files (or use Google Fonts CDN)

**Typography rules:**
- Body text: Inter 400 (Regular), 16px, line-height 1.6
- Headings: Inter 300 (Light), generous letter-spacing (0.02em)
- h1: 2rem, h2: 1.5rem, h3: 1.25rem
- Small/caption text: 0.875rem
- All text uses `--color-text` or `--color-text-secondary` from theme
- No bold headings - use light weight and size contrast instead (this contributes to the calm feel)

**Acceptance Criteria:**
- [ ] Inter font loaded (either bundled or from CDN)
- [ ] Base typography styles applied globally
- [ ] Headings use light weight (300) with letter-spacing
- [ ] Body text is readable at 16px with 1.6 line-height
- [ ] Text colors respect the active theme (light/dark)
- [ ] No FOUT (flash of unstyled text) on app launch
- [ ] TypeScript compiles without errors

### Task 2.3: Base CSS & Global Styles

Set up the global CSS reset, base styles, and utility classes. Import the theme and typography CSS files into the app's entry point.

**Files to create/modify:**
- `src/renderer/lib/design/global.css` - CSS reset and base styles
- `src/renderer/main.tsx` - Import CSS files

**Global styles should include:**
- CSS reset (box-sizing, margin removal, etc.)
- `body` uses `--color-bg` background and `--color-text` color
- Smooth scrolling behavior
- Selection color using primary accent
- Focus ring styles using primary color
- Scrollbar styling (thin, muted, minimal)
- `*` transition on `background-color` and `color` (for theme switching)

**Acceptance Criteria:**
- [ ] Global CSS reset applied
- [ ] Body background and text color use CSS custom properties
- [ ] Theme switching (light/dark) transitions smoothly
- [ ] Scrollbars styled to be minimal and calm
- [ ] Focus states visible but not jarring
- [ ] All CSS imported in correct order in main.tsx
- [ ] TypeScript compiles without errors

### Task 2.4: Base UI Components

Create the foundational, reusable UI components that every page will use. Keep them simple, well-typed, and styled with the design tokens.

**Files to create:**
- `src/renderer/components/ui/Button.tsx`
- `src/renderer/components/ui/Card.tsx`
- `src/renderer/components/ui/Input.tsx`
- `src/renderer/components/ui/Textarea.tsx`
- `src/renderer/components/ui/Toggle.tsx`
- `src/renderer/components/ui/Rating.tsx`
- `src/renderer/components/ui/Collapsible.tsx`
- `src/renderer/components/ui/index.ts` - Re-export barrel

**Component specifications:**

**Button:**
- Variants: `primary`, `secondary`, `ghost`
- Sizes: `sm`, `md`, `lg`
- Styled with design tokens, subtle hover transitions (150ms)
- Props: variant, size, disabled, onClick, children

**Card:**
- Soft background (`--color-surface`), subtle shadow, rounded corners (radius.lg)
- Generous padding (spacing.lg)
- Props: children, className

**Input / Textarea:**
- Clean border using `--color-border`, focused border using `--color-primary`
- Calm focus transition (no hard outline, just border color change)
- Textarea should auto-grow or have a comfortable min-height
- Props: standard HTML input/textarea props + label

**Toggle:**
- Smooth sliding animation (150ms)
- Off: muted gray track. On: primary green track
- Props: checked, onChange, label

**Rating:**
- 5 circles (not stars - circles are calmer)
- Empty: `--color-border`. Filled: `--color-accent` (soft gold)
- Click to set rating. Smooth fill animation.
- Props: value (1-5), onChange

**Collapsible:**
- Smooth expand/collapse animation (250ms ease-out) using Framer Motion
- Header is always visible with a subtle chevron indicator
- Props: title, defaultOpen, children

**Acceptance Criteria:**
- [ ] All 7 components created with TypeScript interfaces for props
- [ ] Components use CSS custom properties (theme-aware)
- [ ] Animations use Framer Motion with durations from design tokens
- [ ] All components render correctly in both light and dark themes
- [ ] Toggle, Rating, and Collapsible have smooth animations
- [ ] Barrel export file re-exports all components
- [ ] TypeScript compiles without errors

### Task 2.5: Theme Toggle Component

Create a component that switches between light and dark mode. Store the preference in localStorage (will later migrate to SQLite via settings).

**Files to create:**
- `src/renderer/components/ThemeToggle.tsx`
- `src/renderer/hooks/useTheme.ts`

**useTheme hook:**
- Reads initial preference from localStorage (key: `precept-tracker-theme`)
- Falls back to system preference via `prefers-color-scheme` media query
- Sets `data-theme` attribute on `<html>` element
- Returns `{ theme, toggleTheme }` where theme is `'light' | 'dark'`

**ThemeToggle component:**
- Uses a sun/moon icon (can be simple SVG or Unicode)
- Smooth icon crossfade transition
- Placed in the sidebar or app header (will be integrated in Phase 4)

**Acceptance Criteria:**
- [ ] Theme persists across app restarts (via localStorage)
- [ ] Falls back to system preference on first launch
- [ ] Toggle transitions smoothly between themes
- [ ] All existing components correctly respond to theme change
- [ ] TypeScript compiles without errors
