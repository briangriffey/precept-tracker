import { useState, useEffect, useCallback, useRef } from 'react'
import type { DailyEntry, PreceptResponse, MeditationLog } from '../../shared/types'
import { api } from '../lib/data/api'
import { useAutoSave } from './useAutoSave'

interface ResponseUpdate {
  preceptNumber: number
  response: string | null
  rating: number | null
  promptText: string
}

interface MeditationUpdate {
  meditated: boolean
  minutes: number
  notes: string | null
}

interface PendingSaves {
  responses: Map<number, ResponseUpdate>
  meditation: MeditationUpdate | null
  version: number
}

export function useDailyEntry(date: string) {
  const [entry, setEntry] = useState<DailyEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [pendingSaves, setPendingSaves] = useState<PendingSaves>({
    responses: new Map(),
    meditation: null,
    version: 0,
  })
  const entryIdRef = useRef<number | null>(null)

  // Load entry
  useEffect(() => {
    let cancelled = false
    setLoading(true)

    api.entry.getOrCreate(date).then((dailyEntry) => {
      if (cancelled) return
      setEntry(dailyEntry)
      entryIdRef.current = dailyEntry.entry.id
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [date])

  // Save function
  const savePending = useCallback(async (saves: PendingSaves) => {
    const entryId = entryIdRef.current
    if (!entryId) return

    const promises: Promise<unknown>[] = []

    for (const update of saves.responses.values()) {
      promises.push(
        api.response.upsert(
          entryId,
          update.preceptNumber,
          update.response,
          update.rating,
          update.promptText
        )
      )
    }

    if (saves.meditation) {
      const m = saves.meditation
      promises.push(
        api.meditation.upsert(entryId, m.meditated, m.minutes, m.notes)
      )
    }

    await Promise.all(promises)
  }, [])

  const { status } = useAutoSave(pendingSaves, savePending)

  const updateResponse = useCallback(
    (preceptNumber: number, response: string | null, rating: number | null, promptText: string) => {
      // Optimistic local update
      setEntry((prev) => {
        if (!prev) return prev
        const existing = prev.responses.find((r) => r.preceptNumber === preceptNumber)
        let newResponses: PreceptResponse[]
        if (existing) {
          newResponses = prev.responses.map((r) =>
            r.preceptNumber === preceptNumber
              ? { ...r, response, rating, promptText }
              : r
          )
        } else {
          newResponses = [
            ...prev.responses,
            {
              id: -preceptNumber, // temporary id
              entryId: prev.entry.id,
              preceptNumber,
              response,
              rating,
              promptText,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ]
        }
        return { ...prev, responses: newResponses }
      })

      // Queue save
      setPendingSaves((prev) => {
        const newMap = new Map(prev.responses)
        newMap.set(preceptNumber, { preceptNumber, response, rating, promptText })
        return { responses: newMap, meditation: prev.meditation, version: prev.version + 1 }
      })
    },
    []
  )

  const updateMeditation = useCallback(
    (meditated: boolean, minutes: number, notes: string | null) => {
      setEntry((prev) => {
        if (!prev) return prev
        const newMeditation: MeditationLog = {
          ...prev.meditation,
          meditated,
          minutes,
          notes,
        }
        return { ...prev, meditation: newMeditation }
      })

      setPendingSaves((prev) => ({
        responses: prev.responses,
        meditation: { meditated, minutes, notes },
        version: prev.version + 1,
      }))
    },
    []
  )

  return {
    entry,
    loading,
    saving: status === 'saving',
    saveStatus: status,
    updateResponse,
    updateMeditation,
  }
}
