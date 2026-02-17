import React from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { Card } from '../ui/Card'

interface MeditationChartProps {
  data: { date: string; minutes: number }[]
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--spacing-sm) var(--spacing-md)',
      boxShadow: '0 2px 8px var(--color-shadow)',
      border: '1px solid var(--color-border-light)',
      fontSize: 'var(--font-size-sm)',
    }}>
      <div style={{ color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
        {format(parseISO(label), 'MMM d, yyyy')}
      </div>
      <div style={{ color: 'var(--color-text)', fontWeight: 500 }}>
        {payload[0].value} min
      </div>
    </div>
  )
}

export function MeditationChart({ data }: MeditationChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <h3 style={{
            fontSize: 'var(--font-size-base)',
            fontWeight: 500,
            color: 'var(--color-text)',
            margin: 0,
          }}>
            Meditation Minutes
          </h3>
        </div>
        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-2xl) 0',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--font-size-sm)',
        }}>
          No meditation data yet
        </div>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card>
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <h3 style={{
            fontSize: 'var(--font-size-base)',
            fontWeight: 500,
            color: 'var(--color-text)',
            margin: 0,
          }}>
            Meditation Minutes
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="meditationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border-light)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(d: string) => format(parseISO(d), 'MMM d')}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="minutes"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#meditationGradient)"
              animationDuration={500}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  )
}
