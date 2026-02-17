import React from 'react'
import { motion } from 'framer-motion'
import { format, isToday, parseISO } from 'date-fns'
import { Card } from '../ui/Card'
import type { StreakInfo } from '../../../shared/types'

interface StreakCardProps {
  streak: StreakInfo
}

export function StreakCard({ streak }: StreakCardProps) {
  const isActiveToday = streak.lastEntryDate != null && isToday(parseISO(streak.lastEntryDate))

  const lastEntryLabel = streak.lastEntryDate
    ? isActiveToday
      ? 'Today'
      : format(parseISO(streak.lastEntryDate), 'MMM d, yyyy')
    : 'No entries yet'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          textAlign: 'center',
          padding: 'var(--spacing-sm) 0',
        }}>
          <div>
            <div style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--spacing-xs)',
              fontWeight: 400,
            }}>
              Current Streak
            </div>
            <div style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 300,
              color: isActiveToday ? 'var(--color-primary)' : 'var(--color-text-muted)',
              lineHeight: 1.1,
            }}>
              {streak.current}
            </div>
            <div style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-muted)',
              marginTop: 'var(--spacing-xs)',
            }}>
              days
            </div>
          </div>
          <div style={{
            width: '1px',
            backgroundColor: 'var(--color-border-light)',
            alignSelf: 'stretch',
          }} />
          <div>
            <div style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--spacing-xs)',
              fontWeight: 400,
            }}>
              Longest Streak
            </div>
            <div style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 300,
              color: 'var(--color-text)',
              lineHeight: 1.1,
            }}>
              {streak.longest}
            </div>
            <div style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-muted)',
              marginTop: 'var(--spacing-xs)',
            }}>
              days
            </div>
          </div>
        </div>
        <div style={{
          textAlign: 'center',
          marginTop: 'var(--spacing-md)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-muted)',
        }}>
          Last entry: {lastEntryLabel}
        </div>
      </Card>
    </motion.div>
  )
}
