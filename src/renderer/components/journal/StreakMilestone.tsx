import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { animation } from '../../lib/design/tokens'
import {
  getStreakMilestoneMessage,
  MILESTONE_SHOWN_KEY,
  parseShownMilestones,
  serializeShownMilestones,
} from '../../lib/encouragement'
import { api } from '../../lib/data/api'

interface StreakMilestoneProps {
  currentStreak: number
}

export function StreakMilestone({ currentStreak }: StreakMilestoneProps) {
  const [message, setMessage] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let cancelled = false

    const milestoneText = getStreakMilestoneMessage(currentStreak)
    if (!milestoneText) return

    // Check whether this milestone has already been shown
    api.setting.get(MILESTONE_SHOWN_KEY).then((value) => {
      if (cancelled) return

      const shown = parseShownMilestones(value)
      if (shown.has(currentStreak)) return

      // Mark as shown
      shown.add(currentStreak)
      api.setting.set(MILESTONE_SHOWN_KEY, serializeShownMilestones(shown))

      setMessage(milestoneText)
      setVisible(true)
    })

    return () => {
      cancelled = true
    }
  }, [currentStreak])

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => setVisible(false), 8000)
    return () => clearTimeout(timer)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{
            duration: animation.pageFade.duration,
            ease: animation.pageFade.ease,
          }}
          style={{
            backgroundColor: 'var(--color-accent)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            marginBottom: 'var(--spacing-lg)',
            boxShadow: '0 2px 8px var(--color-shadow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--spacing-md)',
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                opacity: 0.85,
              }}
            >
              {currentStreak}-day streak
            </p>
            <p
              style={{
                margin: 'var(--spacing-xs) 0 0',
                fontSize: 'var(--font-size-sm)',
                lineHeight: 1.6,
              }}
            >
              {message}
            </p>
          </div>
          <button
            onClick={() => setVisible(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 'var(--font-size-sm)',
              padding: 'var(--spacing-xs)',
              lineHeight: 1,
              flexShrink: 0,
            }}
            aria-label="Dismiss"
          >
            &#x2715;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
