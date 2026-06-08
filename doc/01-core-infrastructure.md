# Phase 1: Core Infrastructure

## Goal
Set up Tailwind + DaisyUI theme, fonts, image configuration, root layout, error/404 pages, deployment config.

## Steps

### 1.1 Globals CSS → `app/globals.css`
Port the full `app/assets/css/main.css` content exactly as-is:
- `@import 'tailwindcss'`
- `@source inline(...)` for dynamic branch color classes
- `@plugin 'daisyui' { themes: agesci --default; }`
- Full `@plugin "daisyui/theme"` block with the `agesci` theme definition (all color vars, radii, etc.)
- `@theme {}` block with font families and branch colors (`--color-lc`, `--color-eg`, `--color-rs`, `--color-cc`)
- `.container` utility
- `@plugin "@tailwindcss/typography"`
- `.prose-quoteless` variant
- `html { scroll-padding-top: 6rem; }`
- `.prose-container` and `.prose-container table` styles

### 1.2 Fonts via next/font → `app/layout.tsx`

```tsx
import { Ubuntu, Caprasimo, Playfair_Display } from 'next/font/google'

const ubuntu = Ubuntu({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-ubuntu',
})

const caprasimo = Caprasimo({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
})
```

Remove `@nuxt/fonts` dependency.

### 1.3 ImageKit loader → `lib/imagekit-loader.ts`

```ts
import { ImageLoaderProps } from 'next/image'

export default function imagekitLoader({ src, width, quality }: ImageLoaderProps) {
  const params = [`w-${width}`]
  if (quality) params.push(`q-${quality}`)
  const paramsStr = params.join(',')
  return `https://ik.imagekit.io/mir2/${src}?tr=${paramsStr}`
}
```

### 1.4 next.config.ts

```ts
import type { NextConfig } from 'next'
import withMDX from '@next/mdx'

const nextConfig: NextConfig = {
  output: 'export',                    // Static Site Generation
  images: {
    loader: 'custom',
    loaderFile: './lib/imagekit-loader.ts',
    unoptimized: true,                  // Required for static export
  },
  trailingSlash: true,                  // Match current Netlify behavior
  // ... MDX config
}

export default withMDX()(nextConfig)
```

### 1.5 Root Layout → `app/layout.tsx`

- Wrap `<html lang="it">`
- Inject font variables and Material Symbols CDN `<link>`
- Set metadata (charset, viewport, theme-color `#462678`)
- Structure: `<Header><main>{children}</main><Footer /></Header>`
- `metadata` export with site title and description

### 1.6 Error page → `app/error.tsx`

Client component mirroring `error.vue`:
- "Quando la strada non c'è, inventala!" header
- Shows `error.statusCode` and `error.message`
- "Torna alla Home" link + "Riprova" button
- Minimal navbar with logo
- Footer component

### 1.7 404 page → `app/not-found.tsx`

Same layout as error page with 404 messaging.

### 1.8 next-sitemap → `next-sitemap.config.js`

```js
module.exports = {
  siteUrl: 'https://mirandola2.it',
  generateRobotsTxt: true,
  outDir: './out',  // static export output
}
```

Add script to package.json: `"postbuild": "next-sitemap"`
