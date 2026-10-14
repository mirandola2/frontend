import type { ImgHTMLAttributes } from 'react'
import { imagekitUrl } from '@/lib/imagekit'

export default function MdxImage({ src, alt, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  if (!src || typeof src !== 'string') return null

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imagekitUrl(src, 'w-800')}
      alt={alt || ''}
      loading="lazy"
      decoding="async"
      className="rounded-lg shadow-lg max-w-full h-auto"
      {...rest}
    />
  )
}
