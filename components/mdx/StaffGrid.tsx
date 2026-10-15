'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
// Only the public fields: names are already resolved on the server (see Staff.tsx).
export interface StaffPerson {
  name: string
  ruolo: string
  staff: string
  desc?: string
  img?: string
}

interface StaffGridProps {
  people: StaffPerson[]
  initialStaff: string
  showBadges?: boolean
  showDesc?: boolean
  selector?: boolean
}

const staffLabels: Record<string, string> = {
  L: 'Lupetti',
  C: 'Coccinelle',
  E: 'Esploratori',
  G: 'Guide',
  N: 'Noviziato',
  CF: 'Clan Fuoco',
  CC: 'Co.Ca.',
  CJ: 'Co.Ca.',
}

const staffColors: Record<string, string> = {
  L: 'bg-lc text-lc-content',
  C: 'bg-lc text-lc-content',
  E: 'bg-eg text-eg-content',
  G: 'bg-eg text-eg-content',
  N: 'bg-rs text-rs-content',
  CF: 'bg-rs text-rs-content',
  CC: 'bg-cc text-cc-content',
  CJ: 'bg-cc text-cc-content',
}

// `ruolo` is "general role|role inside the staff": show the specific one when filtering by staff.
function getRole(ruolo: string | undefined, allStaff: boolean) {
  const roles = ruolo?.split('|') ?? []
  return allStaff ? roles[0] : (roles[1] ?? roles[0])
}

export default function StaffGrid({
  people,
  initialStaff,
  showBadges = false,
  showDesc = true,
  selector = false,
}: StaffGridProps) {
  const [actualStaff, setActualStaff] = useState(initialStaff)

  const filtered = useMemo(
    () => people.filter(p => actualStaff === '*' || p.staff?.split('|').includes(actualStaff)),
    [people, actualStaff],
  )

  return (
    <>
      {selector && (
        <div className="flex justify-end mb-4">
        <select
          className="select select-primary w-full max-w-xs"
          aria-label="Filtra per staff"
          value={actualStaff}
          onChange={e => setActualStaff(e.target.value)}
        >
          <option value="*">Tutti i Capi</option>
          <option value="CJ">Capi Gruppo</option>
          <option value="L">Lupetti</option>
          <option value="C">Coccinelle</option>
          <option value="E">Esploratori</option>
          <option value="G">Guide</option>
          <option value="N">Noviziato</option>
          <option value="CF">Clan Fuoco</option>
          <option value="CC">Altri incarichi</option>
        </select>
        </div>
      )}
      <div className="not-prose clear-both grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((person, i) => (
          <div key={person.name + i} className="card bg-base-200 transition-shadow hover:shadow-md">
            <div className="card-body p-5">
              <div className="flex gap-4 justify-start items-start mb-4">
                <Image
                  src={person.img ? `/img/staff/${person.img}` : `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(person.name)}`}
                  alt={person.name}
                  width={112}
                  height={112}
                  className="mask mask-squircle w-28 h-28 drop-shadow-lg pointer-events-none object-cover"
                />
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-primary">{person.name}</h2>
                  <p>{getRole(person.ruolo, actualStaff === '*')}</p>
                  {showBadges && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {person.staff?.split('|').map(s => (
                        <span key={s} className={`badge badge-lg font-bold border-0 ${staffColors[s] || 'bg-base-300'}`}>
                          {staffLabels[s] || s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {showDesc && person.desc && <p className="text-sm">{person.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
