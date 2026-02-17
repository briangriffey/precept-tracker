import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { format, startOfWeek, addDays, differenceInWeeks } from 'date-fns'
import { Card } from '../ui/Card'
import type { TimeRange } from '../../hooks/useTrendsData'

interface CompletionHeatmapProps {
  data: { date: string; count: number }[]
  range: TimeRange
}

function getIntensity(count: number): string {
  if (count === 0) return 'var(--color-surface-hover)'
  if (count <= 5) return 'color-mix(in srgb, var(--color-primary) 25%, var(--color-surface))'
  if (count <= 10) return 'color-mix(in srgb, var(--color-primary) 50%, var(--color-surface))'
  if (count <= 15) return 'color-mix(in srgb, var(--color-primary) 75%, var(--color-surface))'
  return 'var(--color-primary)'
}

const DAY_LABELS = ['', 'M', '', 'W', '', 'F', '']

function rangeToDays(range: TimeRange): number {
  switch (range) {
    case '7d': return 7
    case '30d': return 30
    case '90d': return 90
    case 'all': return 365
  }
}

export function CompletionHeatmap({ data, range }: CompletionHeatmapProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null)

  const { grid, monthLabels } = useMemo(() => {
    const days = rangeToDays(range)
    const endDate = new Date()
    const startDate = addDays(endDate, -days + 1)
    const weekStart = startOfWeek(startDate, { weekStartsOn: 0 })
    const numWeeks = differenceInWeeks(endDate, weekStart) + 1

    const dataMap = new Map(data.map(d => [d.date, d.count]))

    const cells: { date: Date; count: number; col: number; row: number }[] = []
    const months: { label: string; col: number }[] = []
    let lastMonth = -1

    for (let w = 0; w < numWeeks; w++) {
      for (let d = 0; d < 7; d++) {
        const cellDate = addDays(weekStart, w * 7 + d)
        if (cellDate > endDate) continue
        const dateStr = format(cellDate, 'yyyy-MM-dd')
        cells.push({
          date: cellDate,
          count: dataMap.get(dateStr) ?? 0,
          col: w,
          row: d,
        })

        const month = cellDate.getMonth()
        if (month !== lastMonth && d === 0) {
          months.push({ label: format(cellDate, 'MMM'), col: w })
          lastMonth = month
        }
      }
    }

    return { grid: cells, monthLabels: months }
  }, [data, range])

  const cellSize = 12
  const cellGap = 2
  const labelWidth = 20
  const headerHeight = 18

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
            Journal Completion
          </h3>
        </div>
        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-2xl) 0',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--font-size-sm)',
        }}>
          No journal entries yet
        </div>
      </Card>
    )
  }

  const maxCol = Math.max(...grid.map(c => c.col), 0)
  const svgWidth = labelWidth + (maxCol + 1) * (cellSize + cellGap)
  const svgHeight = headerHeight + 7 * (cellSize + cellGap)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
    >
      <Card>
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <h3 style={{
            fontSize: 'var(--font-size-base)',
            fontWeight: 500,
            color: 'var(--color-text)',
            margin: 0,
          }}>
            Journal Completion
          </h3>
        </div>
        <div style={{ overflowX: 'auto', position: 'relative' }}>
          <svg width={svgWidth} height={svgHeight} style={{ display: 'block' }}>
            {/* Month labels */}
            {monthLabels.map((m, i) => (
              <text
                key={i}
                x={labelWidth + m.col * (cellSize + cellGap)}
                y={12}
                fill="var(--color-text-muted)"
                fontSize={10}
              >
                {m.label}
              </text>
            ))}

            {/* Day labels */}
            {DAY_LABELS.map((label, i) =>
              label ? (
                <text
                  key={i}
                  x={0}
                  y={headerHeight + i * (cellSize + cellGap) + cellSize - 2}
                  fill="var(--color-text-muted)"
                  fontSize={10}
                >
                  {label}
                </text>
              ) : null
            )}

            {/* Cells */}
            {grid.map((cell, i) => (
              <rect
                key={i}
                x={labelWidth + cell.col * (cellSize + cellGap)}
                y={headerHeight + cell.row * (cellSize + cellGap)}
                width={cellSize}
                height={cellSize}
                rx={2}
                fill={getIntensity(cell.count)}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  setTooltip({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 8,
                    text: `${format(cell.date, 'MMM d')}: ${cell.count} of 16 precepts`,
                  })
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            ))}
          </svg>
          {tooltip && (
            <div style={{
              position: 'fixed',
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-md)',
              padding: '0.375rem 0.625rem',
              boxShadow: '0 2px 8px var(--color-shadow)',
              border: '1px solid var(--color-border-light)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 10,
            }}>
              {tooltip.text}
            </div>
          )}

          {/* Legend */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            marginTop: 'var(--spacing-sm)',
            justifyContent: 'flex-end',
            fontSize: 10,
            color: 'var(--color-text-muted)',
          }}>
            <span>Less</span>
            {[0, 4, 8, 12, 16].map((count) => (
              <div
                key={count}
                style={{
                  width: cellSize,
                  height: cellSize,
                  borderRadius: 2,
                  backgroundColor: getIntensity(count),
                }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
