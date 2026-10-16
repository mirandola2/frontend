'use client'

import type { ImageLoaderProps } from 'next/image'
import { imagekitUrl } from './imagekit'

// ImageKit does not resize SVGs. Small renders (the logo, which embeds a whole font: ~88 KB) are
// cheaper as a WebP raster; large ones keep the vector, with one URL for every srcset width.
const SVG_RASTER_MAX_WIDTH = 384

export default function imagekitLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.endsWith('.svg')) {
    return width <= SVG_RASTER_MAX_WIDTH ? imagekitUrl(src, `w-${width},f-webp`) : imagekitUrl(src)
  }
  const params = [`w-${width}`]
  if (quality) params.push(`q-${quality}`)
  return imagekitUrl(src, params.join(','))
}
