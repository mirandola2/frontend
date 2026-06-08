'use client'

import { useState, useEffect, useMemo } from 'react'
import Hero from '@/components/Hero'

interface TotemPerson {
  name: string
  totem: string
  location: string
  year: string
}

interface GroupedTotem {
  year: string
  location: string
  people: TotemPerson[]
}

export default function TotemPage() {
  const [totem, setTotem] = useState<TotemPerson[]>([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState({ loaded: false, text: 'Il Grande Capo Manitù sta caricando i nomi totem, attendete!', error: false })

  useEffect(() => {
    fetch('https://people.mirandola2.workers.dev/totem')
      .then((res) => res.json())
      .then((t) => {
        setTotem(t)
        setLoading({ loaded: true, text: '', error: false })
      })
      .catch(() => {
        setLoading({ loaded: true, text: 'Un problema non ha permesso il caricamento dei dati, riprova più tardi.', error: true })
      })
  }, [])

  const tableTotem = useMemo(() => {
    const result: Record<string, GroupedTotem> = {}
    totem.forEach((person) => {
      const key = person.location + person.year
      if (!result[key]) {
        result[key] = { year: person.year, location: person.location, people: [] }
      }
      if (
        filter === '' ||
        person.name.toLowerCase().includes(filter.toLowerCase()) ||
        person.totem.toLowerCase().includes(filter.toLowerCase())
      ) {
        result[key].people.push(person)
      }
    })
    return result
  }, [totem, filter])

  return (
    <>
      <Hero title="Nomi Totem" image="/img/misc/fuoco.jpg" />

      <div className="justify-between px-4 content-start container flex flex-col gap-4 md:gap-8 md:flex-row-reverse">
        <div className="md:w-1/2">
          <p className="my-8 text-justify">
            Il Totem è un nome, di solito di un animale (ma a volte anche di piante,
            alberi o agenti atmosferici), seguito da un aggettivo, che viene dato
            alle guide e agli scout per sottolineare una loro caratteristica.
            Normalmente il nome dell&apos;animale richiama una caratteristica fisica
            della persona, mentre l&apos;aggettivo una caratteristica della personalità.
            In passato, nel nostro gruppo, il totem veniva assegnato alle guide del
            primo anno (prima media) e agli scout dell&apos;ultimo anno (seconda
            superiore), successivamente è stato assegnato in terza media (dal 1991 per
            gli scout e dal 2006 per le guide). Oggi invece viene assegnato in prima superiore con una cerimonia chiamata
            &ldquo;totemizzazione&rdquo;. Durante questa cerimonia la guida o lo scout per
            ricevere il suo &ldquo;Totem&rdquo; dovrà superare delle prove che testimonieranno
            il suo valore.
          </p>

          <div className="form-control w-full md:sticky md:top-20 mb-8">
            <label className="label">
              <span className="label-text">Filtra per nome o per totem</span>
            </label>
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Inserisci una parte del nome o del totem"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="md:w-1/2">
          {loading.loaded ? (
            <table className="table h-fit">
              {Object.entries(tableTotem).map(([, totems]) =>
                totems.people.length > 0 ? (
                  <tbody key={totems.location + totems.year}>
                    <tr className="bg-neutral sticky top-2 md:top-24">
                      <th className="rounded-l-xl w-1/2">{totems.location}</th>
                      <th className="rounded-r-xl">{totems.year}</th>
                    </tr>
                    {totems.people.map((person, i) => (
                      <tr key={person.name + i} className="hover">
                        <td className="rounded-l-xl">{person.name}</td>
                        <td className="rounded-r-xl">{person.totem}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : null
              )}
            </table>
          ) : (
            <div className="my-8 text-primary text-center">
              <span className="loading loading-spinner loading-lg" />
              <br />
              {loading.text}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
