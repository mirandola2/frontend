import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Papa from 'papaparse'

const contentDir = path.join(process.cwd(), 'content')

export interface PageDoc {
  slug: string
  path: string
  title: string
  date: string
  description?: string
  img?: string
  category?: string
  body: string
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

function parseMdx(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const relative = path.relative(contentDir, filePath)
  const slug = relative.replace(/\.mdx$/, '').replace(/\\/g, '/')
  const slugClean = slug.replace(/^blog\//, '')
  return { data, content, slug, slugClean, relative }
}

export function getAllPages(): PageDoc[] {
  const files = walkDir(contentDir).filter(f => {
    if (!f.endsWith('.mdx')) return false
    const rel = path.relative(contentDir, f)
    return !rel.startsWith('blog/') && !rel.startsWith('_')
  })
  return files.map(file => {
    const { data, content, slug } = parseMdx(file)
    const routePath = '/' + slug.replace(/\/index$/, '')
    return {
      slug,
      path: routePath === '' ? '/' : routePath,
      title: data.title || slug,
      date: data.date || '',
      description: data.description,
      img: data.img,
      category: data.category,
      body: content,
    }
  })
}

export function getPageByPath(pagePath: string): PageDoc | null {
  const normalized = pagePath.replace(/\/$/, '') || '/'
  const pages = getAllPages()
  return pages.find(p => p.path === normalized) || null
}

export function getAllBlogPosts(): BlogPost[] {
  const blogDir = path.join(contentDir, 'blog')
  if (!fs.existsSync(blogDir)) return []
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))
  return files.map(file => {
    const { data, content, slugClean } = parseMdx(path.join(blogDir, file))
    return {
      slug: slugClean,
      path: '/blog/' + slugClean,
      title: data.title || slugClean,
      date: data.date || '',
      description: data.description || '',
      img: data.img,
      category: data.category,
      body: content,
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const blogDir = path.join(contentDir, 'blog')
  const filePath = path.join(blogDir, slug + '.mdx')
  if (!fs.existsSync(filePath)) return null
  try {
    const { data, content } = parseMdx(filePath)
    return {
      slug,
      path: '/blog/' + slug,
      title: data.title || slug,
      date: data.date || '',
      description: data.description || '',
      img: data.img,
      category: data.category,
      body: content,
    }
  } catch {
    return null
  }
}

export function getCSVCollection<T>(filename: string): T[] {
  const filePath = path.join(contentDir, filename)
  if (!fs.existsSync(filePath)) return []
  const raw = fs.readFileSync(filePath, 'utf-8')
  const parsed = Papa.parse<T>(raw, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  })
  return parsed.data
}

export function getStaff(): StaffMember[] {
  return getCSVCollection<StaffMember>('_capi.csv')
}

export function getMedia(): MediaEntry[] {
  return getCSVCollection<MediaEntry>('_media.csv')
}

export function getQuotes(): Quote[] {
  return getCSVCollection<Quote>('_quotes.csv')
}

function walkDir(dir: string): string[] {
  const files: string[] = []
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry)
    if (fs.statSync(full).isDirectory()) {
      files.push(...walkDir(full))
    } else {
      files.push(full)
    }
  }
  return files
}
