import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { preceptGroups } from '../../lib/precepts'

interface PreceptRatingsChartProps {
  data: { preceptNumber: number; average: number }[]
}

export function PreceptRatingsChart({ data }: PreceptRatingsChartProps) {
  const ratingsMap = new Map(data.map(d => [d.preceptNumber, d.average]))

  const hasData = data.length > 0

  if (!hasData) {
    return (
      <Card>
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <h3 style={{
            fontSize: 'var(--font-size-base)',
            fontWeight: 500,
            color: 'var(--color-text)',
            margin: 0,
          }}>
            Average Ratings by Precept
          </h3>
        </div>
        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-2xl) 0',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--font-size-sm)',
        }}>
          No rating data yet
        </div>
      </Card>
    )
  }

  let barIndex = 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
    >
      <Card>
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <h3 style={{
            fontSize: 'var(--font-size-base)',
            fontWeight: 500,
            color: 'var(--color-text)',
            margin: 0,
          }}>
            Average Ratings by Precept
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          {preceptGroups.map((group) => (
            <div key={group.id}>
              <div style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {group.name}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {group.precepts.map((precept) => {
                  const avg = ratingsMap.get(precept.number)
                  const idx = barIndex++
                  return (
                    <BarRow
                      key={precept.number}
                      number={precept.number}
                      label={precept.shortName}
                      average={avg ?? null}
                      index={idx}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

function BarRow({
  number,
  label,
  average,
  index,
}: {
  number: number
  label: string
  average: number | null
  index: number
}) {
  const pct = average != null ? (average / 5) * 100 : 0

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1.5rem 1fr auto',
      alignItems: 'center',
      gap: 'var(--spacing-sm)',
      minHeight: '1.5rem',
    }}>
      <span style={{
        fontSize: 'var(--font-size-sm)',
        color: 'var(--color-text-muted)',
        textAlign: 'right',
      }}>
        {number}.
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
        <span style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          whiteSpace: 'nowrap',
          minWidth: '9rem',
        }}>
          {label}
        </span>
        <div style={{
          flex: 1,
          height: '0.625rem',
          backgroundColor: 'var(--color-surface-hover)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
        }}>
          {average != null && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{
                duration: 0.4,
                delay: index * 0.03,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                height: '100%',
                backgroundColor: 'var(--color-primary)',
                borderRadius: 'var(--radius-full)',
              }}
            />
          )}
        </div>
      </div>
      <span style={{
        fontSize: 'var(--font-size-sm)',
        color: average != null ? 'var(--color-text)' : 'var(--color-text-muted)',
        fontWeight: average != null ? 500 : 400,
        minWidth: '2rem',
        textAlign: 'right',
      }}>
        {average != null ? average.toFixed(1) : '—'}
      </span>
    </div>
  )
}
