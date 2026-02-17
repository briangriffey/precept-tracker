import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageTransition } from '../components/layout/PageTransition'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Toggle } from '../components/ui/Toggle'
import { ExportDialog } from '../components/export/ExportDialog'
import { useSettings } from '../hooks/useSettings'
import { useTheme } from '../hooks/useTheme'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 'var(--font-size-base)',
        fontWeight: 600,
        color: 'var(--color-text)',
        margin: 0,
        marginBottom: 'var(--spacing-md)',
        paddingBottom: 'var(--spacing-xs)',
        borderBottom: '1px solid var(--color-border-light)',
      }}
    >
      {children}
    </h2>
  )
}

function SettingRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--spacing-sm) 0',
      }}
    >
      <span
        style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text)',
        }}
      >
        {label}
      </span>
      <div>{children}</div>
    </div>
  )
}

const selectStyle: React.CSSProperties = {
  padding: '0.375rem 0.75rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  cursor: 'pointer',
}

export function SettingsPage() {
  const { loading, getSetting, setSetting } = useSettings()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [exportOpen, setExportOpen] = useState(false)

  if (loading) {
    return (
      <PageTransition>
        <div style={{ padding: 'var(--spacing-xl)', color: 'var(--color-text-secondary)' }}>
          Loading settings...
        </div>
      </PageTransition>
    )
  }

  const reminderTime = getSetting('reminder_time') ?? '20:00'
  const remindersEnabled = (getSetting('reminder_enabled') ?? 'true') === 'true'
  const weeklyDay = getSetting('weekly_reflection_day') ?? 'sunday'
  const themeSetting = getSetting('theme') ?? 'system'

  const handleThemeChange = (value: string) => {
    setSetting('theme', value)
    if (value === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const systemTheme = prefersDark ? 'dark' : 'light'
      if (theme !== systemTheme) toggleTheme()
      localStorage.removeItem('precept-tracker-theme')
    } else if (value !== theme) {
      toggleTheme()
    }
  }

  return (
    <PageTransition>
      <div style={{ maxWidth: '36rem', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: 0,
            marginBottom: 'var(--spacing-xl)',
          }}
        >
          Settings
        </h1>

        {/* Practice */}
        <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
          <SectionTitle>Practice</SectionTitle>
          <SettingRow label="Daily reminder time">
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setSetting('reminder_time', e.target.value)}
              style={selectStyle}
            />
          </SettingRow>
          <SettingRow label="Reminders enabled">
            <Toggle
              checked={remindersEnabled}
              onChange={(v) => setSetting('reminder_enabled', v ? 'true' : 'false')}
            />
          </SettingRow>
          <SettingRow label="Weekly reflection day">
            <select
              value={weeklyDay}
              onChange={(e) => setSetting('weekly_reflection_day', e.target.value)}
              style={selectStyle}
            >
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
            </select>
          </SettingRow>
        </Card>

        {/* Prompts */}
        <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
          <SectionTitle>Prompts</SectionTitle>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/settings/prompts')}
          >
            Customize prompts
          </Button>
        </Card>

        {/* Appearance */}
        <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
          <SectionTitle>Appearance</SectionTitle>
          <SettingRow label="Theme">
            <select
              value={themeSetting}
              onChange={(e) => handleThemeChange(e.target.value)}
              style={selectStyle}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </SettingRow>
        </Card>

        {/* Data */}
        <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
          <SectionTitle>Data</SectionTitle>
          <div style={{ marginBottom: 'var(--spacing-sm)' }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setExportOpen(true)}
            >
              Export journal
            </Button>
          </div>
        </Card>

        {/* About */}
        <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
          <SectionTitle>About</SectionTitle>
          <p
            style={{
              margin: 0,
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            Precept Tracker v1.0.0
          </p>
        </Card>
      </div>

      <ExportDialog open={exportOpen} onClose={() => setExportOpen(false)} />
    </PageTransition>
  )
}
