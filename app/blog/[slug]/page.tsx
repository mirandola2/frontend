import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/content'
import { imagekitUrl } from '@/lib/imagekit'
import BlogLayout from '@/components/BlogLayout'
import CategoryBadge, { formatMonthYear } from '@/components/CategoryBadge'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: post.img ? { images: [imagekitUrl(post.img, 'w-1200')] } : undefined,
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const { default: MDXContent } = await import(`@/content/blog/${slug}.mdx`)

  return (
    <BlogLayout>
      <header className="card bg-neutral image-full w-full mx-auto relative overflow-hidden">
        {post.img && (
          <figure>
            <Image src={post.img} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" preload className="object-cover opacity-50 blur-sm" />
          </figure>
        )}
        <div className="card-body gap-3 py-10">
          <Link href="/blog" className="text-sm font-bold uppercase tracking-widest opacity-80 hover:opacity-100 hover:underline w-fit">
            ← Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-display text-balance">{post.title}</h1>
          <p className="text-lg">{post.description || 'Descrizione non disponibile.'}</p>
          <div className="card-actions justify-end">
            {post.category && <CategoryBadge category={post.category} />}
            <span className="badge border-0 bg-base-300">{formatMonthYear(post.date, true)}</span>
          </div>
        </div>
      </header>

      <div className="prose-container mt-6">
        <MDXContent />
      </div>
    </BlogLayout>
  )
}
