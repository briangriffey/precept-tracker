import React, { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Toggle, Textarea } from '../ui'
import { animation } from '../../lib/design/tokens'
import type { MeditationLog } from '../../../shared/types'

interface MeditationTrackerProps {
  meditation: MeditationLog
  onUpdate: (meditated: boolean, minutes: number, notes: string | null) => void
}

export function MeditationTracker({ meditation, onUpdate }: MeditationTrackerProps) {
  const handleToggle = useCallback(
    (checked: boolean) => {
      onUpdate(checked, checked ? meditation.minutes || 0 : 0, meditation.notes)
    },
    [meditation, onUpdate]
  )

  const handleMinutesChange = useCallback(
    (delta: number) => {
      const newMinutes = Math.max(0, meditation.minutes + delta)
      onUpdate(meditation.meditated, newMinutes, meditation.notes)
    },
    [meditation, onUpdate]
  )

  const handleMinutesInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value, 10)
      onUpdate(meditation.meditated, isNaN(val) ? 0 : Math.max(0, val), meditation.notes)
    },
    [meditation, onUpdate]
  )

  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onUpdate(meditation.meditated, meditation.minutes, e.target.value || null)
    },
    [meditation, onUpdate]
  )

  const titleStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 400,
    color: 'var(--color-text)',
    margin: 0,
    marginBottom: 'var(--spacing-md)',
  }

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const minutesRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    marginTop: 'var(--spacing-md)',
  }

  const minutesLabelStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    flexShrink: 0,
  }

  const stepBtnStyle: React.CSSProperties = {
    width: '2rem',
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
    cursor: 'pointer',
    fontSize: 'var(--font-size-lg)',
    lineHeight: 1,
    transition: 'background-color 150ms ease',
  }

  const minutesInputStyle: React.CSSProperties = {
    width: '4rem',
    textAlign: 'center',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '0.25rem 0.5rem',
    outline: 'none',
    fontFamily: 'var(--font-body)',
  }

  const notesContainerStyle: React.CSSProperties = {
    marginTop: 'var(--spacing-md)',
  }

  return (
    <Card style={{ marginTop: 'var(--spacing-lg)' }}>
      <h3 style={titleStyle}>Meditation</h3>

      <div style={rowStyle}>
        <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>
          Did you meditate today?
        </span>
        <Toggle checked={meditation.meditated} onChange={handleToggle} />
      </div>

      <AnimatePresence initial={false}>
        {meditation.meditated && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: animation.sectionExpand.duration,
              ease: [...animation.sectionExpand.ease] as [number, number, number, number],
            }}
            style={{ overflow: 'hidden' }}
          >
            <div style={minutesRowStyle}>
              <span style={minutesLabelStyle}>Minutes:</span>
              <button
                type="button"
                style={stepBtnStyle}
                onClick={() => handleMinutesChange(-5)}
                aria-label="Decrease by 5 minutes"
              >
                &minus;
              </button>
              <input
                type="number"
                min={0}
                step={5}
                value={meditation.minutes}
                onChange={handleMinutesInput}
                style={minutesInputStyle}
                aria-label="Meditation minutes"
              />
              <button
                type="button"
                style={stepBtnStyle}
                onClick={() => handleMinutesChange(5)}
                aria-label="Increase by 5 minutes"
              >
                +
              </button>
            </div>

            <div style={notesContainerStyle}>
              <Textarea
                label="Notes (optional)"
                value={meditation.notes ?? ''}
                onChange={handleNotesChange}
                placeholder="How was your session..."
                style={{ minHeight: '3rem' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
