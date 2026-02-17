import { PageTransition } from '../components/layout/PageTransition';

export function TodayPage() {
  return (
    <PageTransition>
      <h1>Today</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>Daily journal entry</p>
    </PageTransition>
  );
}
