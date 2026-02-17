import { useState, useEffect, useCallback } from 'react'
import { api } from '../lib/data/api'

export function useSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    api.setting.getAll().then((all) => {
      if (cancelled) return
      const map: Record<string, string> = {}
      for (const s of all) {
        map[s.key] = s.value
      }
      setSettings(map)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  const getSetting = useCallback(
    (key: string): string | undefined => settings[key],
    [settings]
  )

  const setSetting = useCallback(
    async (key: string, value: string): Promise<void> => {
      setSettings((prev) => ({ ...prev, [key]: value }))
      await api.setting.set(key, value)
    },
    []
  )

  return { settings, loading, getSetting, setSetting }
}
