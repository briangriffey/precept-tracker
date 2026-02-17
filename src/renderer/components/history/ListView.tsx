import React, { useState, useMemo } from 'react'
import { EntryPreviewCard } from './EntryPreviewCard'
import type { Entry, DailyEntry } from '../../../shared/types'

const PAGE_SIZE = 20

interface ListViewProps {
  entries: Entry[]
  entryDetails: Map<string, DailyEntry>
  searchQuery: string
}

export function ListView({ entries, entryDetails, searchQuery }: ListViewProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Entries already come sorted desc from the API
  const visibleEntries = useMemo(
    () => entries.slice(0, visibleCount),
    [entries, visibleCount]
  )

  const hasMore = visibleCount < entries.length

  if (entries.length === 0) {
    return (
      <div style={emptyStyle}>
        <p style={emptyTitleStyle}>No entries found</p>
        <p style={emptySubStyle}>
          {searchQuery
            ? 'Try adjusting your search or date range.'
            : 'Start journaling today to see your history here.'}
        </p>
      </div>
    )
  }

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
  }

  const loadMoreStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    padding: 'var(--spacing-md)',
  }

  const loadMoreBtnStyle: React.CSSProperties = {
    padding: '0.5rem 1.5rem',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-primary)',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-primary)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background-color 150ms ease',
  }

  return (
    <div style={listStyle}>
      {visibleEntries.map((entry) => {
        const detail = entryDetails.get(entry.date)
        if (!detail) return null

        return (
          <EntryPreviewCard
            key={entry.id}
            dailyEntry={detail}
            searchQuery={searchQuery}
          />
        )
      })}

      {hasMore && (
        <div style={loadMoreStyle}>
          <button
            style={loadMoreBtnStyle}
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            Load more ({entries.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  )
}

const emptyStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--spacing-2xl) var(--spacing-lg)',
  textAlign: 'center',
}

const emptyTitleStyle: React.CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-text-secondary)',
  marginBottom: 'var(--spacing-sm)',
}

const emptySubStyle: React.CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-muted)',
}
