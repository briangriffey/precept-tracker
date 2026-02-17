import { useEffect, useRef, useCallback, useState } from 'react'

type SaveStatus = 'idle' | 'saving' | 'saved'

export function useAutoSave<T>(
  value: T,
  saveFn: (value: T) => Promise<void>,
  delay = 500
): { saving: boolean; status: SaveStatus } {
  const [status, setStatus] = useState<SaveStatus>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const saveFnRef = useRef(saveFn)
  const valueRef = useRef(value)
  const pendingRef = useRef(false)
  const mountedRef = useRef(true)
  const initialRef = useRef(true)

  saveFnRef.current = saveFn
  valueRef.current = value

  const doSave = useCallback(async () => {
    if (!pendingRef.current) return
    pendingRef.current = false
    setStatus('saving')
    try {
      await saveFnRef.current(valueRef.current)
      if (mountedRef.current) setStatus('saved')
    } catch {
      if (mountedRef.current) setStatus('idle')
    }
  }, [])

  useEffect(() => {
    // Skip the initial render — we don't want to save on load
    if (initialRef.current) {
      initialRef.current = false
      return
    }

    pendingRef.current = true
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(doSave, delay)
  }, [value, delay, doSave])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      // Flush pending save on unmount
      if (pendingRef.current) {
        saveFnRef.current(valueRef.current)
      }
    }
  }, [])

  return { saving: status === 'saving', status }
}
