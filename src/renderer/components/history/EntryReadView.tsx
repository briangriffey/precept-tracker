import React from 'react'
import { preceptGroups, getPreceptByNumber } from '../../lib/precepts'
import type { DailyEntry } from '../../../shared/types'

interface EntryReadViewProps {
  dailyEntry: DailyEntry
}

export function EntryReadView({ dailyEntry }: EntryReadViewProps) {
  const { responses, meditation } = dailyEntry

  // Build a map of preceptNumber → response for quick lookup
  const responseMap = new Map(
    responses.map((r) => [r.preceptNumber, r])
  )

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xl)',
  }

  const groupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
  }

  const groupTitleStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 500,
    color: 'var(--color-text)',
    paddingBottom: 'var(--spacing-xs)',
    borderBottom: '1px solid var(--color-border-light)',
  }

  const preceptCardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-lg)',
    border: '1px solid var(--color-border-light)',
  }

  const vowStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-base)',
    fontWeight: 500,
    color: 'var(--color-primary)',
    marginBottom: 'var(--spacing-xs)',
  }

  const promptStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
    fontStyle: 'italic',
    marginBottom: 'var(--spacing-sm)',
  }

  const responseStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    lineHeight: 'var(--line-height)',
    marginBottom: 'var(--spacing-sm)',
    whiteSpace: 'pre-wrap',
  }

  const ratingContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--spacing-xs)',
    alignItems: 'center',
  }

  const noResponseStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
    fontStyle: 'italic',
  }

  const meditationSectionStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-lg)',
    border: '1px solid var(--color-border-light)',
  }

  const meditationTitleStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: 'var(--spacing-md)',
    paddingBottom: 'var(--spacing-xs)',
    borderBottom: '1px solid var(--color-border-light)',
  }

  const meditationDetailStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height)',
  }

  return (
    <div style={containerStyle}>
      {preceptGroups.map((group) => {
        const groupResponses = group.precepts
          .map((p) => ({
            precept: p,
            response: responseMap.get(p.number),
          }))
          .filter(({ response }) => response !== undefined)

        if (groupResponses.length === 0) return null

        return (
          <div key={group.id} style={groupStyle}>
            <h3 style={groupTitleStyle}>{group.name}</h3>
            {groupResponses.map(({ precept, response }) => (
              <div key={precept.number} style={preceptCardStyle}>
                <div style={vowStyle}>{precept.vow}</div>
                {response?.promptText && (
                  <div style={promptStyle}>{response.promptText}</div>
                )}
                {response?.response ? (
                  <div style={responseStyle}>{response.response}</div>
                ) : (
                  <div style={noResponseStyle}>No response recorded</div>
                )}
                {response?.rating != null && response.rating > 0 && (
                  <div style={ratingContainerStyle}>
                    {Array.from({ length: 5 }, (_, i) => {
                      const filled = i + 1 <= response.rating!
                      return (
                        <span
                          key={i}
                          style={{
                            width: '0.875rem',
                            height: '0.875rem',
                            borderRadius: '50%',
                            border: `2px solid ${filled ? 'var(--color-accent)' : 'var(--color-border)'}`,
                            backgroundColor: filled
                              ? 'var(--color-accent)'
                              : 'transparent',
                            display: 'inline-block',
                          }}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      })}

      {/* Meditation section */}
      <div style={meditationSectionStyle}>
        <h3 style={meditationTitleStyle}>Meditation</h3>
        {meditation.meditated ? (
          <div style={meditationDetailStyle}>
            <p>
              Meditated for <strong>{meditation.minutes}</strong> minute
              {meditation.minutes !== 1 ? 's' : ''}
            </p>
            {meditation.notes && (
              <p style={{ marginTop: 'var(--spacing-sm)', whiteSpace: 'pre-wrap' }}>
                {meditation.notes}
              </p>
            )}
          </div>
        ) : (
          <div style={noResponseStyle}>No meditation recorded</div>
        )}
      </div>
    </div>
  )
}
