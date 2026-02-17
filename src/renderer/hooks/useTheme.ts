import { useState, useEffect, useCallback } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'precept-tracker-theme';

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredPreference(): ThemePreference {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  return 'system';
}

function resolve(preference: ThemePreference): ResolvedTheme {
  return preference === 'system' ? getSystemTheme() : preference;
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(getStoredPreference);
  const [theme, setTheme] = useState<ResolvedTheme>(() => resolve(preference));

  // Apply resolved theme to the DOM
  useEffect(() => {
    const resolved = resolve(preference);
    setTheme(resolved);
    document.documentElement.setAttribute('data-theme', resolved);
    localStorage.setItem(STORAGE_KEY, preference);
  }, [preference]);

  // Listen for OS theme changes when preference is 'system'
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (preference === 'system') {
        const resolved = e.matches ? 'dark' : 'light';
        setTheme(resolved);
        document.documentElement.setAttribute('data-theme', resolved);
      }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [preference]);

  const setThemePreference = useCallback((pref: ThemePreference) => {
    setPreference(pref);
  }, []);

  const toggleTheme = useCallback(() => {
    setPreference((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'light';
      // system -> toggle to opposite of current resolved
      return getSystemTheme() === 'dark' ? 'light' : 'dark';
    });
  }, []);

  return { theme, preference, toggleTheme, setThemePreference } as const;
}
