'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

export function useToast() {
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const toast = useCallback((message: string, duration = 1500) => {
    clearTimeout(timer.current)
    setToastMessage(message)
    setShowToast(true)
    timer.current = setTimeout(() => setShowToast(false), duration)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  return { toastMessage, showToast, toast }
}
