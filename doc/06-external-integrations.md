# Phase 6: External Integrations

## Goal
Replace Vue-specific plugins with React equivalents and configure analytics.

## Plugin Map

| Nuxt Plugin | Next.js Equivalent | File |
|---|---|---|
| `vue-easy-lightbox` | `yet-another-react-lightbox` | Used in `components/mdx/Fig.tsx` |
| `simple-analytics-vue` | Manual `<Script>` tag | `app/layout.tsx` |
| `@nuxt/image` (ImageKit) | Custom `next/image` loader | `lib/imagekit-loader.ts` |
| `@nuxt/fonts` | `next/font/google` | `app/layout.tsx` |
| `@nuxtjs/sitemap` | `next-sitemap` | `next-sitemap.config.js` |

### 6.1 Lightbox

Replace `vue-easy-lightbox` with `yet-another-react-lightbox` in `Fig.tsx`:
```tsx
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
```

Same API: `open`, `index`, `slides`, `close`.

### 6.2 Simple Analytics

In `app/layout.tsx`:
```tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          strategy="afterInteractive"
          data-collect-dnt="true"
        />
        <noscript>
          <img
            src="https://queue.simpleanalyticscdn.com/noscript.gif"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 6.3 jsPDF (Alci component)

No change — jsPDF is loaded dynamically from CDN and is framework-agnostic.
The `loadJsPDF` function in `Alci.tsx` works identically in React.

### 6.4 ImageKit

Configured via `lib/imagekit-loader.ts` (Phase 1.3).
All `<Image>` components use `next/image` with this loader.

### 6.5 External API Endpoints (unchanged)

| Endpoint | Used By | Auth |
|----------|---------|------|
| `people.mirandola2.workers.dev/totem` | Totem page | None |
| `people.mirandola2.workers.dev/birthday` | Birthdays | None |
| `people.mirandola2.workers.dev/data` | CodiceSocio | PSK (Just-A-PSK header + cookie) |
| `daily.mirandola2.workers.dev` | DailyWord | None |
| `api.open-meteo.com/v1/forecast` | Weather | None |

All API calls remain identical — no backend changes needed.
