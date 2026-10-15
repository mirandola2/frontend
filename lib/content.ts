import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Papa from 'papaparse'

const contentDir = path.join(process.cwd(), 'content')
const blogDir = path.join(contentDir, 'blog')

export interface PageDoc {
  slug: string
  path: string
  title: string
  date: string
  description?: string
  img?: string
  category?: string
}

export type BlogPost = PageDoc

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

// Columns of content/_media.csv
export interface MediaEntry {
  type: 'image' | 'video'
  id: string
  year?: number
  name: string
  url: string
}

export interface Quote {
  text: string
  type: string
  author?: string
}

// The static export calls these helpers once per generated page (params, metadata and
// render), so cache the parsed content for the whole build. In dev, always re-read to
// pick up edits without restarting the server.
const shouldCache = process.env.NODE_ENV === 'production'

function cached<T>(fn: () => T): () => T {
  let value: T | undefined
  return () => {
    if (!shouldCache) return fn()
    if (value === undefined) value = fn()
    return value
  }
}

function readFrontmatter(filePath: string) {
  return matter(fs.readFileSync(filePath, 'utf-8')).data
}

export const getAllPages = cached((): PageDoc[] =>
  walkDir(contentDir)
    .filter(f => {
      if (!f.endsWith('.mdx')) return false
      const rel = path.relative(contentDir, f)
      return !rel.startsWith('blog' + path.sep) && !rel.startsWith('_')
    })
    .map(file => {
      const data = readFrontmatter(file)
      const slug = path.relative(contentDir, file).replace(/\.mdx$/, '').replace(/\\/g, '/')
      const routePath = '/' + slug.replace(/(^|\/)index$/, '')
      return {
        slug,
        path: routePath,
        title: data.title || slug,
        date: data.date || '',
        description: data.description,
        img: data.image,
        category: data.category,
      }
    }),
)

export function getPageByPath(pagePath: string): PageDoc | null {
  const normalized = pagePath.replace(/\/$/, '') || '/'
  return getAllPages().find(p => p.path === normalized) || null
}

export const getAllBlogPosts = cached((): BlogPost[] => {
  if (!fs.existsSync(blogDir)) return []
  return fs
    .readdirSync(blogDir)
    .filter(f => f.endsWith('.mdx'))
    .map(file => {
      const data = readFrontmatter(path.join(blogDir, file))
      const slug = file.replace(/\.mdx$/, '')
      return {
        slug,
        path: '/blog/' + slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
        img: data.img,
        category: data.category,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return getAllBlogPosts().find(p => p.slug === slug) || null
}

function getCSVCollection<T>(filename: string): T[] {
  const filePath = path.join(contentDir, filename)
  if (!fs.existsSync(filePath)) return []
  const parsed = Papa.parse<T>(fs.readFileSync(filePath, 'utf-8'), {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  })
  return parsed.data
}

export const getStaff = cached(() => getCSVCollection<StaffMember>('_capi.csv'))
export const getMedia = cached(() => getCSVCollection<MediaEntry>('_media.csv'))
export const getQuotes = cached(() => getCSVCollection<Quote>('_quotes.csv'))

function walkDir(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walkDir(full) : [full]
  })
}
