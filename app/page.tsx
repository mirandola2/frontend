import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero'
import Quote from '@/components/Quote'
import BlogLayout from '@/components/BlogLayout'
import BlogFeed from '@/components/BlogFeed'
import HomeMDX from '@/content/_home.mdx'
import { getAllBlogPosts } from '@/lib/content'

const branches = [
  {
    title: 'Lupetti e Coccinelle',
    text: <>Dagli 8 agli 11 anni i bambini e le bambine &ldquo;cacciano&rdquo; e &ldquo;volano&rdquo; nel &ldquo;branco&rdquo; e nel &ldquo;cerchio&rdquo;.</>,
    href: '/lc',
    links: [
      { label: 'Branco', href: '/lc/lupetti' },
      { label: 'Cerchio', href: '/lc/coccinelle' },
    ],
    icon: '/img/graphics/icon_cappellini.svg',
    className: 'bg-lc text-lc-content rounded-t-2xl rounded-b-none md:rounded-l-2xl md:rounded-r-none',
  },
  {
    title: 'Esploratori e Guide',
    text: <>La Branca Esploratori/Guide si rivolge ai ragazzi da 12 a 16 anni che si uniscono nei Reparti.</>,
    href: '/eg',
    links: [
      { label: 'Esploratori', href: '/eg/brownsea' },
      { label: 'Guide', href: '/eg/antares' },
    ],
    icon: '/img/graphics/icon_tenda.svg',
    className: 'bg-eg text-eg-content rounded-none',
  },
  {
    title: 'Rover e Scolte',
    text: <>I Rover e le Scolte tra i 16 e 19 anni aderiscono alla proposta che lo scautismo fa alla loro età.</>,
    href: '/rs',
    links: [
      { label: 'Noviziato', href: '/rs/noviziato' },
      { label: 'Clan Fuoco', href: '/rs/mdv' },
    ],
    icon: '/img/graphics/icon_forcola.svg',
    className: 'bg-rs text-rs-content rounded-b-2xl rounded-t-none md:rounded-r-2xl md:rounded-l-none',
  },
]

export default function HomePage() {
  const posts = getAllBlogPosts().slice(0, 4)

  return (
    <>
      <Hero title="Quarant'anni di giochi, avventure e strade." image="/img/archive/2022_foto-gruppo.jpg" big />

      <div className="container grid md:grid-cols-3 -mt-24 relative z-10">
        {branches.map(branch => (
          <div key={branch.href} className={`card max-w-full relative overflow-hidden ${branch.className}`}>
            <div className="card-body items-center text-center z-10">
              <h2 className="card-title text-2xl">{branch.title}</h2>
              <p>
                {branch.text}{' '}
                <Link className="link font-bold" href={branch.href}>Leggi.</Link>
              </p>
              <div className="card-actions justify-center mt-2">
                {branch.links.map(link => (
                  <Link key={link.href} className="btn btn-sm btn-on-color" href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <Image
              src={branch.icon}
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="p-2 opacity-10 object-contain"
            />
          </div>
        ))}
      </div>

      <div className="py-12 bg-base-200 -mt-5">
        <Quote type="gruppo" />
      </div>

      <BlogLayout>
        <div className="card max-w-none bg-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl">In Primo Piano</h2>
            <div className="prose max-w-none prose-a:text-secondary prose-a:underline prose-li:my-0 prose-code:before:content-none prose-code:after:content-none">
              <HomeMDX />
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 mt-4 gap-4">
          <BlogFeed posts={posts} images={false} />
        </div>
        <p className="text-right w-full mt-4">
          <Link href="/blog" className="btn btn-primary">
            Leggi tutte le notizie
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </BlogLayout>
    </>
  )
}
