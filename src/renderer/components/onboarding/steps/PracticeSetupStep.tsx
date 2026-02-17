import React, { useState } from 'react'
import { OnboardingStep } from '../OnboardingStep'
import { Button, Toggle } from '../../ui'

interface PracticeSetupStepProps {
  onComplete: (settings: {
    reminderTime: string
    reminderEnabled: boolean
    weeklyDay: string
  }) => void
  onSkip: () => void
}

const DAYS_OF_WEEK = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const

const selectStyle: React.CSSProperties = {
  padding: 'var(--spacing-sm) var(--spacing-md)',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-base)',
  width: '100%',
}

const fieldRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--spacing-sm) 0',
  width: '100%',
}

export function PracticeSetupStep({ onComplete, onSkip }: PracticeSetupStepProps) {
  const [reminderTime, setReminderTime] = useState('20:00')
  const [reminderEnabled, setReminderEnabled] = useState(true)
  const [weeklyDay, setWeeklyDay] = useState('sunday')

  const handleBegin = () => {
    onComplete({ reminderTime, reminderEnabled, weeklyDay })
  }

  return (
    <OnboardingStep>
      <h1
        style={{
          fontSize: 'var(--font-size-2xl)',
          color: 'var(--color-text)',
          margin: '0 0 var(--spacing-xl)',
          fontWeight: 300,
        }}
      >
        Set Up Your Practice
      </h1>

      <div style={{ width: '100%', marginBottom: 'var(--spacing-xl)' }}>
        <p
          style={{
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text-secondary)',
            margin: '0 0 var(--spacing-lg)',
            textAlign: 'left',
          }}
        >
          When would you like to be reminded to reflect?
        </p>

        <div style={fieldRowStyle}>
          <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>
            Reminder time
          </span>
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            style={{
              ...selectStyle,
              width: 'auto',
              minWidth: '140px',
            }}
          />
        </div>

        <div style={fieldRowStyle}>
          <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>
            Enable notifications
          </span>
          <Toggle
            checked={reminderEnabled}
            onChange={setReminderEnabled}
          />
        </div>

        <div style={{ borderTop: '1px solid var(--color-border-light)', margin: 'var(--spacing-md) 0' }} />

        <p
          style={{
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text-secondary)',
            margin: '0 0 var(--spacing-md)',
            textAlign: 'left',
          }}
        >
          Which day would you like for your weekly reflection?
        </p>

        <div style={fieldRowStyle}>
          <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>
            Reflection day
          </span>
          <select
            value={weeklyDay}
            onChange={(e) => setWeeklyDay(e.target.value)}
            style={{ ...selectStyle, width: 'auto', minWidth: '140px' }}
          >
            {DAYS_OF_WEEK.map((day) => (
              <option key={day} value={day}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
        <Button onClick={handleBegin} size="lg">
          Begin Practice
        </Button>
        <Button variant="ghost" size="lg" onClick={onSkip}>
          Skip
        </Button>
      </div>
    </OnboardingStep>
  )
}
