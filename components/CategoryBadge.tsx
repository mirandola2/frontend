const badges: Record<string, { className: string; label: string }> = {
  lc: { className: 'bg-lc text-lc-content', label: 'L/C' },
  eg: { className: 'bg-eg text-eg-content', label: 'E/G' },
  rs: { className: 'bg-rs text-rs-content', label: 'R/S' },
  cc: { className: 'bg-cc text-cc-content', label: 'Gruppo' },
}

export default function CategoryBadge({ category }: { category: string }) {
  const badge = badges[category]
  return (
    <span className={`badge border-0 font-bold ${badge?.className ?? 'bg-base-300'}`}>
      {badge?.label ?? category}
    </span>
  )
}

export function formatMonthYear(date: string, capitalize = false) {
  const formatted = new Date(date).toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })
  return capitalize ? formatted.charAt(0).toUpperCase() + formatted.slice(1) : formatted
}
