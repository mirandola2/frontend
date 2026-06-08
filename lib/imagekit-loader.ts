import { ImageLoaderProps } from 'next/image'

export default function imagekitLoader({ src, width, quality }: ImageLoaderProps) {
  const params = [`w-${width}`]
  if (quality) params.push(`q-${quality}`)
  const paramsStr = params.join(',')
  return `https://ik.imagekit.io/mir2/${src}?tr=${paramsStr}`
}
