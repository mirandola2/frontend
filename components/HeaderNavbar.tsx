'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Pages under /blog have no colored Hero band behind the navbar, so a
// transparent navbar there would leave the white text unreadable against
// the page background — keep it solid there instead of on-scroll only.
export default function HeaderNavbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBlog = pathname === '/blog' || pathname.startsWith('/blog/')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (isBlog) return
    const handleScroll = () => setScrolled(window.scrollY > 5)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isBlog])

  const solid = scrolled || isBlog

  return (
    <div
      className={`navbar text-primary-content xl:top-0 z-50 ${isBlog ? 'sticky' : 'fixed'} ${
        solid ? 'bg-primary shadow-md' : 'transparent'
      }`}
    >
      {children}
    </div>
  )
}
