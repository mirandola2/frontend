import Link from 'next/link'

interface LnkProps {
  href: string
  icon?: string
  self?: boolean
  children: React.ReactNode
}

export default function Lnk({ href, icon, children }: LnkProps) {
  const isExternal = href.startsWith('http')

  return (
    <Link
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex items-center gap-2 btn btn-primary btn-sm"
    >
      {icon && <span className="material-symbols-rounded text-lg">{icon}</span>}
      {children}
    </Link>
  )
}
