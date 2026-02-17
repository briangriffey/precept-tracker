import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { WelcomeStep } from './steps/WelcomeStep'
import { PreceptsIntroStep } from './steps/PreceptsIntroStep'
import { PracticeSetupStep } from './steps/PracticeSetupStep'
import { api } from '../../lib/data/api'

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

const slideTransition = {
  duration: 0.35,
  ease: [0.4, 0, 0.2, 1] as const,
}

export function OnboardingFlow() {
  const navigate = useNavigate()
  const [[step, direction], setStep] = useState([0, 0])

  const next = useCallback(() => setStep(([s]) => [s + 1, 1]), [])

  const complete = useCallback(async () => {
    await api.setting.set('onboarding_complete', 'true')
    navigate('/today', { replace: true })
  }, [navigate])

  const handlePracticeComplete = useCallback(
    async (settings: {
      reminderTime: string
      reminderEnabled: boolean
      weeklyDay: string
    }) => {
      await Promise.all([
        api.setting.set('reminder_time', settings.reminderTime),
        api.setting.set('reminder_enabled', String(settings.reminderEnabled)),
        api.setting.set('weekly_reflection_day', settings.weeklyDay),
      ])
      await complete()
    },
    [complete]
  )

  // Progress dots
  const totalSteps = 3

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'var(--color-bg)',
        overflow: 'hidden',
      }}
    >
      {/* Step content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {step === 0 && (
              <WelcomeStep onContinue={next} onSkip={complete} />
            )}
            {step === 1 && (
              <PreceptsIntroStep onContinue={next} onSkip={complete} />
            )}
            {step === 2 && (
              <PracticeSetupStep
                onComplete={handlePracticeComplete}
                onSkip={complete}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--spacing-sm)',
          padding: 'var(--spacing-xl)',
        }}
      >
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: 'var(--radius-full)',
              backgroundColor:
                i === step
                  ? 'var(--color-primary)'
                  : 'var(--color-border)',
              transition: 'background-color 200ms ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
