'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import staffData from '@/lib/staff-data.json'

interface StaffMember {
  nome: string
  nomeCaccia?: string
  ruolo: string
  staff: string
  coca: number
  desc?: string
  img: string
  order: number
}

interface StaffProps {
  staff: string
  coca?: boolean
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
  L: 'bg-lc',
  C: 'bg-lc',
  E: 'bg-eg',
  G: 'bg-eg',
  N: 'bg-rs',
  CF: 'bg-rs',
  CC: 'bg-cc',
  CJ: 'bg-cc',
}

export default function StaffComponent({ staff: initialStaff, coca = false, selector = false }: StaffProps) {
  const allStaff = useMemo(() => staffData as StaffMember[], [])
  const [actualStaff, setActualStaff] = useState(initialStaff)

  const filtered = useMemo(() =>
    allStaff.filter(p =>
      (actualStaff === '*' || p.staff?.split('|').includes(actualStaff)) &&
      (!coca || p.coca === 1)
    ).sort((a, b) => a.order - b.order),
    [allStaff, actualStaff, coca]
  )

  return (
    <>
      {selector && (
        <select
          className="select rounded-full select-primary w-full max-w-xs block ml-auto mb-3"
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
      )}
      <div className="not-prose clear-both grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(person => (
          <div key={person.nome + person.order} className="card bg-base-200">
            <div className="card-body p-5">
              <div className="flex gap-4 justify-start items-top mb-4">
                <Image
                  src={person.img ? `/img/staff/${person.img}` : `https://api.dicebear.com/7.x/thumbs/svg?seed=${person.nome}`}
                  alt={person.nome}
                  width={112}
                  height={112}
                  className="mask mask-squircle w-28 h-28 drop-shadow-lg pointer-events-none object-cover"
                />
                <div>
                  {coca && <h2 className="text-xl font-bold">{person.nome}</h2>}
                  {!coca && <h2 className="text-xl font-bold">{person.nome.split(' ').slice(0, -1).join(' ')}</h2>}
                  <p>{actualStaff === '*' ? person.ruolo?.split('|')[0] : person.ruolo?.split('|').length > 1 ? person.ruolo?.split('|')[1] : person.ruolo?.split('|')[0]}</p>
                  {coca && person.staff?.split('|').map(s => (
                    <span key={s} className={`badge font-bold badge-lg ${staffColors[s] || ''}`}>
                      {staffLabels[s] || s}
                    </span>
                  ))}
                </div>
              </div>
              {!coca && <p className="text-sm">{person.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
