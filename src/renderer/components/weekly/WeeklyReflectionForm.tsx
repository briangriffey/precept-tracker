import { useState, useEffect, useCallback } from 'react'
import type { WeeklyReflection } from '../../../shared/types'
import { api } from '../../lib/data/api'
import { useAutoSave } from '../../hooks/useAutoSave'
import { Card, Textarea } from '../ui'

interface WeeklyReflectionFormProps {
  weekStart: string
  existingReflection: WeeklyReflection | null
}

export function WeeklyReflectionForm({
  weekStart,
  existingReflection,
}: WeeklyReflectionFormProps) {
  const [text, setText] = useState(existingReflection?.reflection ?? '')
  const [version, setVersion] = useState(0)

  // Reset when navigating to a different week
  useEffect(() => {
    setText(existingReflection?.reflection ?? '')
  }, [weekStart, existingReflection])

  const saveFn = useCallback(
    async (v: { text: string; version: number }) => {
      if (v.text.trim().length === 0) return
      await api.weekly.upsert(weekStart, v.text)
    },
    [weekStart]
  )

  const { status } = useAutoSave({ text, version }, saveFn)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    setVersion((v) => v + 1)
  }

  const headingStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--spacing-md)',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 500,
    color: 'var(--color-text)',
  }

  const statusStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
  }

  const statusLabel =
    status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved' : ''

  return (
    <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
      <div style={headingStyle}>
        <div style={titleStyle}>Weekly reflection</div>
        {statusLabel && <div style={statusStyle}>{statusLabel}</div>}
      </div>
      <Textarea
        value={text}
        onChange={handleChange}
        placeholder="Write freely about your week..."
        style={{ minHeight: '10rem' }}
      />
    </Card>
  )
}
