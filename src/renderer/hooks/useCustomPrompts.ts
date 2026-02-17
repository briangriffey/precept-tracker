import { useState, useEffect, useCallback } from 'react'
import { api } from '../lib/data/api'
import { getPreceptByNumber } from '../lib/precepts'
import type { CustomPrompt } from '../../shared/types'

export function useCustomPrompts(preceptNumber: number) {
  const [customPrompts, setCustomPrompts] = useState<CustomPrompt[]>([])
  const [loading, setLoading] = useState(true)

  const precept = getPreceptByNumber(preceptNumber)
  const defaultPrompts = precept?.defaultPrompts ?? []

  const allActivePrompts = [
    ...defaultPrompts,
    ...customPrompts.filter((p) => p.isActive).map((p) => p.promptText),
  ]

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    api.prompt.list(preceptNumber).then((prompts) => {
      if (!cancelled) {
        setCustomPrompts(prompts)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [preceptNumber])

  const addPrompt = useCallback(
    async (text: string) => {
      const created = await api.prompt.create(preceptNumber, text)
      setCustomPrompts((prev) => [...prev, created])
    },
    [preceptNumber]
  )

  const updatePrompt = useCallback(async (id: number, text: string) => {
    const updated = await api.prompt.update(id, { promptText: text })
    setCustomPrompts((prev) => prev.map((p) => (p.id === id ? updated : p)))
  }, [])

  const deletePrompt = useCallback(async (id: number) => {
    await api.prompt.delete(id)
    setCustomPrompts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return {
    defaultPrompts,
    customPrompts,
    allActivePrompts,
    loading,
    addPrompt,
    updatePrompt,
    deletePrompt,
  }
}
