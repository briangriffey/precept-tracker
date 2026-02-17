import { useState, useEffect, useRef, useCallback } from 'react'
import { api } from '../lib/data/api'
import type { Entry, DailyEntry } from '../../shared/types'

interface DateRange {
  start: string
  end: string
}

function getMonthRange(date: Date): DateRange {
  const year = date.getFullYear()
  const month = date.getMonth()
  const start = new Date(year, month, 1)
  const end = new Date(year, month + 1, 0)
  return {
    start: formatDate(start),
    end: formatDate(end),
  }
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

export function useEntryHistory() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [entryDetails, setEntryDetails] = useState<Map<string, DailyEntry>>(new Map())
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [dateRange, setDateRange] = useState<DateRange>(() => getMonthRange(new Date()))
  const [view, setView] = useState<'calendar' | 'list'>('calendar')

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounce search query (300ms)
  useEffect(() => {
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current) }
  }, [searchQuery])

  // Fetch entries when debounced query or date range changes
  useEffect(() => {
    let cancelled = false
    setLoading(true)

    const fetchEntries = async () => {
      let result: Entry[]
      if (debouncedQuery.trim()) {
        result = await api.entry.search(debouncedQuery.trim())
        // Filter by date range
        result = result.filter(
          (e) => e.date >= dateRange.start && e.date <= dateRange.end
        )
      } else {
        result = await api.entry.list(dateRange.start, dateRange.end)
      }
      if (!cancelled) {
        setEntries(result)
        setLoading(false)
      }
    }

    fetchEntries()
    return () => { cancelled = true }
  }, [debouncedQuery, dateRange])

  // Fetch DailyEntry details for each entry
  useEffect(() => {
    let cancelled = false

    const fetchDetails = async () => {
      const details = new Map<string, DailyEntry>()
      const promises = entries.map(async (entry) => {
        const detail = await api.entry.get(entry.date)
        if (detail) {
          details.set(entry.date, detail)
        }
      })
      await Promise.all(promises)
      if (!cancelled) {
        setEntryDetails(details)
      }
    }

    if (entries.length > 0) {
      fetchDetails()
    } else {
      setEntryDetails(new Map())
    }

    return () => { cancelled = true }
  }, [entries])

  const setDateRangeStable = useCallback((range: DateRange) => {
    setDateRange(range)
  }, [])

  return {
    entries,
    entryDetails,
    loading,
    searchQuery,
    setSearchQuery,
    dateRange,
    setDateRange: setDateRangeStable,
    view,
    setView,
  }
}
