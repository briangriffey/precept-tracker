import { OnboardingStep } from '../OnboardingStep'
import { Button } from '../../ui'

interface PreceptsIntroStepProps {
  onContinue: () => void
  onSkip: () => void
}

const groupStyle: React.CSSProperties = {
  textAlign: 'left',
  margin: '0 0 var(--spacing-md)',
  padding: 'var(--spacing-md)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface-hover)',
}

const groupTitleStyle: React.CSSProperties = {
  fontSize: 'var(--font-size-base)',
  color: 'var(--color-primary)',
  fontWeight: 500,
  margin: '0 0 var(--spacing-xs)',
}

const groupDescStyle: React.CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  margin: 0,
  lineHeight: 1.6,
}

export function PreceptsIntroStep({ onContinue, onSkip }: PreceptsIntroStepProps) {
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
        The Precepts
      </h1>

      <div style={{ width: '100%', marginBottom: 'var(--spacing-lg)' }}>
        <div style={groupStyle}>
          <p style={groupTitleStyle}>The Three Refuges</p>
          <p style={groupDescStyle}>
            Your foundation &mdash; Buddha, Dharma, Sangha
          </p>
        </div>

        <div style={groupStyle}>
          <p style={groupTitleStyle}>The Three Pure Precepts</p>
          <p style={groupDescStyle}>
            Your compass &mdash; avoid harm, do good, serve all beings
          </p>
        </div>

        <div style={groupStyle}>
          <p style={groupTitleStyle}>The Ten Grave Precepts</p>
          <p style={groupDescStyle}>
            Your daily practice &mdash; specific guidelines for awakened living
          </p>
        </div>
      </div>

      <p
        style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
          margin: '0 0 var(--spacing-2xl)',
        }}
      >
        Each day, you'll reflect on all sixteen through practical questions
        grounded in daily life.
      </p>

      <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
        <Button onClick={onContinue} size="lg">
          Continue
        </Button>
        <Button variant="ghost" size="lg" onClick={onSkip}>
          Skip
        </Button>
      </div>
    </OnboardingStep>
  )
}
