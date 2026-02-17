export const colors = {
  light: {
    bg: '#FAFAF8',
    surface: '#FFFFFF',
    surfaceHover: '#F5F5F3',
    primary: '#7C9082',
    primaryHover: '#6B7F71',
    secondary: '#A89F91',
    secondaryHover: '#978E80',
    text: '#2D2D2D',
    textSecondary: '#6B6B6B',
    textMuted: '#9A9A9A',
    accent: '#C4A962',
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
} as const;

export type ThemeColors = typeof colors.light;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
} as const;

export const radius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const;

export const animation = {
  pageFade: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  sectionExpand: { duration: 0.25, ease: [0, 0, 0.2, 1] as const },
  chartMount: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  micro: { duration: 0.15, ease: [0.4, 0, 0.2, 1] as const },
} as const;
