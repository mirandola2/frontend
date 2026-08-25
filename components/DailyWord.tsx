'use client'

import { useCachedFetch } from '@/hooks/useCachedFetch'

interface DailyWordData {
  CantoVangelo: string
  Link: string
  Letture: string
}

export default function DailyWord() {
  const { data, loaded } = useCachedFetch<DailyWordData>(
    'https://daily.mirandola2.workers.dev/',
    60 * 60 * 1000,
  )

  if (!loaded || !data) {
    return <span className="loading loading-spinner loading-xs" />
  }

  return (
    <span>
      &ldquo;{data.CantoVangelo}&rdquo;{' '}
      <a href={data.Link} className="link">
        ({data.Letture})
      </a>
    </span>
  )
}
