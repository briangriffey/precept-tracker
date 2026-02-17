import { PageTransition } from '../components/layout/PageTransition';

export function WeeklyPage() {
  return (
    <PageTransition>
      <h1>Weekly</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>Weekly reflection</p>
    </PageTransition>
  );
}
