'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { imagekitUrl } from '@/lib/imagekit'

const FigLightbox = dynamic(() => import('./FigLightbox'), { ssr: false })

// Inline text that opens an image in the lightbox, e.g.
// <ImageLink src="img/misc/box-luca.jpg">Box Luca</ImageLink>
export default function ImageLink({ src, children }: { src: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline font-[inherit] text-secondary underline decoration-dotted underline-offset-4 cursor-zoom-in hover:decoration-solid"
      >
        {children}
      </button>
      {open && (
        <FigLightbox
          open
          close={() => setOpen(false)}
          controller={{ closeOnBackdropClick: true }}
          render={{ buttonPrev: () => null, buttonNext: () => null }}
          slides={[{ src: imagekitUrl(src) }]}
        />
      )}
    </>
  )
}
