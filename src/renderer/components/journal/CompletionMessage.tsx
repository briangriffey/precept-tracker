import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { animation } from '../../lib/design/tokens'
import { getCompletionMessage } from '../../lib/encouragement'

interface CompletionMessageProps {
  reflectedCount: number
  totalCount?: number
}

export function CompletionMessage({
  reflectedCount,
  totalCount = 16,
}: CompletionMessageProps) {
  const [dismissed, setDismissed] = useState(false)

  if (reflectedCount === 0) return null

  const message = getCompletionMessage(reflectedCount, totalCount)
  const isComplete = reflectedCount >= totalCount

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{
            duration: animation.sectionExpand.duration,
            ease: animation.sectionExpand.ease,
          }}
          style={{
            backgroundColor: isComplete
              ? 'var(--color-primary)'
              : 'var(--color-surface)',
            color: isComplete ? '#FFFFFF' : 'var(--color-text)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            marginBottom: 'var(--spacing-lg)',
            border: isComplete
              ? 'none'
              : '1px solid var(--color-border-light)',
            boxShadow: '0 1px 3px var(--color-shadow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--spacing-md)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 'var(--font-size-sm)',
              lineHeight: 1.6,
              flex: 1,
            }}
          >
            {message}
          </p>
          <button
            onClick={() => setDismissed(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isComplete
                ? 'rgba(255,255,255,0.7)'
                : 'var(--color-text-muted)',
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
