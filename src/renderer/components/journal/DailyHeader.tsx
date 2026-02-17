import { motion } from 'framer-motion'
import { animation } from '../../lib/design/tokens'
import { getDailyGreeting } from '../../lib/encouragement'

interface DailyHeaderProps {
  date: string
}

export function DailyHeader({ date }: DailyHeaderProps) {
  const greeting = getDailyGreeting(date)

  const formatted = new Date(date + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.header
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: animation.pageFade.duration,
        ease: animation.pageFade.ease,
      }}
      style={{
        marginBottom: 'var(--spacing-xl)',
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: 'var(--font-size-2xl)',
          color: 'var(--color-text)',
        }}
      >
        {formatted}
      </h1>
      <p
        style={{
          margin: 'var(--spacing-sm) 0 0',
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          fontStyle: 'italic',
          lineHeight: 1.6,
        }}
      >
        {greeting}
      </p>
    </motion.header>
  )
}
