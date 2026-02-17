import { OnboardingStep } from '../OnboardingStep'
import { Button } from '../../ui'

interface WelcomeStepProps {
  onContinue: () => void
  onSkip: () => void
}

export function WelcomeStep({ onContinue, onSkip }: WelcomeStepProps) {
  return (
    <OnboardingStep>
      <h1
        style={{
          fontSize: 'var(--font-size-3xl)',
          color: 'var(--color-text)',
          margin: '0 0 var(--spacing-lg)',
          fontWeight: 300,
        }}
      >
        Welcome to Precept Tracker
      </h1>

      <p
        style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
          margin: '0 0 var(--spacing-lg)',
        }}
      >
        A daily journal for reflecting on the 16 Precepts of Soto Zen Buddhism.
        Each day, you'll be guided through practical questions about how you
        lived the precepts.
      </p>

      <p
        style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-muted)',
          fontStyle: 'italic',
          margin: '0 0 var(--spacing-2xl)',
        }}
      >
        This isn't about perfection. It's about paying attention.
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
