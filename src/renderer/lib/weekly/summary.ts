import { startOfWeek, endOfWeek, format } from 'date-fns'

/**
 * Get Monday-based week boundaries for a given date.
 */
export function getWeekBounds(date: Date): { weekStart: string; weekEnd: string } {
  const monday = startOfWeek(date, { weekStartsOn: 1 })
  const sunday = endOfWeek(date, { weekStartsOn: 1 })
  return {
    weekStart: format(monday, 'yyyy-MM-dd'),
    weekEnd: format(sunday, 'yyyy-MM-dd'),
  }
}

/**
 * Get week bounds offset by a number of weeks from a reference date.
 * Negative offset = past weeks.
 */
export function getWeekBoundsOffset(
  referenceDate: Date,
  offsetWeeks: number
): { weekStart: string; weekEnd: string } {
  const shifted = new Date(referenceDate)
  shifted.setDate(shifted.getDate() + offsetWeeks * 7)
  return getWeekBounds(shifted)
}

/**
 * Check if a week is in the future relative to today.
 */
export function isWeekInFuture(weekStart: string): boolean {
  const today = new Date()
  const { weekStart: currentWeekStart } = getWeekBounds(today)
  return weekStart > currentWeekStart
}
