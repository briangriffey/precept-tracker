import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { api } from '../../lib/data/api'

interface OnboardingGuardProps {
  children: React.ReactNode
}

export function OnboardingGuard({ children }: OnboardingGuardProps) {
  const [status, setStatus] = useState<'loading' | 'onboarding' | 'ready'>('loading')

  useEffect(() => {
    api.setting.get('onboarding_complete').then((value) => {
      setStatus(value === 'true' ? 'ready' : 'onboarding')
    })
  }, [])

  if (status === 'loading') return null
  if (status === 'onboarding') return <Navigate to="/onboarding" replace />
  return <>{children}</>
}
