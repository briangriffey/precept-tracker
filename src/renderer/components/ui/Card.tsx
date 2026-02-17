import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className, style }: CardProps) {
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-lg)',
    boxShadow: '0 1px 3px var(--color-shadow)',
    border: '1px solid var(--color-border-light)',
    ...style,
  };

  return (
    <div className={className} style={cardStyle}>
      {children}
    </div>
  );
}
