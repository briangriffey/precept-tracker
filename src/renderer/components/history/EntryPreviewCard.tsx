import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { DailyEntry } from '../../../shared/types'

interface EntryPreviewCardProps {
  dailyEntry: DailyEntry
  searchQuery?: string
}

function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00') // Avoid timezone shifting
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function highlightText(
  text: string,
  query: string
): React.ReactNode {
  if (!query.trim()) return text

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        style={{
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-text)',
          borderRadius: '2px',
          padding: '0 2px',
        }}
      >
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export function EntryPreviewCard({ dailyEntry, searchQuery }: EntryPreviewCardProps) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const { entry, responses, meditation } = dailyEntry

  const preceptCount = responses.filter(
    (r) => r.response !== null && r.response.trim() !== ''
  ).length

  const firstResponse = responses.find(
    (r) => r.response !== null && r.response.trim() !== ''
  )
  const previewText = firstResponse?.response?.slice(0, 120) ?? ''

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-lg)',
    boxShadow: '0 1px 3px var(--color-shadow)',
    border: `1px solid ${hovered ? 'var(--color-primary)' : 'var(--color-border-light)'}`,
    cursor: 'pointer',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
    ...(hovered ? { boxShadow: '0 2px 8px var(--color-shadow)' } : {}),
  }

  const dateStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-base)',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: 'var(--spacing-sm)',
  }

  const metaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--spacing-sm)',
  }

  const dotSep: React.CSSProperties = {
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-text-muted)',
  }

  const previewStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height)',
    fontStyle: 'italic',
  }

  return (
    <div
      style={cardStyle}
      onClick={() => navigate(`/history/${entry.date}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/history/${entry.date}`)
      }}
    >
      <div style={dateStyle}>{formatDisplayDate(entry.date)}</div>
      <div style={metaStyle}>
        <span>
          {preceptCount} precept{preceptCount !== 1 ? 's' : ''} reflected on
        </span>
        {meditation && meditation.meditated && (
          <>
            <span style={dotSep} />
            <span>{meditation.minutes} min meditation</span>
          </>
        )}
      </div>
      {previewText && (
        <div style={previewStyle}>
          &ldquo;{searchQuery ? highlightText(previewText, searchQuery) : previewText}
          {previewText.length >= 120 ? '...' : ''}&rdquo;
        </div>
      )}
    </div>
  )
}
