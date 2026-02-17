import { useState, useMemo } from 'react'
import { PageTransition } from '../components/layout/PageTransition'
import { WeekSelector } from '../components/weekly/WeekSelector'
import { WeekSummaryCard } from '../components/weekly/WeekSummaryCard'
import { WeeklyPrompts } from '../components/weekly/WeeklyPrompts'
import { WeeklyReflectionForm } from '../components/weekly/WeeklyReflectionForm'
import { useWeeklySummary } from '../hooks/useWeeklySummary'
import { getWeekBounds, isWeekInFuture } from '../lib/weekly/summary'

export function WeeklyPage() {
  const [weekOffset, setWeekOffset] = useState(0)

  const { weekStart, weekEnd } = useMemo(
    () => {
      const today = new Date()
      const shifted = new Date(today)
      shifted.setDate(shifted.getDate() + weekOffset * 7)
      return getWeekBounds(shifted)
    },
    [weekOffset]
  )

  const canGoForward = useMemo(() => {
    const nextWeekDate = new Date()
    nextWeekDate.setDate(nextWeekDate.getDate() + (weekOffset + 1) * 7)
    const nextBounds = getWeekBounds(nextWeekDate)
    return !isWeekInFuture(nextBounds.weekStart)
  }, [weekOffset])

  const { summary, loading, error } = useWeeklySummary(weekStart, weekEnd)

  const emptyStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: 'var(--spacing-2xl) 0',
    color: 'var(--color-text-muted)',
    fontSize: 'var(--font-size-base)',
  }

  const closingStyle: React.CSSProperties = {
    textAlign: 'center',
    color: 'var(--color-text-muted)',
    fontSize: 'var(--font-size-sm)',
    padding: 'var(--spacing-lg) 0',
    fontStyle: 'italic',
  }

  return (
    <PageTransition>
      <WeekSelector
        weekStart={weekStart}
        weekEnd={weekEnd}
        canGoForward={canGoForward}
        onPrevious={() => setWeekOffset((o) => o - 1)}
        onNext={() => setWeekOffset((o) => o + 1)}
      />

      {loading && (
        <div style={emptyStyle}>Loading...</div>
      )}

      {error && (
        <div style={emptyStyle}>{error}</div>
      )}

      {!loading && !error && !summary && (
        <div style={emptyStyle}>
          No entries this week. Start journaling to see your weekly summary.
        </div>
      )}

      {!loading && !error && summary && (
        <>
          <WeekSummaryCard summary={summary} />
          <WeeklyPrompts />
          <WeeklyReflectionForm
            weekStart={weekStart}
            existingReflection={summary.reflection}
          />
          <div style={closingStyle}>
            Each week of practice builds on the last. You are showing up, and that matters.
          </div>
        </>
      )}
    </PageTransition>
  )
}
