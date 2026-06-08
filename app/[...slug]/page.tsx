import { notFound } from 'next/navigation'
import { getAllPages, getPageByPath } from '@/lib/content'
import Hero from '@/components/Hero'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  const pages = getAllPages()
  return pages.map(page => ({
    slug: page.path === '/' ? [] : page.path.split('/').filter(Boolean),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pagePath = '/' + (slug || []).join('/')
  const page = getPageByPath(pagePath)

  if (!page) return {}

  return {
    title: page.title,
    description: page.description,
    openGraph: page.img ? { images: [page.img] } : undefined,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const pagePath = '/' + (slug || []).join('/')
  const page = getPageByPath(pagePath)

  if (!page) notFound()

  let MDXContent: React.ComponentType

  try {
    const slugNormalized = page.slug.replace(/\/index$/, '') || '_home'
    MDXContent = (await import(`@/content/${slugNormalized}.mdx`)).default
  } catch {
    try {
      MDXContent = (await import(`@/content/${page.slug}.mdx`)).default
    } catch {
      notFound()
    }
  }

  return (
    <>
      <Hero title={page.title} image={page.img} />
      <div className="container space-y-2 mt-5">
        <div className="prose-container">
          <MDXContent />
        </div>
      </div>
    </>
  )
}
