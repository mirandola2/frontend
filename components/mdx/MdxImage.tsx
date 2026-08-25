import type { ImgHTMLAttributes } from 'react'

const IMAGEKIT_BASE = 'https://ik.imagekit.io/mir2'

export default function MdxImage({ src, alt, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  if (!src || typeof src !== 'string') return null

  const resolvedSrc = src.startsWith('http')
    ? src
    : `${IMAGEKIT_BASE}${src.startsWith('/') ? src : `/${src}`}?tr=w-800`

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={resolvedSrc} alt={alt || ''} loading="lazy" className="rounded-lg shadow-lg max-w-full h-auto" {...rest} />
}
