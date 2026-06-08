# Phase 0: Project Initialization

## Goal
Scaffold a Next.js project with App Router, install all dependencies, copy static assets.

## Steps

### 0.1 Create Next.js project
```bash
cd ..
npx create-next-app@latest frontend-next --typescript --tailwind --app --no-src-dir
cd frontend-next
```

### 0.2 Install production dependencies
```bash
npm install daisyui@latest
npm install @tailwindcss/typography
npm install @next/mdx @mdx-js/loader @mdx-js/mdx
npm install gray-matter papaparse zod
npm install sharp
npm install next-sitemap
npm install yet-another-react-lightbox
npm install jscookie
npm install @types/js-cookie --save-dev
npm install @types/papaparse --save-dev
```

### 0.3 Copy existing assets
```bash
cp -r ../frontend_next/public/* ./public/
cp -r ../frontend_next/content ./content
cp ../frontend_next/content.config.ts ./content.config.ts
```

### 0.4 Project structure after scaffolding
```
frontend-next/
├── app/
│   ├── layout.tsx         # Root layout (replaces app.vue)
│   ├── globals.css        # Tailwind + DaisyUI + theme (replaces main.css)
│   ├── page.tsx           # Home page (/)
│   ├── not-found.tsx      # 404 page
│   ├── error.tsx          # Error boundary (replaces error.vue)
│   ├── blog/
│   │   ├── page.tsx       # Blog index (/blog)
│   │   └── [slug]/page.tsx  # Blog post (/blog/:slug)
│   ├── totem/page.tsx     # Totem page (/totem)
│   └── [...slug]/page.tsx  # Catch-all content pages
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Sidebar.tsx
│   ├── BlogFeed.tsx
│   ├── BlogLayout.tsx
│   ├── Quote.tsx
│   ├── Weather.tsx
│   ├── Birthdays.tsx
│   ├── DailyWord.tsx
│   ├── Toast.tsx
│   └── mdx/
│       ├── Staff.tsx
│       ├── Fig.tsx
│       ├── TableOfContents.tsx
│       ├── Cards.tsx
│       ├── Card.tsx
│       ├── Quoted.tsx
│       ├── Lnk.tsx
│       ├── LnkYearGrid.tsx
│       ├── Alci.tsx
│       ├── Morse.tsx
│       ├── CodiceSocio.tsx
│       ├── GroupSize.tsx
│       └── MyDiv.tsx
├── hooks/
│   ├── useToast.ts
│   └── useContent.ts
├── lib/
│   ├── content.ts         # Build-time content loader
│   └── imagekit-loader.ts  # ImageKit loader for next/image
├── mdx-components.tsx     # MDX component registry (Next.js requirement)
├── content/
│   ├── _capi.csv
│   ├── _media.csv
│   ├── _quotes.csv
│   ├── _home.md           # → _home.mdx
│   └── ...all content files
├── public/
│   └── img/...
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Files to migrate from Nuxt project
- `content/` (all .md files → .mdx, with MDC→MDX syntax conversion)
- `public/` (static assets)
- `content.config.ts` (Zod schemas — reference only, reused in lib/content.ts)
