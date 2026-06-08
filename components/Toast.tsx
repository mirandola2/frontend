'use client'

import { useEffect, useState, useCallback } from 'react'

interface ToastProps {
  message: string
  duration?: number
  onClose?: () => void
}

export default function Toast({ message, duration = 1000, onClose }: ToastProps) {
  const [show, setShow] = useState(true)

  const hide = useCallback(() => {
    setShow(false)
    onClose?.()
  }, [onClose])

  useEffect(() => {
    const timer = setTimeout(hide, duration)
    return () => clearTimeout(timer)
  }, [duration, hide])

  if (!show) return null

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-neutral text-neutral-content px-6 py-3 rounded-lg z-[9999] shadow-lg cursor-pointer"
      onClick={hide}
    >
      {message}
    </div>
  )
}
