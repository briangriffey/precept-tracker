import React from 'react'

interface OnboardingStepProps {
  children: React.ReactNode
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100%',
  padding: 'var(--spacing-2xl)',
  textAlign: 'center',
  maxWidth: '520px',
  margin: '0 auto',
}

export function OnboardingStep({ children }: OnboardingStepProps) {
  return <div style={containerStyle}>{children}</div>
}
