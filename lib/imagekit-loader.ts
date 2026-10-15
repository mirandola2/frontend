'use client'

import type { ImageLoaderProps } from 'next/image'
import { imagekitUrl } from './imagekit'

export default function imagekitLoader({ src, width, quality }: ImageLoaderProps) {
  const params = [`w-${width}`]
  if (quality) params.push(`q-${quality}`)
  return imagekitUrl(src, params.join(','))
}
