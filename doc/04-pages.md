# Phase 4: Pages

## Goal
Migrate all routes to Next.js App Router pages with identical URL structure and rendering behavior.

## Route Table

| Nuxt | Next.js | Type |
|------|---------|------|
| `/` | `app/page.tsx` | Server Component (home) |
| `/blog` | `app/blog/page.tsx` | Server Component (blog index) |
| `/blog/:slug` | `app/blog/[slug]/page.tsx` | Server Component + MDX (blog post) |
| `/totem` | `app/totem/page.tsx` | Client Component (fetch from worker) |
| `/**` (catch-all) | `app/[...slug]/page.tsx` | Server Component + MDX (content pages) |

## Page Details

### 4.1 Home Page → `app/page.tsx`

Server Component.
- Render `<Hero title="..." image="..." big />`
- Three branch cards (LC, EG, RS) in a grid — identical HTML structure
- `<Quote type="gruppo" />` component
- BlogLayout wrapping home content (featured blog post + recent 4)
- Fetch home page content from MDX file `content/_home.mdx`

### 4.2 Blog Index → `app/blog/page.tsx`

Server Component.
- `generateStaticParams` reads all blog posts
- Renders `<BlogFeed horizontal />` inside `<BlogLayout>`
- All blog posts passed as prop to BlogFeed

### 4.3 Blog Post → `app/blog/[slug]/page.tsx`

Server Component with dynamic MDX rendering.
- `generateStaticParams` enumerates all `content/blog/*.mdx` slugs
- Renders blog post with:
  - Hero-style header with category badge + date
  - MDX content in `.prose-container`
  - Iframe with TableOfContents from MDX structure
- SEO metadata from frontmatter (title, description, og:image)

### 4.4 Totem → `app/totem/page.tsx`

Client Component (`'use client'`).
- Fetches from `people.mirandola2.workers.dev/totem` on mount
- Filter input, grouped table by location/year
- Loading/error states identical to current

### 4.5 Catch-all Content Pages → `app/[...slug]/page.tsx`

Server Component.
- `generateStaticParams` walks all `.mdx` files (excluding `blog/**`)
- Maps file path to URL segment array
- Renders `<Hero>` + MDX content in `.prose-container`
- Default hero image `/img/misc/hero.jpg`
- SEO metadata from frontmatter
- Falls back to `notFound()` if no match

```tsx
// app/[...slug]/page.tsx
export async function generateStaticParams() {
  const pages = getAllPages()
  return pages.map(p => ({ slug: p.slug.split('/').filter(Boolean) }))
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const path = '/' + (slug || []).join('/')
  const page = getPageByPath(path)
  if (!page) notFound()
  return (
    <>
      <Hero title={page.title} image={page.img} />
      <div className="container prose-container">
        <MDXContent source={page.body} />
      </div>
    </>
  )
}
```

## Data Flow per Page

| Page | Build-time Data | Client-side Fetch |
|------|----------------|-------------------|
| `/` | Home MDX content, blog posts (4) | — |
| `/blog` | All blog posts | — |
| `/blog/:slug` | Blog post MDX + frontmatter | — |
| `/totem` | — | Totem list from Cloudflare Worker |
| `/**` | Page MDX + frontmatter | — |

## Static Generation

All pages use `output: 'export'` for fully static output.
Dynamic routes implement `generateStaticParams` which is automatically used with `output: 'export'`.
