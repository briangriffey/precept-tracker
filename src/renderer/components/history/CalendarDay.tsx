import React, { useState } from 'react'

interface CalendarDayProps {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isFuture: boolean
  hasEntry: boolean
  hasMeditation: boolean
  onClick: (date: Date) => void
}

export function CalendarDay({
  date,
  isCurrentMonth,
  isToday,
  isFuture,
  hasEntry,
  hasMeditation,
  onClick,
}: CalendarDayProps) {
  const [hovered, setHovered] = useState(false)

  const dayNum = date.getDate()

  const cellStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
    padding: 'var(--spacing-sm)',
    minHeight: '3.5rem',
    borderRadius: 'var(--radius-md)',
    cursor: isFuture ? 'default' : 'pointer',
    opacity: !isCurrentMonth ? 0.3 : isFuture ? 0.4 : 1,
    backgroundColor: isToday
      ? 'var(--color-primary)'
      : hovered && !isFuture
        ? 'var(--color-surface-hover)'
        : 'transparent',
    transition: 'background-color 150ms ease',
    border: 'none',
    fontFamily: 'inherit',
    color: isToday ? '#FFFFFF' : 'var(--color-text)',
  }

  const numberStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    fontWeight: isToday ? 500 : 400,
    lineHeight: 1,
  }

  const dotsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.2rem',
    alignItems: 'center',
    height: '0.5rem',
  }

  const entryDotStyle: React.CSSProperties = {
    width: '0.375rem',
    height: '0.375rem',
    borderRadius: '50%',
    backgroundColor: isToday ? 'rgba(255,255,255,0.8)' : 'var(--color-primary)',
  }

  const meditationDotStyle: React.CSSProperties = {
    width: '0.25rem',
    height: '0.25rem',
    borderRadius: '50%',
    backgroundColor: isToday ? 'rgba(255,255,255,0.6)' : 'var(--color-accent)',
  }

  return (
    <button
      style={cellStyle}
      onClick={() => !isFuture && onClick(date)}
      disabled={isFuture}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={numberStyle}>{dayNum}</span>
      <div style={dotsStyle}>
        {hasEntry && <span style={entryDotStyle} />}
        {hasMeditation && <span style={meditationDotStyle} />}
      </div>
    </button>
  )
}
