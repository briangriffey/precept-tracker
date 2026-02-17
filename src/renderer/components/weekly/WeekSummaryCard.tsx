import type { WeeklySummary } from '../../../shared/types'
import { precepts } from '../../lib/precepts'
import { Card } from '../ui'

interface WeekSummaryCardProps {
  summary: WeeklySummary
}

function getPreceptName(preceptNumber: number): string {
  return precepts.find((p) => p.number === preceptNumber)?.shortName ?? `Precept ${preceptNumber}`
}

export function WeekSummaryCard({ summary }: WeekSummaryCardProps) {
  const sectionStyle: React.CSSProperties = {
    marginTop: 'var(--spacing-md)',
  }

  const headingStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--spacing-xs)',
  }

  const statStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    lineHeight: 'var(--line-height)',
    marginBottom: '0.25rem',
  }

  const listStyle: React.CSSProperties = {
    margin: 0,
    paddingLeft: 'var(--spacing-lg)',
    color: 'var(--color-text)',
    fontSize: 'var(--font-size-base)',
    lineHeight: 'var(--line-height)',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: 'var(--spacing-sm)',
  }

  return (
    <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
      <div style={titleStyle}>This Week</div>

      <div style={statStyle}>
        {summary.daysWithEntries} of 7 days journaled
      </div>
      <div style={statStyle}>
        {summary.totalPrecepts} precepts reflected on
      </div>
      <div style={statStyle}>
        {summary.totalMeditationMinutes} meditation minutes across {summary.daysWithMeditation} day{summary.daysWithMeditation !== 1 ? 's' : ''}
      </div>

      {summary.topPrecepts.length > 0 && (
        <div style={sectionStyle}>
          <div style={headingStyle}>Strongest practice:</div>
          <ul style={listStyle}>
            {summary.topPrecepts.map((n) => (
              <li key={n}>{getPreceptName(n)}</li>
            ))}
          </ul>
        </div>
      )}

      {summary.growthPrecepts.length > 0 && (
        <div style={sectionStyle}>
          <div style={headingStyle}>Areas for attention:</div>
          <ul style={listStyle}>
            {summary.growthPrecepts.map((n) => (
              <li key={n}>{getPreceptName(n)}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}
