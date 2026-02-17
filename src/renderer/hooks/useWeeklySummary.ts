import { useState, useEffect } from 'react'
import type { WeeklySummary } from '../../shared/types'
import { api } from '../lib/data/api'

export function useWeeklySummary(weekStart: string, weekEnd: string) {
  const [summary, setSummary] = useState<WeeklySummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    api.weekly
      .summary(weekStart, weekEnd)
      .then((result) => {
        if (cancelled) return
        // Treat weeks with zero entries as null
        setSummary(result.daysWithEntries === 0 ? null : result)
        setLoading(false)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Failed to load summary')
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [weekStart, weekEnd])

  return { summary, loading, error }
}
