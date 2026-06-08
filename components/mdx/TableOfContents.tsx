'use client'

import { useSyncExternalStore } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
  children: TocItem[]
}

interface TableOfContentsProps {
  notaside?: boolean
  maxdepth?: number
}

function getTocFromDom(): TocItem[] {
  if (typeof window === 'undefined') return []
  const headings = document.querySelectorAll<HTMLHeadingElement>('h2, h3')
  const items: TocItem[] = []
  const stack: TocItem[] = []

  headings.forEach(h => {
    const id = h.id || h.textContent?.toLowerCase().replace(/\s+/g, '-') || ''
    if (!id && h.textContent) {
      h.id = h.textContent.toLowerCase().replace(/\s+/g, '-')
    }
    const item: TocItem = {
      id: h.id || id,
      text: h.textContent || '',
      level: h.tagName === 'H2' ? 2 : 3,
      children: [],
    }

    if (h.tagName === 'H2') {
      items.push(item)
      stack.length = 0
      stack.push(item)
    } else if (h.tagName === 'H3' && stack.length > 0) {
      stack[stack.length - 1].children.push(item)
    } else if (h.tagName === 'H3') {
      items.push(item)
    }
  })

  return items
}

function subscribeToToc(callback: () => void) {
  const observer = new MutationObserver(callback)
  if (typeof window !== 'undefined') {
    observer.observe(document.body, { childList: true, subtree: true })
  }
  return () => observer.disconnect()
}

export default function TableOfContents({ notaside = false, maxdepth = 2 }: TableOfContentsProps) {
  const toc = useSyncExternalStore(subscribeToToc, getTocFromDom, () => [])

  if (toc.length === 0) return null

  return (
    <div
      className={`not-prose card w-full bg-base-200 text-base-content my-5 ${
        !notaside ? 'md:float-right md:ml-5 md:w-96' : ''
      }`}
    >
      <div className="card-body">
        <h2 className="card-title">Indice</h2>
        <ul>
          {toc.map(link => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.text}</a>
              {maxdepth > 2 && link.children.length > 0 && (
                <ul>
                  {link.children.map(child => (
                    <li key={child.id} className="ml-4 text-sm">
                      <a href={`#${child.id}`}>{child.text}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
