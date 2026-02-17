import { format, parseISO } from 'date-fns'
import { Button } from '../ui'

interface WeekSelectorProps {
  weekStart: string
  weekEnd: string
  canGoForward: boolean
  onPrevious: () => void
  onNext: () => void
}

function formatWeekLabel(weekStart: string, weekEnd: string): string {
  const start = parseISO(weekStart)
  const end = parseISO(weekEnd)

  if (start.getFullYear() !== end.getFullYear()) {
    return `${format(start, 'MMM d, yyyy')} – ${format(end, 'MMM d, yyyy')}`
  }
  if (start.getMonth() !== end.getMonth()) {
    return `${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`
  }
  return `${format(start, 'MMM d')} – ${format(end, 'd, yyyy')}`
}

export function WeekSelector({
  weekStart,
  weekEnd,
  canGoForward,
  onPrevious,
  onNext,
}: WeekSelectorProps) {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--spacing-lg)',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 500,
    color: 'var(--color-text)',
  }

  return (
    <div style={containerStyle}>
      <Button variant="ghost" size="sm" onClick={onPrevious} aria-label="Previous week">
        ←
      </Button>
      <span style={labelStyle}>Week of {formatWeekLabel(weekStart, weekEnd)}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        disabled={!canGoForward}
        aria-label="Next week"
      >
        →
      </Button>
    </div>
  )
}
