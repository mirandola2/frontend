'use client'

import { useCachedFetch } from '@/hooks/useCachedFetch'
import LoadingState from './LoadingState'

interface DailyWordData {
  CantoVangelo: string
  Link: string
  Letture: string
}

export default function DailyWord() {
  const { data, error } = useCachedFetch<DailyWordData>(
    'https://daily.mirandola2.workers.dev/',
    60 * 60 * 1000,
  )

  if (!data) return <LoadingState error={error} />

  return (
    <span>
      &ldquo;{data.CantoVangelo}&rdquo;{' '}
      <a href={data.Link} className="link">
        ({data.Letture})
      </a>
    </span>
  )
}
