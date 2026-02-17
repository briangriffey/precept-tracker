import { Card } from '../ui'

const WEEKLY_PROMPTS = [
  'Looking at this week as a whole, which precept felt most alive in your daily life?',
  'Was there a recurring challenge or pattern you noticed across multiple days?',
  "What's one small thing you'd like to bring more attention to next week?",
]

export function WeeklyPrompts() {
  const promptStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    lineHeight: 'var(--line-height)',
    marginBottom: 'var(--spacing-sm)',
    paddingLeft: 'var(--spacing-sm)',
    borderLeft: '2px solid var(--color-primary)',
  }

  const headingStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: 'var(--spacing-md)',
  }

  return (
    <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
      <div style={headingStyle}>Reflect on your week</div>
      {WEEKLY_PROMPTS.map((prompt, i) => (
        <div key={i} style={promptStyle}>
          {prompt}
        </div>
      ))}
    </Card>
  )
}
