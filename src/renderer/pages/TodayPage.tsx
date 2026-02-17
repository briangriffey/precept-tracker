import { format } from 'date-fns'
import { PageTransition } from '../components/layout/PageTransition'
import { DailyHeader } from '../components/journal/DailyHeader'
import { JournalProgress } from '../components/journal/JournalProgress'
import { PreceptGroupSection } from '../components/journal/PreceptGroupSection'
import { MeditationTracker } from '../components/journal/MeditationTracker'
import { preceptGroups } from '../lib/precepts'
import { useDailyEntry } from '../hooks/useDailyEntry'

export function TodayPage() {
  const today = new Date()
  const dateStr = format(today, 'yyyy-MM-dd')
  const { entry, loading, saveStatus, updateResponse, updateMeditation } = useDailyEntry(dateStr)

  if (loading || !entry) {
    return (
      <PageTransition>
        <div style={{ padding: 'var(--spacing-2xl) 0', color: 'var(--color-text-muted)', textAlign: 'center' }}>
          Loading...
        </div>
      </PageTransition>
    )
  }

  const completedCount = entry.responses.filter(
    (r) => (r.response && r.response.trim().length > 0) || (r.rating && r.rating > 0)
  ).length

  return (
    <PageTransition>
      <DailyHeader date={today} saveStatus={saveStatus} />

      <JournalProgress completed={completedCount} total={16} />

      {preceptGroups.map((group, i) => (
        <PreceptGroupSection
          key={group.id}
          group={group}
          date={dateStr}
          responses={entry.responses}
          defaultOpen={i === 0}
          onUpdate={updateResponse}
        />
      ))}

      <MeditationTracker
        meditation={entry.meditation}
        onUpdate={updateMeditation}
      />
    </PageTransition>
  )
}
