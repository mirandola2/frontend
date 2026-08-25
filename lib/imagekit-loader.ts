'use client'

import { ImageLoaderProps } from 'next/image'

const IMAGEKIT_BASE = 'https://ik.imagekit.io/mir2'

export default function imagekitLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }

  const params = [`w-${width}`]
  if (quality) params.push(`q-${quality}`)
  const path = src.startsWith('/') ? src : `/${src}`
  return `${IMAGEKIT_BASE}${path}?tr=${params.join(',')}`
}
