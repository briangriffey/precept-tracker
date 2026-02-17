import { format } from 'date-fns'
import type { SaveStatus } from './types'

interface DailyHeaderProps {
  date: Date
  saveStatus: SaveStatus
}

const greetings = [
  'Welcome to your practice.',
  'A moment of stillness awaits.',
  'Begin where you are.',
  'Each day is a fresh start.',
  'You showed up. That matters.',
  'Breathe. Reflect. Grow.',
  'Gentle attention, honest reflection.',
]

function getGreeting(date: Date): string {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return greetings[dayOfYear % greetings.length]
}

export function DailyHeader({ date, saveStatus }: DailyHeaderProps) {
  const headerStyle: React.CSSProperties = {
    marginBottom: 'var(--spacing-xl)',
  }

  const dateStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 300,
    letterSpacing: '0.02em',
    color: 'var(--color-text)',
    margin: 0,
  }

  const greetingStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
    marginTop: 'var(--spacing-xs)',
  }

  const statusStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
    marginTop: 'var(--spacing-xs)',
    transition: 'opacity 150ms ease',
    opacity: saveStatus === 'idle' ? 0 : 1,
  }

  return (
    <header style={headerStyle}>
      <h1 style={dateStyle}>{format(date, 'EEEE, MMMM d')}</h1>
      <p style={greetingStyle}>{getGreeting(date)}</p>
      <p style={statusStyle}>
        {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : ''}
      </p>
    </header>
  )
}
