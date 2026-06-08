'use client'

import { useState, useEffect } from 'react'

interface DailyWordData {
  CantoVangelo: string
  Link: string
  Letture: string
}

export default function DailyWord() {
  const [data, setData] = useState<{ json: DailyWordData | null; loaded: boolean }>({
    json: null,
    loaded: false,
  })

  useEffect(() => {
    fetch('https://daily.mirandola2.workers.dev/')
      .then((res) => res.json())
      .then((json) => {
        setData({ json, loaded: true })
      })
  }, [])

  if (!data.loaded) {
    return <span className="loading loading-spinner loading-xs" />
  }

  return (
    <span>
      &ldquo;{data.json!.CantoVangelo}&rdquo;{' '}
      <a href={data.json!.Link} className="link">
        ({data.json!.Letture})
      </a>
    </span>
  )
}
