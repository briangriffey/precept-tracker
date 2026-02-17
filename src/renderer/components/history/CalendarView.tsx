import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDay } from './CalendarDay'
import type { DailyEntry } from '../../../shared/types'

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface CalendarViewProps {
  entryDetails: Map<string, DailyEntry>
  onMonthChange: (range: { start: string; end: string }) => void
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function getMonthRange(year: number, month: number) {
  const start = new Date(year, month, 1)
  const end = new Date(year, month + 1, 0)
  return {
    start: formatDate(start),
    end: formatDate(end),
  }
}

export function CalendarView({ entryDetails, onMonthChange }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [direction, setDirection] = useState(0)

  const navigate = useNavigate()

  const today = useMemo(() => formatDate(new Date()), [])

  // Build the grid: 6 weeks max, starting from Sunday
  const calendarDays = useMemo(() => {
    const { year, month } = currentMonth
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDayOfWeek = firstDay.getDay() // 0=Sun

    const days: Date[] = []

    // Fill in days from previous month
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = new Date(year, month, -i)
      days.push(d)
    }

    // Fill current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    // Fill remaining to complete last week
    const remaining = 7 - (days.length % 7)
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        days.push(new Date(year, month + 1, i))
      }
    }

    return days
  }, [currentMonth])

  const entryDates = useMemo(() => {
    const set = new Set<string>()
    for (const [date] of entryDetails) {
      set.add(date)
    }
    return set
  }, [entryDetails])

  const meditationDates = useMemo(() => {
    const set = new Set<string>()
    for (const [date, detail] of entryDetails) {
      if (detail.meditation && detail.meditation.meditated) {
        set.add(date)
      }
    }
    return set
  }, [entryDetails])

  const navigateMonth = (delta: number) => {
    setDirection(delta)
    setCurrentMonth((prev) => {
      let month = prev.month + delta
      let year = prev.year
      if (month < 0) {
        month = 11
        year--
      } else if (month > 11) {
        month = 0
        year++
      }
      const range = getMonthRange(year, month)
      onMonthChange(range)
      return { year, month }
    })
  }

  const handleDayClick = (date: Date) => {
    const dateStr = formatDate(date)
    if (entryDates.has(dateStr)) {
      navigate(`/history/${dateStr}`)
    } else {
      // Navigate to today page to create entry for that date
      navigate(`/today?date=${dateStr}`)
    }
  }

  const monthName = new Date(currentMonth.year, currentMonth.month).toLocaleString(
    'default',
    { month: 'long', year: 'numeric' }
  )

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 var(--spacing-sm)',
  }

  const monthTitleStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 500,
    color: 'var(--color-text)',
  }

  const navBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 'var(--spacing-sm)',
    fontSize: 'var(--font-size-lg)',
    color: 'var(--color-text-secondary)',
    borderRadius: 'var(--radius-md)',
    transition: 'background-color 150ms ease',
    fontFamily: 'inherit',
  }

  const weekdayHeaderStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    textAlign: 'center',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
    paddingBottom: 'var(--spacing-xs)',
    borderBottom: '1px solid var(--color-border-light)',
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '1px',
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <button
          style={navBtnStyle}
          onClick={() => navigateMonth(-1)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          &lsaquo;
        </button>
        <span style={monthTitleStyle}>{monthName}</span>
        <button
          style={navBtnStyle}
          onClick={() => navigateMonth(1)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          &rsaquo;
        </button>
      </div>

      <div style={weekdayHeaderStyle}>
        {WEEKDAY_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${currentMonth.year}-${currentMonth.month}`}
          initial={{ opacity: 0, x: direction * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -30 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          style={gridStyle}
        >
          {calendarDays.map((date) => {
            const dateStr = formatDate(date)
            const isCurrentMonth = date.getMonth() === currentMonth.month
            const isToday = dateStr === today
            const isFuture = dateStr > today

            return (
              <CalendarDay
                key={dateStr}
                date={date}
                isCurrentMonth={isCurrentMonth}
                isToday={isToday}
                isFuture={isFuture}
                hasEntry={entryDates.has(dateStr)}
                hasMeditation={meditationDates.has(dateStr)}
                onClick={handleDayClick}
              />
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
