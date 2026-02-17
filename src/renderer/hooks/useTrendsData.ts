import { useState, useEffect } from 'react'
import { format, subDays } from 'date-fns'
import { api } from '../lib/data/api'
import type { StreakInfo } from '../../shared/types'

export type TimeRange = '7d' | '30d' | '90d' | 'all'

interface TrendsData {
  streak: StreakInfo | null
  meditationTrend: { date: string; minutes: number }[]
  completionMap: { date: string; count: number }[]
  averageRatings: { preceptNumber: number; average: number }[]
  loading: boolean
}

function rangeToDays(range: TimeRange): number {
  switch (range) {
    case '7d': return 7
    case '30d': return 30
    case '90d': return 90
    case 'all': return 3650
  }
}

export function useTrendsData(range: TimeRange): TrendsData {
  const [streak, setStreak] = useState<StreakInfo | null>(null)
  const [meditationTrend, setMeditationTrend] = useState<{ date: string; minutes: number }[]>([])
  const [completionMap, setCompletionMap] = useState<{ date: string; count: number }[]>([])
  const [averageRatings, setAverageRatings] = useState<{ preceptNumber: number; average: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    const days = rangeToDays(range)
    const endDate = format(new Date(), 'yyyy-MM-dd')
    const startDate = format(subDays(new Date(), days), 'yyyy-MM-dd')

    Promise.all([
      api.stats.streak(),
      api.stats.meditationTrend(days),
      api.stats.heatmap(days),
      api.stats.averageRatings(startDate, endDate),
    ]).then(([streakData, medData, heatData, ratingsData]) => {
      if (cancelled) return
      setStreak(streakData)
      setMeditationTrend(medData)
      setCompletionMap(heatData)
      setAverageRatings(ratingsData)
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [range])

  return { streak, meditationTrend, completionMap, averageRatings, loading }
}
