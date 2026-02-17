import React, { useState } from 'react'
import type { TimeRange } from '../../hooks/useTrendsData'

interface TimeRangeSelectorProps {
  value: TimeRange
  onChange: (range: TimeRange) => void
}

const options: { value: TimeRange; label: string }[] = [
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: '90d', label: '90 days' },
  { value: 'all', label: 'All time' },
]

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    gap: '0.25rem',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-full)',
    padding: '0.25rem',
    border: '1px solid var(--color-border-light)',
  }

  return (
    <div style={containerStyle}>
      {options.map((opt, i) => {
        const isActive = value === opt.value
        const isHovered = hoveredIndex === i && !isActive
        const pillStyle: React.CSSProperties = {
          padding: '0.375rem 0.875rem',
          borderRadius: 'var(--radius-full)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: isActive ? 500 : 400,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 150ms ease',
          backgroundColor: isActive
            ? 'var(--color-primary)'
            : isHovered
              ? 'var(--color-surface-hover)'
              : 'transparent',
          color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
        }
        return (
          <button
            key={opt.value}
            style={pillStyle}
            onClick={() => onChange(opt.value)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
