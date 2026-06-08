import BlogLayout from '@/components/BlogLayout'
import BlogFeed from '@/components/BlogFeed'
import { getAllBlogPosts } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog del Gruppo Scout Mirandola 2 ~ Da più di 40 anni facciamo giochi, avventure e strade.',
  description: 'Siamo a Mirandola dal 1983: scopri le ultime notizie, la nostra storia, i nostri staff, i nomi totem, la galleria foto e video e una raccolta di strumenti utili.',
}

export default function BlogIndex() {
  const posts = getAllBlogPosts()

  return (
    <BlogLayout>
      <div className="grid gap-3">
        <div className="card w-full bg-base-200 shadow-none">
          <div className="card-body">
            <h2 className="text-2xl font-bold">Tutte le notizie</h2>
          </div>
        </div>
        <BlogFeed posts={posts} horizontal />
      </div>
    </BlogLayout>
  )
}
