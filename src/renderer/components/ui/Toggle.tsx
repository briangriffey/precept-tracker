import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, disabled = false }: ToggleProps) {
  const trackStyle: React.CSSProperties = {
    position: 'relative',
    width: '2.5rem',
    height: '1.375rem',
    backgroundColor: checked ? 'var(--color-primary)' : 'var(--color-border)',
    borderRadius: 'var(--radius-full)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color 150ms ease',
    flexShrink: 0,
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    top: '2px',
    left: checked ? '1.25rem' : '2px',
    width: '1.125rem',
    height: '1.125rem',
    backgroundColor: '#FFFFFF',
    borderRadius: 'var(--radius-full)',
    transition: 'left 150ms ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
  };

  return (
    <label style={containerStyle}>
      <div
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        style={trackStyle}
        onClick={() => !disabled && onChange(!checked)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onChange(!checked);
          }
        }}
      >
        <div style={thumbStyle} />
      </div>
      {label && <span style={labelStyle}>{label}</span>}
    </label>
  );
}
