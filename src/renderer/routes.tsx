import { createHashRouter, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { OnboardingGuard } from './components/onboarding/OnboardingGuard';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { TodayPage } from './pages/TodayPage';
import { HistoryPage } from './pages/HistoryPage';
import { EntryDetailPage } from './pages/EntryDetailPage';
import { TrendsPage } from './pages/TrendsPage';
import { WeeklyPage } from './pages/WeeklyPage';
import { SettingsPage } from './pages/SettingsPage';
import { PromptsPage } from './pages/PromptsPage';

export const router = createHashRouter([
  {
    path: '/onboarding',
    element: <OnboardingFlow />,
  },
  {
    path: '/',
    element: (
      <OnboardingGuard>
        <AppShell />
      </OnboardingGuard>
    ),
    children: [
      { index: true, element: <Navigate to="/today" replace /> },
      { path: 'today', element: <TodayPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'history/:date', element: <EntryDetailPage /> },
      { path: 'trends', element: <TrendsPage /> },
      { path: 'weekly', element: <WeeklyPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'settings/prompts', element: <PromptsPage /> },
    ],
  },
]);
