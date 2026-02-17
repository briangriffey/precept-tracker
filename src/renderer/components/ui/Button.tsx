import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-primary)',
    color: '#FFFFFF',
  },
  secondary: {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-text-secondary)',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '0.375rem 0.75rem', fontSize: 'var(--font-size-sm)' },
  md: { padding: '0.5rem 1rem', fontSize: 'var(--font-size-base)' },
  lg: { padding: '0.75rem 1.5rem', fontSize: 'var(--font-size-lg)' },
};

const hoverVariantMap: Record<ButtonVariant, string> = {
  primary: 'var(--color-primary-hover)',
  secondary: 'var(--color-surface-hover)',
  ghost: 'var(--color-surface-hover)',
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  style,
  onMouseEnter,
  onMouseLeave,
  children,
  ...props
}: ButtonProps) {
  const [hovered, setHovered] = React.useState(false);

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: 'var(--radius-md)',
    fontWeight: 400,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color 150ms ease, color 150ms ease, opacity 150ms ease',
    border: 'none',
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...(hovered && !disabled ? { backgroundColor: hoverVariantMap[variant] } : {}),
    ...style,
  };

  return (
    <button
      style={baseStyle}
      disabled={disabled}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      {...props}
    >
      {children}
    </button>
  );
}
