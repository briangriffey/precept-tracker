import { useState, useEffect, useCallback, useRef } from 'react'
import { api } from '../lib/data/api'
import { useAutoSave } from './useAutoSave'
import type { DailyEntry, PreceptResponse, MeditationLog } from '../../shared/types'

interface PendingSave {
  responses: Map<number, { response: string | null; rating: number | null; promptText: string }>
  meditation: { meditated: boolean; minutes: number; notes: string | null } | null
}

export function useDailyEntry(date: string) {
  const [entry, setEntry] = useState<DailyEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [pendingSave, setPendingSave] = useState<PendingSave>({
    responses: new Map(),
    meditation: null,
  })

  // Track a serializable version of pendingSave for useAutoSave change detection
  const [saveVersion, setSaveVersion] = useState(0)
  const pendingSaveRef = useRef(pendingSave)
  pendingSaveRef.current = pendingSave

  // Load entry on mount or date change
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setEntry(null)
    setPendingSave({ responses: new Map(), meditation: null })
    setSaveVersion(0)

    api.entry.getOrCreate(date).then((dailyEntry) => {
      if (!cancelled) {
        setEntry(dailyEntry)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [date])

  // Save function that persists all pending changes
  const savePending = useCallback(async () => {
    const current = pendingSaveRef.current
    if (!entry) return

    const promises: Promise<PreceptResponse | MeditationLog>[] = []

    current.responses.forEach((data, preceptNumber) => {
      promises.push(
        api.response.upsert(
          entry.entry.id,
          preceptNumber,
          data.response,
          data.rating,
          data.promptText
        )
      )
    })

    if (current.meditation) {
      promises.push(
        api.meditation.upsert(
          entry.entry.id,
          current.meditation.meditated,
          current.meditation.minutes,
          current.meditation.notes
        )
      )
    }

    if (promises.length > 0) {
      await Promise.all(promises)
      // Clear pending state after successful save
      setPendingSave({ responses: new Map(), meditation: null })
    }
  }, [entry])

  const { saving, flush } = useAutoSave(saveVersion, savePending)

  const updateResponse = useCallback(
    (preceptNumber: number, response: string | null, rating: number | null, promptText: string) => {
      // Update local state immediately for responsive UI
      setEntry((prev) => {
        if (!prev) return prev
        const existing = prev.responses.find((r) => r.preceptNumber === preceptNumber)
        const updatedResponses = existing
          ? prev.responses.map((r) =>
              r.preceptNumber === preceptNumber
                ? { ...r, response, rating, promptText }
                : r
            )
          : [
              ...prev.responses,
              {
                id: 0,
                entryId: prev.entry.id,
                preceptNumber,
                response,
                rating,
                promptText,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ]
        return { ...prev, responses: updatedResponses }
      })

      // Queue for debounced save
      setPendingSave((prev) => {
        const next = { ...prev, responses: new Map(prev.responses) }
        next.responses.set(preceptNumber, { response, rating, promptText })
        return next
      })
      setSaveVersion((v) => v + 1)
    },
    []
  )

  const updateMeditation = useCallback(
    (meditated: boolean, minutes: number, notes: string | null) => {
      setEntry((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          meditation: { ...prev.meditation, meditated, minutes, notes },
        }
      })

      setPendingSave((prev) => ({
        ...prev,
        meditation: { meditated, minutes, notes },
      }))
      setSaveVersion((v) => v + 1)
    },
    []
  )

  return {
    entry,
    loading,
    saving,
    flush,
    updateResponse,
    updateMeditation,
  }
}
