'use client'

import { useState, useCallback } from 'react'

export function useToast() {
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const toast = useCallback((message: string, duration = 1000) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), duration)
  }, [])

  return { toastMessage, showToast, toast }
}
