import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/content'
import BlogLayout from '@/components/BlogLayout'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: post.img ? { images: [post.img] } : undefined,
  }
}

const badge: Record<string, { bg: string; text: string }> = {
  lc: { bg: 'bg-lc text-lc-content', text: 'L/C' },
  eg: { bg: 'bg-eg text-eg-content', text: 'E/G' },
  rs: { bg: 'bg-rs text-rs-content', text: 'R/S' },
  cc: { bg: 'bg-cc text-white', text: 'Gruppo' },
}

function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  let MDXContent: React.ComponentType
  try {
    MDXContent = (await import(`@/content/blog/${slug}.mdx`)).default
  } catch {
    notFound()
  }

  return (
    <BlogLayout>
      <div className="card bg-neutral image-full w-full mx-auto relative overflow-auto">
        {post.img && (
          <figure className="h-full">
            <Image
              src={post.img}
              alt="Immagine del blog"
              width={1200}
              height={600}
              className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm"
            />
          </figure>
        )}
        <div className="card-body">
          <h3 className="text-3xl">Blog</h3>
          <h2 className="card-title text-4xl font-display">{post.title}</h2>
          <p>{post.description || 'Descrizione non disponibile.'}</p>
          <div className="card-actions justify-end">
            {post.category && (
              <span className={`badge border-0 ${badge[post.category]?.bg || ''}`}>
                {badge[post.category]?.text || post.category}
              </span>
            )}
            <span className="badge border-0 bg-base-300">
              {capitalizeFirstLetter(
                new Date(post.date).toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="prose-container mt-6">
        <MDXContent />
      </div>
    </BlogLayout>
  )
}
