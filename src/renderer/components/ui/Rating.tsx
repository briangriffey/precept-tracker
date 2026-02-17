import React from 'react';

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export function Rating({ value, onChange, max = 5 }: RatingProps) {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--spacing-sm)',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle} role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }, (_, i) => {
        const rating = i + 1;
        const filled = rating <= value;

        const circleStyle: React.CSSProperties = {
          width: '1.25rem',
          height: '1.25rem',
          borderRadius: 'var(--radius-full)',
          border: `2px solid ${filled ? 'var(--color-accent)' : 'var(--color-border)'}`,
          backgroundColor: filled ? 'var(--color-accent)' : 'transparent',
          cursor: 'pointer',
          transition: 'background-color 200ms ease, border-color 200ms ease, transform 150ms ease',
          transform: filled ? 'scale(1)' : 'scale(0.9)',
        };

        return (
          <button
            key={rating}
            type="button"
            role="radio"
            aria-checked={filled}
            aria-label={`${rating} of ${max}`}
            style={circleStyle}
            onClick={() => onChange(rating === value ? 0 : rating)}
          />
        );
      })}
    </div>
  );
}
