# Phase 3: Component Migration

## Goal
Convert all Vue SFCs to React TSX components, preserving the exact same UI.

## General Vue→React patterns

| Vue | React |
|-----|-------|
| `<template>` | `return (...)` in JSX |
| `<script setup>` | Component function |
| `defineProps({...})` | `interface Props { ... }` |
| `ref(val)` / `reactive(obj)` | `useState(val)` |
| `computed(() => ...)` | `useMemo(() => ..., [...])` |
| `watchEffect(fn)` | `useEffect(fn)` |
| `v-if="cond"` | `{cond && <X>}` or ternary |
| `v-for="item in items"` | `{items.map(i => <X />)}` |
| `v-model="x"` | `value={x} onChange={e => setX(e.target.value)}` |
| `@click="fn"` | `onClick={fn}` |
| `:class="expr"` | `className={expr}` (use `clsx` or template literal) |
| `<slot />` | `{children}` |
| `<NuxtLink to="/x">` | `<Link href="/x">` from `next/link` |
| `<NuxtImg :src="x" />` | `<Image src={x} />` from `next/image` |
| `<NuxtPage />` | `{children}` in layout |
| `<ClientOnly>` | `'use client'` directive or `dynamic(() => import(...), { ssr: false })` |
| `onMounted(fn)` | `useEffect(fn, [])` |
| `useAsyncData(key, fetcher)` | `async` Server Component or `useEffect` in client |
| `useHead()` | `export const metadata = { ... }` or `<Head>` from `next/head` |
| `useCookie()` | Server: `cookies()` from `next/headers`. Client: `js-cookie` |

## Component List

### Layout / Shell Components

| Component | File | Type | Notes |
|-----------|------|------|-------|
| Header | `components/Header.tsx` | Client | Navbar, dropdown menus, mobile drawer, scroll-aware transparency |
| Footer | `components/Footer.tsx` | Server | Static content, credit modal |
| Hero | `components/Hero.tsx` | Server | Image overlay, props for title/image/color |
| Sidebar | `components/Sidebar.tsx` | Server | Wraps Birthday/Weather/DailyWord + static mass time |
| BlogLayout | `components/BlogLayout.tsx` | Server | 2-col flex layout with Sidebar |
| BlogFeed | `components/BlogFeed.tsx` | Server | Blog post listing cards, receives posts as props |
| Toast | `components/Toast.tsx` | Client | Portal-based toast notification |

### Data-Fetching Widgets (all Client)

| Component | File | API |
|-----------|------|-----|
| Weather | `components/Weather.tsx` | `open-meteo.com` (same endpoint) |
| Birthdays | `components/Birthdays.tsx` | `people.mirandola2.workers.dev/birthday` |
| DailyWord | `components/DailyWord.tsx` | `daily.mirandola2.workers.dev` |
| Quote | `components/Quote.tsx` | Reads from CSV collection prop (random selection) |

### MDX Content Components

All in `components/mdx/`:

| Component | File | Key Considerations |
|-----------|------|-------------------|
| Staff | `components/mdx/Staff.tsx` | Client component. Gets data from props (passed from page). Filter/sort logic identical. |
| Fig | `components/mdx/Fig.tsx` | Client. Replace `vue-easy-lightbox` with `yet-another-react-lightbox`. Carousel logic same. |
| TableOfContents | `components/mdx/TableOfContents.tsx` | Server. Build TOC from MDX heading structure or pass as prop. |
| Cards | `components/mdx/Cards.tsx` | Server. Simple grid wrapper — `{children}`. |
| Card | `components/mdx/Card.tsx` | Server. Props-based card with color classes. |
| Quoted | `components/mdx/Quoted.tsx` | Server. Styled blockquote wrapper — `{children}`. |
| Lnk | `components/mdx/Lnk.tsx` | Server. Styled link button. |
| LnkYearGrid | `components/mdx/LnkYearGrid.tsx` | Client. Media archive grid with filters. |
| Alci | `components/mdx/Alci.tsx` | Client. ALCE code generator with jsPDF. No changes needed. |
| Morse | `components/mdx/Morse.tsx` | Client. Morse code translator. Self-contained. |
| CodiceSocio | `components/mdx/CodiceSocio.tsx` | Client. `useCookie` → `js-cookie`. PSK auth flow identical. |
| GroupSize | `components/mdx/GroupSize.tsx` | Server. Static numbers (hardcoded — same as Vue). |
| MyDiv | `components/mdx/MyDiv.tsx` | Server. Simple div wrapper — `{children}`. |

## Key Component Details

### Header.tsx
- `'use client'` for scroll event, drawer toggle
- Menu structure as a constant object (same as Vue `ref`)
- Transparent → solid navbar on scroll
- Desktop: dropdown menus. Mobile: drawer sidebar
- Use `<Link>` from `next/link` instead of `<a>`
- Use `<Image>` from `next/image` for logo

### Fig.tsx (Lightbox)
- Import `Lightbox` from `yet-another-react-lightbox`
- Import styles: `yet-another-react-lightbox/styles.css`
- Single image: opens lightbox with one slide
- Multiple images: carousel with prev/next buttons, lightbox
- Same `float` prop logic (0=full, 1=left, 2=right)

### Staff.tsx
- `'use client'` for filter state + URL query sync
- Receives `staff` data as prop (fetched in parent server component)
- Filter dropdown + grid of cards
- Query param sync for `?staff=X` (use `useSearchParams` + `useRouter`)

### CodiceSocio.tsx
- `'use client'`
- Replace `useCookie("psk")` with `js-cookie`'s `Cookies.get/set`
- Same PSK SHA-256 hashing using Web Crypto API
- Same fetch to Cloudflare Worker with `Just-A-PSK` header
