'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { DRAWER_ID } from './navigation'

function subscribeScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

// Pages under /blog have no colored Hero band behind the navbar, so a
// transparent navbar there would leave the white text unreadable against
// the page background — keep it solid there instead of on-scroll only.
export default function HeaderNavbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBlog = pathname === '/blog' || pathname.startsWith('/blog/')
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 5, () => false)

  // Client-side navigation doesn't reload the page: close the mobile drawer and
  // any focused dropdown when one of their links is clicked.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.('a')
      if (!link) return
      if (link.closest('.drawer-side')) {
        const toggle = document.getElementById(DRAWER_ID) as HTMLInputElement | null
        if (toggle) toggle.checked = false
      }
      if (link.closest('.dropdown')) {
        (document.activeElement as HTMLElement | null)?.blur()
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const solid = scrolled || isBlog

  return (
    <div
      className={`navbar top-0 z-50 text-primary-content transition-[background-color,box-shadow] duration-300 ${
        isBlog ? 'sticky' : 'fixed'
      } ${solid ? 'bg-primary shadow-md' : 'bg-transparent'}`}
    >
      {children}
    </div>
  )
}
