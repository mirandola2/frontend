'use client'

import { useState, useRef } from 'react'
import { useCookie } from '@/hooks/useCookie'

interface CodiceSocioProps {
  lastupdate?: string
}

interface PersonData {
  name?: string
  birthday?: string
  code?: string
}

export default function CodiceSocio({ lastupdate }: CodiceSocioProps) {
  const pskCookie = useCookie('psk')
  const [name, setName] = useState('')
  const [pw, setPw] = useState('')
  const [logged, setLogged] = useState(() => {
    const psk = pskCookie.get()
    return !!(psk && psk.length === 64)
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [personData, setPersonData] = useState<PersonData[]>([])
  const dialogRef = useRef<HTMLDialogElement>(null)

  async function digestMessage(message: string) {
    const msgUint8 = new TextEncoder().encode(message)
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  async function handleSave() {
    const hashHex = await digestMessage(pw)
    pskCookie.set(hashHex, { maxAge: 345600000 })
    setLogged(true)
    setPw('')
  }

  function logout() {
    pskCookie.remove()
    setLogged(false)
    setPersonData([])
    setError('')
  }

  function validateInput(val: string) {
    return val.trim().toUpperCase().replace(/[^A-Z0-9 ]/g, '')
  }

  async function searchMemberCode() {
    const cleaned = name.trim().toUpperCase()
    if (!cleaned) return

    setLoading(true)
    setError('')
    setPersonData([])

    try {
      const psk = pskCookie.get() || ''
      const res = await fetch(
        `https://people.mirandola2.workers.dev/data?name=${encodeURIComponent(cleaned.toLowerCase())}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Just-A-PSK': psk,
          },
        }
      )

      if (res.status === 403) {
        setError('Non sei autorizzato o il token usato è errato. Esci e riprova.')
        setPersonData([])
      } else {
        const data = await res.json()
        setPersonData(data)
      }
    } catch {
      setError('Errore di rete')
      setPersonData([])
    } finally {
      setLoading(false)
      dialogRef.current?.showModal()
    }
  }

  return (
    <>
      <div className="card w-full not-prose max-w-xl mt-12 mx-auto">
        <div className="card-body">
          <h2 className="card-title">Ricerca codice socio</h2>

          {logged && (
            <button className="btn ml-auto text-primary font-bold" onClick={logout}>
              Reset Token <span className="material-symbols-rounded">logout</span>
            </button>
          )}

          {!logged && (
            <div className="flex gap-2">
              <input
                type="password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                placeholder="Token Magico"
                className="input input-bordered w-full"
              />
              <button className="btn btn-primary" onClick={handleSave}>
                Salva
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={e => setName(validateInput(e.target.value))}
              onKeyDown={e => e.key === 'Enter' && searchMemberCode()}
              placeholder="Nome Completo"
              className="input input-bordered w-full"
              disabled={!logged}
            />
            <button
              className="btn btn-primary"
              onClick={searchMemberCode}
              disabled={!logged}
            >
              Cerca
            </button>
          </div>

          {lastupdate && (
            <p className="text-sm text-right">Dati aggiornati al {lastupdate}</p>
          )}
        </div>
      </div>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          {loading && <span className="loading loading-spinner loading-md" />}
          {error && <span className="font-bold text-error">{error}</span>}
          {!loading && !error && personData.length === 0 && (
            <span>Codice socio non trovato.</span>
          )}
          {!loading &&
            personData.map((data, i) => (
              <table key={i} className="table text-sm py-8 font-mono">
                <tbody>
                  <tr>
                    <td className="pl-0">Nome:</td>
                    <th>{data?.name}</th>
                  </tr>
                  <tr>
                    <td className="pl-0">Data di nascita:</td>
                    <th>{data?.birthday}</th>
                  </tr>
                  <tr>
                    <td className="pl-0">Codice Socio:</td>
                    <th className="text-3xl bold">{data?.code}</th>
                  </tr>
                </tbody>
              </table>
            ))}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => setLoading(false)}>
                Chiudi
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
