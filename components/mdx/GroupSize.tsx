const groups = [
  { count: '~80', label: 'Lupetti e Coccinelle', className: 'bg-lc text-lc-content' },
  { count: '~60', label: 'Esploratori e Guide', className: 'bg-eg text-eg-content' },
  { count: '~30', label: 'Rover e Scolte', className: 'bg-rs text-rs-content' },
  { count: '~30', label: 'Capi', className: 'bg-cc text-cc-content' },
]

export default function GroupSize() {
  return (
    <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
      {groups.map(group => (
        <div key={group.label} className={`card ${group.className}`}>
          <div className="card-body items-center text-center">
            <span className="text-4xl font-display">{group.count}</span>
            <span className="text-sm font-bold">{group.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
