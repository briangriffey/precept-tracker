import React, { useState } from 'react'
import { PageTransition } from '../components/layout/PageTransition'
import { Card, Button, Toggle } from '../components/ui'
import { PromptManager } from '../components/prompts/PromptManager'
import { useSettings } from '../hooks/useSettings'
import { useTheme, type ThemePreference } from '../hooks/useTheme'

const DAYS_OF_WEEK = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-text)',
  margin: '0 0 var(--spacing-md)',
}

const settingRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--spacing-sm) 0',
}

const settingLabelStyle: React.CSSProperties = {
  fontSize: 'var(--font-size-base)',
  color: 'var(--color-text)',
}

const selectStyle: React.CSSProperties = {
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  minWidth: '120px',
}

const infoTextStyle: React.CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-muted)',
  margin: 0,
}

export function SettingsPage() {
  const { settings, loading, setSetting } = useSettings()
  const { preference, setThemePreference } = useTheme()
  const [showPrompts, setShowPrompts] = useState(false)

  if (loading) {
    return (
      <PageTransition>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-text)', margin: '0 0 var(--spacing-lg)' }}>
          Settings
        </h1>
        <p style={infoTextStyle}>Loading...</p>
      </PageTransition>
    )
  }

  const reminderEnabled = settings.reminder_enabled !== 'false'
  const reminderTime = settings.reminder_time ?? '20:00'
  const weeklyDay = settings.weekly_reflection_day ?? 'sunday'

  const handleThemeChange = (value: string) => {
    const pref = value as ThemePreference
    setThemePreference(pref)
    setSetting('theme', pref)
  }

  const handleRestartOnboarding = async () => {
    await setSetting('onboarding_complete', 'false')
    window.location.hash = '#/onboarding'
  }

  return (
    <PageTransition>
      <h1
        style={{
          fontSize: 'var(--font-size-2xl)',
          color: 'var(--color-text)',
          margin: '0 0 var(--spacing-xl)',
        }}
      >
        Settings
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', maxWidth: '640px' }}>
        {/* Practice */}
        <Card>
          <h2 style={sectionTitleStyle}>Practice</h2>

          <div style={settingRowStyle}>
            <span style={settingLabelStyle}>Daily reminder time</span>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setSetting('reminder_time', e.target.value)}
              style={{
                ...selectStyle,
                minWidth: '140px',
              }}
            />
          </div>

          <div style={settingRowStyle}>
            <span style={settingLabelStyle}>Reminders enabled</span>
            <Toggle
              checked={reminderEnabled}
              onChange={(checked) =>
                setSetting('reminder_enabled', String(checked))
              }
            />
          </div>

          <div style={settingRowStyle}>
            <span style={settingLabelStyle}>Weekly reflection day</span>
            <select
              value={weeklyDay}
              onChange={(e) =>
                setSetting('weekly_reflection_day', e.target.value)
              }
              style={selectStyle}
            >
              {DAYS_OF_WEEK.map((day) => (
                <option key={day} value={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Prompts */}
        <Card>
          <h2 style={sectionTitleStyle}>Prompts</h2>
          {showPrompts ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPrompts(false)}
                style={{ marginBottom: 'var(--spacing-md)' }}
              >
                &larr; Back to settings
              </Button>
              <PromptManager />
            </>
          ) : (
            <Button
              variant="secondary"
              onClick={() => setShowPrompts(true)}
            >
              Customize prompts &rarr;
            </Button>
          )}
        </Card>

        {/* Appearance */}
        <Card>
          <h2 style={sectionTitleStyle}>Appearance</h2>
          <div style={settingRowStyle}>
            <span style={settingLabelStyle}>Theme</span>
            <select
              value={preference}
              onChange={(e) => handleThemeChange(e.target.value)}
              style={selectStyle}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </Card>

        {/* Data */}
        <Card>
          <h2 style={sectionTitleStyle}>Data</h2>
          <p style={infoTextStyle}>
            Database location: ~/Library/Application Support/precept-tracker/
          </p>
        </Card>

        {/* About */}
        <Card>
          <h2 style={sectionTitleStyle}>About</h2>
          <p
            style={{
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-text)',
              margin: '0 0 var(--spacing-md)',
            }}
          >
            Precept Tracker v1.0.0
          </p>
          <Button variant="secondary" size="sm" onClick={handleRestartOnboarding}>
            Restart onboarding
          </Button>
        </Card>
      </div>
    </PageTransition>
  )
}
