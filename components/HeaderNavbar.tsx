'use client'

import { useState, useEffect } from 'react'

export default function HeaderNavbar({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 5)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`navbar text-primary-content fixed xl:top-0 z-50 ${
        scrolled ? 'bg-primary shadow-md' : 'transparent'
      }`}
    >
      {children}
    </div>
  )
}
