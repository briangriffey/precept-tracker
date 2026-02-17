import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, id, style, ...props }: InputProps) {
  const [focused, setFocused] = React.useState(false);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    fontSize: 'var(--font-size-base)',
    lineHeight: 'var(--line-height)',
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-surface)',
    border: `1px solid ${focused ? 'var(--color-primary)' : 'var(--color-border)'}`,
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    transition: 'border-color 150ms ease',
    ...style,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 'var(--spacing-xs)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 400,
  };

  return (
    <div>
      {label && <label htmlFor={id} style={labelStyle}>{label}</label>}
      <input
        id={id}
        style={inputStyle}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        {...props}
      />
    </div>
  );
}
