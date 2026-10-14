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

export default function Card({ title, color, children }: CardProps) {
  return (
    <div className={`card ${cardBg[color || 'base'] || 'bg-base-200'} rounded-box`}>
      <div className="card-body">
        {title && <h3 className="card-title">{title}</h3>}
        {children}
      </div>
    </div>
  )
}
