import Link from 'next/link'

interface LnkProps {
  href: string
  icon?: string
  /** Open in the same tab (external links open in a new tab by default). */
  self?: boolean
  children: React.ReactNode
}

export default function Lnk({ href, icon, self = false, children }: LnkProps) {
  const newTab = href.startsWith('http') && !self

  return (
    <Link
      href={href}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="not-prose btn btn-primary btn-sm my-1"
    >
      <span className="material-symbols-rounded text-lg!" aria-hidden="true">
        {icon || (newTab ? 'open_in_new' : 'east')}
      </span>
      {children}
    </Link>
  )
}
