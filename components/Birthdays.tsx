'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useCachedFetch } from '@/hooks/useCachedFetch'
import LoadingState from './LoadingState'

interface BirthdayPerson {
  name: string
  last_initial: string
  t_minus: number
}

function birthdaysFormatter(birthdays: BirthdayPerson[]): string {
  let returnBDString = ''
  let flagFarBDString = true
  let counterFarBD = 0
  const birthdaysReduced = birthdays.reduce<Record<string, string[]>>((acc, curr) => {
    const t = curr.t_minus
    acc[t] = acc[t] || []
    acc[t].push(`${curr.name} ${curr.last_initial}.`)
    if (t > 1) {
      counterFarBD += 1
    }
    return acc
  }, Object.create(null))

  for (const [t_minus_key, names] of Object.entries(birthdaysReduced)) {
    const length = names.length
    let namesString = ''

    if (length === 0) {
      namesString = ''
    } else if (length === 1) {
      namesString = names[0]
    } else {
      const last = names.pop()!
      namesString = names.join(', ') + ' e ' + last
    }

    if (t_minus_key === '0') {
      returnBDString += `Oggi è il compleanno di ${namesString}, auguri! `
    } else if (t_minus_key === '1') {
      returnBDString += `Domani ${length < 2 ? 'compierà' : 'compieranno'} gli anni ${namesString}! `
    } else {
      returnBDString += `${flagFarBDString ? (counterFarBD < 2 ? 'Il prossimo compleanno è di' : 'I prossimi compleanni sono di') : ', '} ${namesString} fra ${t_minus_key} giorni`
      flagFarBDString = false
    }
  }

  returnBDString +=
    returnBDString === ''
      ? 'Nessuno compierà gli anni durante la prossima settimana.'
      : counterFarBD !== 0
        ? '.'
        : ''

  return returnBDString
}

const CONFETTI_COLORS = ['#FFBE0A', '#559928', '#D24D41', '#9B66A5', '#462678']

// Confetti over the "Compleanni" box when someone has their birthday today, on hover and
// on click (throttled).
function BirthdayConfetti({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const box = ref.current?.closest('section') ?? ref.current
    if (!box) return

    let last = 0
    async function fire() {
      if (!box || Date.now() - last < 1500) return
      last = Date.now()
      const { default: confetti } = await import('canvas-confetti')
      const r = box.getBoundingClientRect()
      confetti({
        particleCount: 90,
        spread: 75,
        startVelocity: 32,
        origin: { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + 40) / window.innerHeight },
        colors: CONFETTI_COLORS,
        zIndex: 60,
        disableForReducedMotion: true,
      })
    }

    box.addEventListener('mouseenter', fire)
    box.addEventListener('click', fire)
    return () => {
      box.removeEventListener('mouseenter', fire)
      box.removeEventListener('click', fire)
    }
  }, [])

  return <span ref={ref}>{children}</span>
}

export default function Birthdays() {
  const url = useMemo(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime() + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000
    const day = Math.floor(diff / (1000 * 60 * 60 * 24))
    return `https://people.mirandola2.workers.dev/birthday?t=7&d=${day}`
  }, [])

  const { data, error } = useCachedFetch<BirthdayPerson[]>(url, 12 * 60 * 60 * 1000)

  if (!data) return <LoadingState error={error} />

  const text = birthdaysFormatter(data)
  return data.some(p => p.t_minus === 0) ? <BirthdayConfetti>{text}</BirthdayConfetti> : <>{text}</>
}
