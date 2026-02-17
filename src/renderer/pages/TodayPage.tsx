import { useState, useEffect } from 'react'
import { PageTransition } from '../components/layout/PageTransition'
import { DailyHeader } from '../components/journal/DailyHeader'
import { CompletionMessage } from '../components/journal/CompletionMessage'
import { StreakMilestone } from '../components/journal/StreakMilestone'
import { WeeklyNudge } from '../components/journal/WeeklyNudge'
import { JournalProgress } from '../components/journal/JournalProgress'
import { PreceptGroupSection } from '../components/journal/PreceptGroupSection'
import { MeditationTracker } from '../components/journal/MeditationTracker'
import { useDailyEntry } from '../hooks/useDailyEntry'
import { preceptGroups } from '../lib/precepts'
import { api } from '../lib/data/api'

function todayISO(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function TodayPage() {
  const date = todayISO()
  const { entry, loading, updateResponse, updateMeditation } = useDailyEntry(date)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    api.stats.streak().then((info) => setStreak(info.current))
  }, [])

  const reflectedCount = entry
    ? entry.responses.filter((r) => r.response || r.rating).length
    : 0

  return (
    <PageTransition>
      <DailyHeader date={date} />
      <WeeklyNudge date={new Date()} />
      <StreakMilestone currentStreak={streak} />
      {!loading && reflectedCount > 0 && (
        <CompletionMessage reflectedCount={reflectedCount} />
      )}
      {!loading && entry && (
        <>
          <JournalProgress completed={reflectedCount} total={16} />
          {preceptGroups.map((group, i) => (
            <PreceptGroupSection
              key={group.name}
              group={group}
              date={date}
              responses={entry.responses}
              defaultOpen={i === 0}
              onUpdate={updateResponse}
            />
          ))}
          <MeditationTracker
            meditation={entry.meditation}
            onUpdate={updateMeditation}
          />
        </>
      )}
    </PageTransition>
  )
}
