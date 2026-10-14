// Images live on ImageKit, not in /public: every local path must go through here.
export const IMAGEKIT_BASE = 'https://ik.imagekit.io/mir2'

export function imagekitUrl(src: string, transforms?: string) {
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  const path = src.startsWith('/') ? src : `/${src}`
  return `${IMAGEKIT_BASE}${path}${transforms ? `?tr=${transforms}` : ''}`
}
