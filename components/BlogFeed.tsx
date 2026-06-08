import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/content'

interface BlogFeedProps {
  posts: BlogPost[]
  horizontal?: boolean
  images?: boolean
}

const badge: Record<string, { bg: string; text: string }> = {
  lc: { bg: 'bg-lc text-lc-content', text: 'L/C' },
  eg: { bg: 'bg-eg text-eg-content', text: 'E/G' },
  rs: { bg: 'bg-rs text-rs-content', text: 'R/S' },
  cc: { bg: 'bg-cc text-white', text: 'Gruppo' },
}

export default function BlogFeed({ posts, horizontal = false, images = true }: BlogFeedProps) {
  return (
    <>
      {posts.map(post => (
        <div key={post.slug} className="relative hover:shadow shadow-lg rounded-2xl">
          <Link href={post.path} className="absolute z-10 w-full h-full" />
          <div className={`card w-full bg-base-100 ${horizontal ? 'md:card-side' : ''}`}>
            {images && post.img && (
              <figure className="bg-contain max-h-40 bg-neutral max-w-full md:max-w-xs">
                <Image src={post.img} alt={post.title} width={300} height={200} />
              </figure>
            )}
            <div className="card-body">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p>
                {post.description}
                <Link href={post.path} className="link"> Leggi tutto</Link>
              </p>
              <p className="text-sm">
                <span className="opacity-50">
                  Pubblicato in{' '}
                  {new Date(post.date).toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
                </span>
                {post.category && (
                  <>
                    &nbsp;•&nbsp;
                    <span className={`badge border-0 ${badge[post.category]?.bg || ''}`}>
                      {badge[post.category]?.text || post.category}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
