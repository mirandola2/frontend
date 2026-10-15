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
    <BlogLayout belowNavbar>
      <div className="grid gap-4">
        <div className="card w-full bg-base-200">
          <div className="card-body">
            <h1 className="font-display text-4xl text-primary">Tutte le notizie</h1>
          </div>
        </div>
        <BlogFeed posts={posts} horizontal />
      </div>
    </BlogLayout>
  )
}
