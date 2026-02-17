import React, { useState, useCallback } from 'react'
import { Card, Textarea, Rating } from '../ui'
import type { PreceptDefinition } from '../../lib/precepts'
import { getPromptForDay, getNextPrompt } from '../../lib/precepts'
import type { PreceptResponse } from '../../../shared/types'

interface PreceptCardProps {
  precept: PreceptDefinition
  date: string
  existingResponse?: PreceptResponse
  onUpdate: (
    preceptNumber: number,
    response: string | null,
    rating: number | null,
    promptText: string
  ) => void
}

export function PreceptCard({ precept, date, existingResponse, onUpdate }: PreceptCardProps) {
  const initialPrompt =
    existingResponse?.promptText ??
    getPromptForDay(precept.number, date, precept.defaultPrompts)

  const [currentPrompt, setCurrentPrompt] = useState(initialPrompt)
  const [response, setResponse] = useState(existingResponse?.response ?? '')
  const [rating, setRating] = useState(existingResponse?.rating ?? 0)

  const handleRefreshPrompt = useCallback(() => {
    const next = getNextPrompt(currentPrompt, precept.defaultPrompts)
    setCurrentPrompt(next)
    // If there's existing text, keep it but update the prompt
    onUpdate(precept.number, response || null, rating || null, next)
  }, [currentPrompt, precept, response, rating, onUpdate])

  const handleResponseChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newResponse = e.target.value
      setResponse(newResponse)
      onUpdate(precept.number, newResponse || null, rating || null, currentPrompt)
    },
    [precept.number, rating, currentPrompt, onUpdate]
  )

  const handleRatingChange = useCallback(
    (newRating: number) => {
      setRating(newRating)
      onUpdate(precept.number, response || null, newRating || null, currentPrompt)
    },
    [precept.number, response, currentPrompt, onUpdate]
  )

  const vowStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-base)',
    fontWeight: 500,
    color: 'var(--color-text)',
    margin: 0,
  }

  const promptContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--spacing-sm)',
    marginTop: 'var(--spacing-sm)',
    marginBottom: 'var(--spacing-md)',
  }

  const promptStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
    fontStyle: 'italic',
    lineHeight: 1.5,
    flex: 1,
    margin: 0,
  }

  const refreshBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--color-text-muted)',
    fontSize: 'var(--font-size-base)',
    padding: 'var(--spacing-xs)',
    borderRadius: 'var(--radius-sm)',
    lineHeight: 1,
    flexShrink: 0,
    transition: 'color 150ms ease',
  }

  const ratingRowStyle: React.CSSProperties = {
    marginTop: 'var(--spacing-sm)',
  }

  return (
    <Card style={{ marginBottom: 'var(--spacing-md)' }}>
      <p style={vowStyle}>
        {precept.number}. {precept.vow}
      </p>

      <div style={promptContainerStyle}>
        <p style={promptStyle}>"{currentPrompt}"</p>
        <button
          type="button"
          style={refreshBtnStyle}
          onClick={handleRefreshPrompt}
          aria-label="Get a different prompt"
          title="Get a different prompt"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-text-muted)'
          }}
        >
          &#x21bb;
        </button>
      </div>

      <Textarea
        value={response}
        onChange={handleResponseChange}
        placeholder="Your reflection..."
        style={{ minHeight: '3.5rem' }}
      />

      <div style={ratingRowStyle}>
        <Rating value={rating} onChange={handleRatingChange} />
      </div>
    </Card>
  )
}
