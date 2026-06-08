# Phase 2: Content Layer

## Goal
Replace Nuxt Content v3 with a custom Next.js content layer that reads markdown/MDX and CSV files at build time.

## Steps

### 2.1 MDC → MDX syntax conversion

All files in `content/**/*.md` need their MDC component tags converted to JSX:

| MDC Syntax | MDX Syntax |
|-----------|-----------|
| `::component{prop="val"}` | `<Component prop="val">...</Component>` |
| `:component{prop="val"}` | `<Component prop="val" />` |
| `::slot-content::` → `::` closing | `{children}` implicitly |

**Conversion Script** → `scripts/convert-mdc-to-mdx.mjs`

A Node.js script that:
1. Walks all `content/**/*.md` files (recursively)
2. Converts MDC opening tags (`::Component{...}`) to JSX tags
3. Converts self-closing MDC tags (`:Fig{...}`) to self-closing JSX
4. Converts MDC closing tags (`::`) to JSX closing tags
5. Renames `.md` → `.mdx`
6. Handles nested MDC components (e.g., `::cards` containing `::card`)

_If content is small enough (30+ files), manual conversion with regex find+replace per tag type is also feasible._

**Manual conversion approach** (recommended for this project size):
- `::staff{staff="L"}` → `<Staff staff="L" />`
- `:Fig{src="..." float="2"}` → `<Fig src="..." float="2" />`
- `:tableOfContents` → `<TableOfContents />`
- `::cards ... ::card{title="..."} ... :: ::` → nested component structure
- YAML frontmatter in `.md` is valid in `.mdx` — no change needed

### 2.2 Content Data Model

Create `lib/content.ts` with types and loader functions:

```ts
// Types (mirroring content.config.ts Zod schemas)
export interface PageDoc {
  slug: string
  path: string
  title: string
  date: string
  description?: string
  img?: string
  category?: string
  body: string      // MDX content
}

export interface BlogPost {
  slug: string
  path: string
  title: string
  date: string
  description?: string
  img?: string
  category?: string
  body: string
}

export interface StaffMember {
  nome: string
  nomeCaccia?: string
  ruolo: string
  staff: string
  coca: number
  desc?: string
  img: string
  order: number
}

export interface MediaEntry {
  title: string
  url: string
  type: 'image' | 'video'
  id: string
  year?: number
}

export interface Quote {
  text: string
  type: string
  author?: string
}
```

### 2.3 Content Loader Functions

```ts
// lib/content.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Papa from 'papaparse'

const contentDir = path.join(process.cwd(), 'content')

export function getAllPages(): PageDoc[] { ... }
export function getPageByPath(slug: string): PageDoc | null { ... }
export function getAllBlogPosts(): BlogPost[] { ... }
export function getBlogPostBySlug(slug: string): BlogPost | null { ... }
export function getCSVCollection<T>(filename: string): T[] { ... }
```

Functions read the `content/` directory at build time, parse frontmatter, and return structured data.

### 2.4 MDX Configuration

`mdx-components.tsx` (at project root, as required by Next.js):

```tsx
import type { MDXComponents } from 'mdx/types'
import { Staff, Fig, TableOfContents, Cards, Card, Quoted,
         Lnk, LnkYearGrid, Alci, Morse, CodiceSocio, GroupSize, MyDiv } from '@/components/mdx'

export function useMDXComponents(): MDXComponents {
  return {
    Staff, Fig, TableOfContents, Cards, Card, Quoted,
    Lnk, LnkYearGrid, Alci, Morse, CodiceSocio, GroupSize, MyDiv,
  }
}
```

### 2.5 CSV Data at Build Time

In `lib/content.ts`, add helpers:

```ts
export function getStaff(): StaffMember[] {
  return getCSVCollection<StaffMember>('_capi.csv')
}

export function getMedia(): MediaEntry[] {
  return getCSVCollection<MediaEntry>('_media.csv')
}

export function getQuotes(): Quote[] {
  return getCSVCollection<Quote>('_quotes.csv')
}
```

These are used in page components via `generateStaticParams` or directly in server components.

### 2.6 Pages using catch-all content

`app/[...slug]/page.tsx`:
- `generateStaticParams` reads all non-blog `.mdx` files
- Dynamic segment `slug` matches the file path
- Reads MDX content and renders with `<MDXRemote>` or Next.js MDX
- Falls back to `notFound()` if no match

`app/blog/[slug]/page.tsx`:
- `generateStaticParams` reads all `content/blog/*.mdx` files
- Renders blog post with `BlogLayout` wrapper
