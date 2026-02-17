import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';

interface NavItem {
  to: string;
  label: string;
  icon: string;
}

const mainNavItems: NavItem[] = [
  { to: '/today', label: 'Today', icon: '◯' },
  { to: '/history', label: 'History', icon: '☰' },
  { to: '/trends', label: 'Trends', icon: '△' },
  { to: '/weekly', label: 'Weekly', icon: '▢' },
];

const footerNavItems: NavItem[] = [
  { to: '/settings', label: 'Settings', icon: '⚙' },
];

const linkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  padding: 'var(--spacing-sm) var(--spacing-md)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--color-text-secondary)',
  textDecoration: 'none',
  fontSize: 'var(--font-size-base)',
  transition: 'background-color 150ms ease, color 150ms ease',
};

const activeLinkStyle: React.CSSProperties = {
  ...linkStyle,
  backgroundColor: 'var(--color-surface-hover)',
  color: 'var(--color-primary)',
};

export function Sidebar() {
  return (
    <aside
      style={{
        width: '240px',
        minWidth: '240px',
        height: '100vh',
        backgroundColor: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border-light)',
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--spacing-lg) var(--spacing-md)',
      }}
    >
      <div
        style={{
          marginBottom: 'var(--spacing-xl)',
          padding: '0 var(--spacing-md)',
        }}
      >
        <h2
          style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-text)',
            margin: 0,
          }}
        >
          Precept Tracker
        </h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', flex: 1 }}>
        {mainNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
          >
            <span style={{ fontSize: '1.1em', width: '1.5rem', textAlign: 'center' }}>
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div
        style={{
          borderTop: '1px solid var(--color-border-light)',
          paddingTop: 'var(--spacing-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-xs)',
        }}
      >
        {footerNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
          >
            <span style={{ fontSize: '1.1em', width: '1.5rem', textAlign: 'center' }}>
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}

        <div style={{ padding: 'var(--spacing-sm) var(--spacing-md)', marginTop: 'var(--spacing-xs)' }}>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
