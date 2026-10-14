'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const normalize = (p: string) => p.replace(/\/+$/, '') || '/'

export default function NavLink({
  href,
  className = '',
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  const active = normalize(usePathname()) === normalize(href)

  return (
    <Link href={href} aria-current={active ? 'page' : undefined} className={className}>
      {children}
    </Link>
  )
}
