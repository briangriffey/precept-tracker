import { useState } from 'react'
import { PageTransition } from '../components/layout/PageTransition'
import { TimeRangeSelector } from '../components/trends/TimeRangeSelector'
import { StreakCard } from '../components/trends/StreakCard'
import { MeditationChart } from '../components/trends/MeditationChart'
import { CompletionHeatmap } from '../components/trends/CompletionHeatmap'
import { PreceptRatingsChart } from '../components/trends/PreceptRatingsChart'
import { useTrendsData, type TimeRange } from '../hooks/useTrendsData'

export function TrendsPage() {
  const [range, setRange] = useState<TimeRange>('30d')
  const { streak, meditationTrend, completionMap, averageRatings, loading } = useTrendsData(range)

  return (
    <PageTransition>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--spacing-xl)',
      }}>
        <h1 style={{
          fontSize: 'var(--font-size-2xl)',
          fontWeight: 300,
          color: 'var(--color-text)',
          margin: 0,
        }}>
          Trends
        </h1>
        <TimeRangeSelector value={range} onChange={setRange} />
      </div>

      {loading ? (
        <div style={{
          padding: 'var(--spacing-2xl) 0',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
        }}>
          Loading...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          {streak && <StreakCard streak={streak} />}
          <MeditationChart data={meditationTrend} />
          <CompletionHeatmap data={completionMap} range={range} />
          <PreceptRatingsChart data={averageRatings} />
        </div>
      )}
    </PageTransition>
  )
}
