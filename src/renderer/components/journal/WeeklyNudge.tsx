import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDay } from 'date-fns'
import { Card, Button } from '../ui'
import { api } from '../../lib/data/api'
import { getWeekBounds } from '../../lib/weekly/summary'

interface WeeklyNudgeProps {
  date: Date
}

// Default reflection day: Sunday (0 in getDay)
const DEFAULT_REFLECTION_DAY = 0

export function WeeklyNudge({ date }: WeeklyNudgeProps) {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const dayOfWeek = getDay(date)
    if (dayOfWeek !== DEFAULT_REFLECTION_DAY) {
      setVisible(false)
      return
    }

    // Check if a reflection already exists for this week
    const { weekStart } = getWeekBounds(date)
    let cancelled = false

    api.weekly.get(weekStart).then((reflection) => {
      if (cancelled) return
      // Show nudge only if no reflection written yet
      const hasReflection = reflection && reflection.reflection && reflection.reflection.trim().length > 0
      setVisible(!hasReflection)
    })

    return () => {
      cancelled = true
    }
  }, [date])

  if (!visible || dismissed) return null

  const containerStyle: React.CSSProperties = {
    marginBottom: 'var(--spacing-lg)',
  }

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--spacing-md)',
  }

  const textStyle: React.CSSProperties = {
    flex: 1,
  }

  const headingStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-base)',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: '0.25rem',
  }

  const descStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  }

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    flexShrink: 0,
  }

  return (
    <div style={containerStyle}>
      <Card>
        <div style={contentStyle}>
          <div style={textStyle}>
            <div style={headingStyle}>It's time for your weekly reflection.</div>
            <div style={descStyle}>Take a moment to look back at the week.</div>
          </div>
          <div style={actionsStyle}>
            <Button variant="ghost" size="sm" onClick={() => setDismissed(true)}>
              Dismiss
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/weekly')}>
              Reflect →
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
