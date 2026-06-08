# Phase 7: Deployment (Vercel — Static)

## Goal
Configure for Vercel deployment with fully static output, replicating the current Netlify static site behavior.

## Steps

### 7.1 Vercel Configuration

Create `vercel.json`:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "trailingSlash": true,
  "cleanUrls": false,
  "framework": "nextjs",
  "outputDirectory": "out"
}
```

The `output: 'export'` in `next.config.ts` generates a fully static site to `out/`.

### 7.2 Vercel Deployment

1. Push to GitHub repository
2. Import project in Vercel dashboard
3. Framework preset: **Next.js**
4. Build command: `next build` (produces static `out/`)
5. Output directory: `out/`
6. Environment variables: _none needed_ (all external APIs are public)

Or install Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

### 7.3 Routing

Vercel automatically handles:
- Clean URLs → trailing slash config
- 404 fallback → `app/not-found.tsx`
- Redirects → `next.config.ts` `redirects()` or `vercel.json`

No `_routes.json` needed (that was Netlify-specific).

### 7.4 Remove Netlify files

After confirming deployment works:
- Delete `.netlify/` directory
- Delete `_routes.json`
- Update or remove `netlify.toml`

### 7.5 Build Scripts (package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postbuild": "next-sitemap",
    "start": "npx serve@latest out",
    "preview": "next build && npx serve@latest out"
  }
}
```

The `dev` script uses Next.js dev server (not needed for static, but useful for iteration).
The `build` script generates the static export.
`postbuild` runs sitemap generator on the output.
`start`/`preview` serves the static output locally for testing.

### 7.6 Domain

Custom domain: `mirandola2.it`
- Add in Vercel dashboard → Domains
- Update DNS (point to Vercel's nameservers or CNAME)
- SSL certificate auto-provisioned by Vercel

### 7.7 Performance

With static export + Vercel CDN:
- HTML, CSS, JS served from edge
- Images from ImageKit CDN (unchanged)
- Load times will be equivalent or better than current Netlify setup
