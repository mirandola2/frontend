'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { imagekitUrl } from '@/lib/imagekit'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

const FigLightbox = dynamic(() => import('./FigLightbox'), { ssr: false })

interface FigProps {
  src: string | string[]
  alt?: string
  desc?: string | string[]
  /** 0: not floating, 1: float left, 2: float right */
  float?: number | string
}

// MDX passes arrays as JSON strings, e.g. src={'["/a.jpg", "/b.jpg"]'}
function toList(value?: string | string[]): string[] {
  if (value == null) return []
  if (Array.isArray(value)) return value
  if (value.trim().startsWith('[')) {
    try {
      return JSON.parse(value)
    } catch {
      // not JSON, treat as a single value
    }
  }
  return [value]
}

const floatClasses: Record<string, string> = {
  '0': 'my-2 max-w-3xl w-full mx-auto clear-both',
  '1': 'md:float-left m-3 md:ml-0 md:max-w-sm',
  '2': 'md:float-right m-3 md:mr-0 md:max-w-sm',
}

export default function Fig({ src, alt, desc, float = '2' }: FigProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const srcs = toList(src)
  const descs = toList(desc)
  const floating = String(float) !== '0'
  const multi = srcs.length > 1

  if (srcs.length === 0) return null

  const step = (delta: number) => setIndex(i => (i + delta + srcs.length) % srcs.length)

  return (
    <figure
      className={`not-prose bg-base-200 p-5 rounded-box flex flex-col items-center ${
        floatClasses[String(float)] ?? floatClasses['2']
      }`}
    >
      <div className="relative flex items-center justify-center">
        <button type="button" onClick={() => setOpen(true)} className="block cursor-zoom-in" aria-label="Ingrandisci immagine">
          <Image
            src={srcs[index]}
            alt={alt || descs[index] || ''}
            width={800}
            height={600}
            sizes={floating ? '(min-width: 768px) 384px, 100vw' : '(min-width: 768px) 768px, 100vw'}
            className={`rounded-lg shadow-lg w-auto h-auto ${floating ? 'max-h-48' : 'max-h-96'}`}
          />
        </button>
        {multi && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              className="btn btn-primary btn-circle btn-sm absolute -left-3"
              aria-label="Immagine precedente"
            >
              <CaretLeft size={18} weight="bold" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="btn btn-primary btn-circle btn-sm absolute -right-3"
              aria-label="Immagine successiva"
            >
              <CaretRight size={18} weight="bold" aria-hidden />
            </button>
          </>
        )}
      </div>
      {(descs[index] || multi) && (
        <figcaption className="text-sm text-center opacity-70 mt-2">
          {descs[index]} {multi && `[${index + 1}/${srcs.length}]`}
        </figcaption>
      )}
      {open && (
        <FigLightbox
          open
          close={() => setOpen(false)}
          index={index}
          on={{ view: ({ index: i }) => setIndex(i) }}
          controller={{ closeOnBackdropClick: true }}
          slides={srcs.map(s => ({ src: imagekitUrl(s) }))}
        />
      )}
    </figure>
  )
}
