interface CardProps {
  title?: string
  color?: string
  big?: boolean
  children: React.ReactNode
}

const cardBg: Record<string, string> = {
  lc: 'bg-lc text-lc-content',
  eg: 'bg-eg text-eg-content',
  rs: 'bg-rs text-rs-content',
  cc: 'bg-cc text-cc-content',
  base: 'bg-base-200',
  primary: 'bg-primary text-primary-content',
}

// `not-prose`: everything inside a coloured card (title, bold, links, lists) uses only the
// card's content colour, also when the card sits directly in a page's prose.
const content = 'not-prose [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5'

export default function Card({ title, color = 'base', big = false, children }: CardProps) {
  return (
    <div className={`card ${cardBg[color] || cardBg.base} ${big ? 'md:col-span-2' : ''} ${content}`}>
      <div className="card-body">
        {title && <h3 className="card-title text-xl">{title}</h3>}
        {children}
      </div>
    </div>
  )
}
