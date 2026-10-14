'use client'

import { useState, useEffect, useMemo, useDeferredValue } from 'react'

interface TotemPerson {
  name: string
  totem: string
  location: string
  year: string
}

interface TotemGroup {
  key: string
  year: string
  location: string
  people: TotemPerson[]
}

type Status = 'loading' | 'loaded' | 'error'

export default function TotemTable({ children }: { children: React.ReactNode }) {
  const [totem, setTotem] = useState<TotemPerson[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [filter, setFilter] = useState('')
  const deferredFilter = useDeferredValue(filter)

  useEffect(() => {
    fetch('https://people.mirandola2.workers.dev/totem')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((t: TotemPerson[]) => {
        setTotem(t)
        setStatus('loaded')
      })
      .catch(() => setStatus('error'))
  }, [])

  const groups = useMemo(() => {
    const query = deferredFilter.trim().toLowerCase()
    const result = new Map<string, TotemGroup>()
    for (const person of totem) {
      if (
        query &&
        !person.name.toLowerCase().includes(query) &&
        !person.totem.toLowerCase().includes(query)
      ) {
        continue
      }
      const key = person.location + person.year
      let group = result.get(key)
      if (!group) {
        group = { key, year: person.year, location: person.location, people: [] }
        result.set(key, group)
      }
      group.people.push(person)
    }
    return [...result.values()]
  }, [totem, deferredFilter])

  return (
    <div className="container flex flex-col justify-between content-start gap-4 px-4 md:flex-row-reverse md:gap-8">
      <div className="md:w-1/2">
        {children}

        <fieldset className="fieldset w-full md:sticky md:top-24 mb-8">
          <legend className="fieldset-legend text-sm">Filtra per nome o per totem</legend>
          <input
            type="search"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Inserisci una parte del nome o del totem"
            className="input input-secondary w-full"
          />
        </fieldset>
      </div>

      <div className="md:w-1/2">
        {status === 'loaded' ? (
          groups.length > 0 ? (
            <table className="table h-fit">
              {groups.map(group => (
                <tbody key={group.key}>
                  <tr className="bg-neutral sticky top-20 md:top-24 z-1">
                    <th className="rounded-l-xl w-1/2">{group.location}</th>
                    <th className="rounded-r-xl">{group.year}</th>
                  </tr>
                  {group.people.map((person, i) => (
                    <tr key={person.name + i} className="hover:bg-base-200">
                      <td className="rounded-l-xl">{person.name}</td>
                      <td className="rounded-r-xl">{person.totem}</td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          ) : (
            <p className="my-8 text-center opacity-70">Nessun risultato per &ldquo;{filter}&rdquo;.</p>
          )
        ) : (
          <div className="my-8 text-primary text-center">
            {status === 'loading' ? (
              <>
                <span className="loading loading-spinner loading-lg" />
                <br />
                Il Grande Capo Manitù sta caricando i nomi totem, attendete!
              </>
            ) : (
              'Un problema non ha permesso il caricamento dei dati, riprova più tardi.'
            )}
          </div>
        )}
      </div>
    </div>
  )
}
