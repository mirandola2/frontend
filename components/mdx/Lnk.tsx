import Link from 'next/link'
import { ArrowRightIcon, ArrowSquareOutIcon, ClipboardTextIcon, FilmSlateIcon, ListChecksIcon, NewspaperIcon, TargetIcon } from '@phosphor-icons/react/ssr'
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
  newspaper: NewspaperIcon,
  movie: FilmSlateIcon,
  checklist: ListChecksIcon,
  other_admission: ClipboardTextIcon,
  center_focus_strong: TargetIcon,
  open_in_new: ArrowSquareOutIcon,
  east: ArrowRightIcon,
}

export default function Lnk({ href, icon, self = false, children }: LnkProps) {
  const newTab = href.startsWith('http') && !self
  const IconComponent = (icon && icons[icon]) || (newTab ? ArrowSquareOutIcon : ArrowRightIcon)

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
