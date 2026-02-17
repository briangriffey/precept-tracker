import React, { useRef } from 'react'

interface HistoryHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  view: 'calendar' | 'list'
  onViewChange: (view: 'calendar' | 'list') => void
  dateRange: { start: string; end: string }
  onDateRangeChange: (range: { start: string; end: string }) => void
}

export function HistoryHeader({
  searchQuery,
  onSearchChange,
  view,
  onViewChange,
  dateRange,
  onDateRangeChange,
}: HistoryHeaderProps) {
  const startRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLInputElement>(null)

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
  }

  const searchStyle: React.CSSProperties = {
    position: 'relative',
  }

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-text-muted)',
    fontSize: 'var(--font-size-sm)',
    pointerEvents: 'none',
  }

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem 0.75rem 0.625rem 2.25rem',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    transition: 'border-color 150ms ease',
    boxSizing: 'border-box',
  }

  const controlsRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--spacing-md)',
  }

  const toggleGroupStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
  }

  const toggleBtnBase: React.CSSProperties = {
    padding: '0.375rem 0.875rem',
    fontSize: 'var(--font-size-sm)',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 150ms ease, color 150ms ease',
    fontFamily: 'inherit',
  }

  const dateRangeStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  }

  const dateInputStyle: React.CSSProperties = {
    padding: '0.25rem 0.5rem',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'inherit',
    outline: 'none',
  }

  return (
    <div style={containerStyle}>
      <div style={searchStyle}>
        <span style={searchIconStyle}>&#128269;</span>
        <input
          type="text"
          placeholder="Search entries..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={searchInputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-primary)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)'
          }}
        />
      </div>

      <div style={controlsRowStyle}>
        <div style={toggleGroupStyle}>
          <button
            style={{
              ...toggleBtnBase,
              backgroundColor:
                view === 'calendar' ? 'var(--color-primary)' : 'transparent',
              color: view === 'calendar' ? '#FFFFFF' : 'var(--color-text-secondary)',
            }}
            onClick={() => onViewChange('calendar')}
          >
            Calendar
          </button>
          <button
            style={{
              ...toggleBtnBase,
              backgroundColor:
                view === 'list' ? 'var(--color-primary)' : 'transparent',
              color: view === 'list' ? '#FFFFFF' : 'var(--color-text-secondary)',
            }}
            onClick={() => onViewChange('list')}
          >
            List
          </button>
        </div>

        <div style={dateRangeStyle}>
          <input
            ref={startRef}
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              onDateRangeChange({ ...dateRange, start: e.target.value })
            }
            style={dateInputStyle}
          />
          <span>&ndash;</span>
          <input
            ref={endRef}
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              onDateRangeChange({ ...dateRange, end: e.target.value })
            }
            style={dateInputStyle}
          />
        </div>
      </div>
    </div>
  )
}
