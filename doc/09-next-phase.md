# Next Phase — Strengths & Flaws

## Strengths

1. **Static-first architecture** — `output: 'export'` yields a fully static site with zero server runtime, maximizing CDN performance and security.
2. **Clean server/client component split** — data-heavy pages stay as server components; only interactive widgets use `'use client'`.
3. **Lean dependency profile** — no global state, no React Query, no CSS-in-JS. Keeps the bundle small.
4. **MDX as CMS** — file-based content with typed frontmatter and custom component registry is simple and maintainable.
5. **Consistent design system** — branch colors (LC/EG/RS/CC) and DaisyUI theme defined centrally and used uniformly.

## Flaws (action items for next phase)

### P1 — Should fix

1. **`Header.tsx` is `'use client'`** — wraps the entire page tree, so all routes lose the SSR benefit of server components below it.
2. **No `loading.tsx`** — zero loading state for any route segment.
3. **Raw `fetch` + `useEffect` for API calls** — no caching, deduplication, or stale-while-revalidate. Three Cloudflare Worker endpoints and Open-Meteo all fetch on every mount.
4. **Error pages reimplement layout** — both `error.tsx` and `not-found.tsx` duplicate `<Header>`/`<Footer>` instead of relying on the root layout.

### P2 — Worth addressing

5. **`TableOfContents.tsx` uses `useSyncExternalStore` + `MutationObserver` at runtime** — this could be generated from MDX structure at build time with zero client cost.
6. **Migration artifacts left behind** — `.nuxt/`, `.netlify/`, `.data/`, `content.config.ts` are stale and should be cleaned up.
7. **Duplicate data sources** — `lib/staff-data.json` and `lib/media-data.json` are checked in alongside CSV reading at build time, creating confusion about the source of truth.
8. **Bleeding-edge versions** — Next.js 16.2.7 / React 19.2.4 have limited community support and potential instability.
