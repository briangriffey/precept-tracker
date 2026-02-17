import { PageTransition } from '../components/layout/PageTransition';

export function HistoryPage() {
  return (
    <PageTransition>
      <h1>History</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>Journal history &amp; search</p>
    </PageTransition>
  );
}
