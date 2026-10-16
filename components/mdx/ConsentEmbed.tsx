'use client'

import { useState } from 'react'
import { PlayIcon } from '@phosphor-icons/react'

interface ConsentEmbedProps {
  src: string
  title: string
  provider: string
  privacyUrl: string
  height: number
  allow?: string
}

// Third-party iframe (YouTube, Spotify...) that loads only after a click: until then the provider
// receives nothing and sets no cookies, so the click itself is the consent and no banner is needed.
// <ConsentEmbed src="https://..." title="..." provider="YouTube" privacyUrl="https://..." height={560} />
export default function ConsentEmbed({ src, title, provider, privacyUrl, height, allow }: ConsentEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        allow={allow}
        allowFullScreen
        className="rounded-box border-0"
      />
    )
  }

  // Same size as the iframe, so nothing shifts when it loads
  return (
    <div
      style={{ height }}
      className="not-prose flex flex-col items-center justify-center gap-3 rounded-box bg-base-200 p-6 text-center"
    >
      <p className="font-bold">{title}</p>
      <p className="max-w-md text-sm">
        Questo contenuto è fornito da {provider}, che potrebbe raccogliere dati e installare cookie (
        <a href={privacyUrl} target="_blank" rel="noopener noreferrer" className="link">
          informativa
        </a>
        ).
      </p>
      <button type="button" className="btn btn-primary" onClick={() => setLoaded(true)}>
        <PlayIcon size={18} weight="fill" aria-hidden />
        Carica contenuto
      </button>
    </div>
  )
}
