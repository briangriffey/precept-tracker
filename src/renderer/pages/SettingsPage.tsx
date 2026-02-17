import { PageTransition } from '../components/layout/PageTransition';

export function SettingsPage() {
  return (
    <PageTransition>
      <h1>Settings</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>App settings</p>
    </PageTransition>
  );
}
