import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/content'
import CategoryBadge, { formatMonthYear } from './CategoryBadge'

interface BlogFeedProps {
  posts: BlogPost[]
  horizontal?: boolean
  images?: boolean
}

export default function BlogFeed({ posts, horizontal = false, images = true }: BlogFeedProps) {
  return (
    <>
      {posts.map(post => (
        <article
          key={post.slug}
          className={`card relative w-full bg-base-100 shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-xl has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-secondary ${
            horizontal ? 'md:card-side' : ''
          }`}
        >
          {images && post.img && (
            <figure className="bg-neutral max-h-40 max-w-full md:max-w-xs">
              <Image src={post.img} alt="" width={320} height={200} className="h-full w-full object-cover" />
            </figure>
          )}
          <div className="card-body">
            <h2 className="text-xl font-bold text-balance">
              {/* Stretched link: the whole card is clickable through this single link */}
              <Link href={post.path} className="after:absolute after:inset-0 after:rounded-box focus:outline-none">
                {post.title}
              </Link>
            </h2>
            <p>
              {post.description} <span className="link text-secondary">Leggi tutto</span>
            </p>
            <p className="flex flex-wrap items-center gap-2 text-sm">
              <span className="opacity-60">Pubblicato in {formatMonthYear(post.date)}</span>
              {post.category && <CategoryBadge category={post.category} />}
            </p>
          </div>
        </article>
      ))}
    </>
  )
}
