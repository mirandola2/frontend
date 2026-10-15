import Link from 'next/link'
import {
  ArrowRight,
  ArrowSquareOut,
  ClipboardText,
  FilmSlate,
  ListChecks,
  Newspaper,
  Target,
} from '@phosphor-icons/react/ssr'
import type { Icon } from '@phosphor-icons/react'

interface LnkProps {
  href: string
  /** Icon name used in the MDX content, e.g. icon="newspaper" */
  icon?: string
  /** Open in the same tab (external links open in a new tab by default). */
  self?: boolean
  children: React.ReactNode
}

// Names used in the content (historically Material Symbols names) -> Phosphor icons.
// Add an entry here to use a new icon from MDX.
const icons: Record<string, Icon> = {
  newspaper: Newspaper,
  movie: FilmSlate,
  checklist: ListChecks,
  other_admission: ClipboardText,
  center_focus_strong: Target,
  open_in_new: ArrowSquareOut,
  east: ArrowRight,
}

export default function Lnk({ href, icon, self = false, children }: LnkProps) {
  const newTab = href.startsWith('http') && !self
  const IconComponent = (icon && icons[icon]) || (newTab ? ArrowSquareOut : ArrowRight)

  return (
    <Link
      href={href}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="not-prose btn btn-primary btn-sm my-1"
    >
      <IconComponent size={18} weight="bold" aria-hidden />
      {children}
    </Link>
  )
}
