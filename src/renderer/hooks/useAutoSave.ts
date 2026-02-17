import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Debounces a save function. Calls `saveFn` after `delay` ms of inactivity.
 * Flushes any pending save immediately on unmount.
 */
export function useAutoSave<T>(
  value: T,
  saveFn: (value: T) => Promise<void>,
  delay = 500
): { saving: boolean; flush: () => void } {
  const [saving, setSaving] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const saveFnRef = useRef(saveFn)
  const valueRef = useRef(value)
  const pendingRef = useRef(false)
  const mountedRef = useRef(true)

  saveFnRef.current = saveFn
  valueRef.current = value

  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (pendingRef.current) {
      pendingRef.current = false
      setSaving(true)
      saveFnRef.current(valueRef.current).finally(() => {
        if (mountedRef.current) {
          setSaving(false)
        }
      })
    }
  }, [])

  // Track value changes and schedule debounced saves
  const isFirstRender = useRef(true)
  useEffect(() => {
    // Skip the initial render — nothing to save yet
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    pendingRef.current = true

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      pendingRef.current = false
      setSaving(true)
      saveFnRef.current(valueRef.current).finally(() => {
        if (mountedRef.current) {
          setSaving(false)
        }
      })
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [value, delay])

  // Flush on unmount
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (pendingRef.current) {
        pendingRef.current = false
        saveFnRef.current(valueRef.current)
      }
    }
  }, [])

  return { saving, flush }
}
