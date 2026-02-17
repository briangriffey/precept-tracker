import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../lib/data/api'
import { PageTransition } from '../components/layout/PageTransition'
import { EntryReadView } from '../components/history/EntryReadView'
import { Button } from '../components/ui/Button'
import type { DailyEntry } from '../../shared/types'

export function EntryDetailPage() {
  const { date } = useParams<{ date: string }>()
  const navigate = useNavigate()
  const [entry, setEntry] = useState<DailyEntry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!date) return

    let cancelled = false
    setLoading(true)

    api.entry.get(date).then((result) => {
      if (!cancelled) {
        setEntry(result)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [date])

  if (!date) return null

  const displayDate = new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--spacing-xl)',
  }

  const backBtnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 500,
    color: 'var(--color-text)',
  }

  const loadingStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    padding: 'var(--spacing-2xl)',
    color: 'var(--color-text-muted)',
  }

  const emptyStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-2xl)',
    textAlign: 'center',
    gap: 'var(--spacing-md)',
  }

  return (
    <PageTransition>
      <div style={headerStyle}>
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/history')}
            style={backBtnStyle}
          >
            &larr; Back to History
          </Button>
          <h1 style={titleStyle}>{displayDate}</h1>
        </div>
        {entry && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/today?date=${date}`)}
          >
            Edit
          </Button>
        )}
      </div>

      {loading && <div style={loadingStyle}>Loading entry...</div>}

      {!loading && !entry && (
        <div style={emptyStyle}>
          <p
            style={{
              fontSize: 'var(--font-size-lg)',
              color: 'var(--color-text-secondary)',
            }}
          >
            No entry for this date
          </p>
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-muted)',
            }}
          >
            There is no journal entry recorded for {displayDate}.
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/today?date=${date}`)}
          >
            Start an entry
          </Button>
        </div>
      )}

      {!loading && entry && <EntryReadView dailyEntry={entry} />}
    </PageTransition>
  )
}
