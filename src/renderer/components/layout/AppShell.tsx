import { Sidebar } from './Sidebar';
import { ContentArea } from './ContentArea';

export function AppShell() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <Sidebar />
      <ContentArea />
    </div>
  );
}
