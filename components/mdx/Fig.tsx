'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface FigProps {
  src: string | string[]
  alt?: string
  desc?: string | string[]
  float?: number | string
}

export default function Fig({ src, alt, desc, float = '2' }: FigProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const srcs = Array.isArray(src) ? src : [src]
  const descs = Array.isArray(desc) ? desc : desc ? [desc] : []
  const slides = srcs.map(s => ({
    src: s.startsWith('http') ? s : `https://ik.imagekit.io/mir2${s.startsWith('/') ? s : `/${s}`}`,
  }))

  const floatVal = typeof float === 'string' ? float : String(float)
  const floatClass = floatVal === '0' ? '' : floatVal === '1' ? 'md:float-left m-3 md:ml-0 md:max-w-sm' : 'md:float-right md:max-w-sm m-3 md:mr-0'

  return (
    <>
      <div className={`not-prose object-contain bg-base-200 p-5 rounded-xl justify-center content-center ${floatClass} ${floatVal === '0' ? 'my-2 max-w-3xl w-full mx-auto clear-both' : ''}`}>
        <button onClick={() => { setIndex(0); setOpen(true) }} className="block mx-auto h-auto w-auto">
          <Image
            src={srcs[0]}
            alt={alt || (typeof desc === 'string' ? desc : '')}
            width={800}
            height={600}
            className="rounded-lg shadow-lg w-auto h-auto"
          />
        </button>
        {descs[0] && <p className="text-sm text-center opacity-70 mt-2 mx-auto">{descs[0]}</p>}
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </>
  )
}
