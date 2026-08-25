import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero'
import Quote from '@/components/Quote'
import BlogLayout from '@/components/BlogLayout'
import BlogFeed from '@/components/BlogFeed'
import { getAllBlogPosts } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AGESCI Scout Mirandola 2 ~ Da più di 40 anni facciamo giochi, avventure e strade.',
  description: 'Siamo a Mirandola dal 1983: scopri le ultime notizie, la nostra storia, i nostri staff, i nomi totem, la galleria foto e video e una raccolta di strumenti utili.',
}

export default async function HomePage() {
  let HomeMDX: React.ComponentType | null = null
  try {
    HomeMDX = (await import('@/content/_home.mdx')).default
  } catch {}

  const posts = getAllBlogPosts().slice(0, 4)

  return (
    <>
      <Hero title="Quarant'anni di giochi, avventure e strade." image="/img/archive/2022_foto-gruppo.jpg" big />

      <div className="container grid md:grid-cols-3 -mt-24">
        <div className="card max-w-full bg-lc text-eg-content rounded-t-2xl rounded-b-none md:rounded-l-2xl md:rounded-r-none relative overflow-hidden">
          <div className="text-center card-body items-center z-10">
            <h2 className="card-title">Lupetti e Coccinelle</h2>
            <p>
              Dagli 8 agli 11 anni i bambini e le bambine &quot;cacciano&quot; e &quot;volano&quot; nel &quot;branco&quot; e
              nel &quot;cerchio&quot;.
              <Link className="link" href="/lc">Leggi.</Link>
            </p>
            <div className="card-actions justify-center">
              <Link className="btn btn-ghost btn-sm" href="/lc/lupetti">Branco</Link>
              <Link className="btn btn-ghost btn-sm" href="/lc/coccinelle">Cerchio</Link>
            </div>
          </div>
          <Image src="/img/graphics/icon_cappellini.svg" alt="" fill className="absolute w-full h-full p-2 opacity-10 object-contain" />
        </div>

        <div className="card max-w-full bg-eg text-lc-content rounded-none relative overflow-hidden">
          <div className="card-body items-center text-center z-10">
            <h2 className="card-title">Esploratori e Guide</h2>
            <p>
              La Branca Esploratori/Guide si rivolge ai ragazzi da 12 a 16
              anni che si uniscono nei Reparti.
              <Link className="link" href="/eg">Leggi.</Link>
            </p>
            <div className="card-actions justify-center">
              <Link className="btn btn-ghost btn-sm" href="/eg/brownsea">Esploratori</Link>
              <Link className="btn btn-ghost btn-sm" href="/eg/antares">Guide</Link>
            </div>
          </div>
          <Image src="/img/graphics/icon_tenda.svg" alt="" fill className="absolute w-full h-full p-2 opacity-10 object-contain" />
        </div>

        <div className="card max-w-full bg-rs text-rs-content rounded-b-2xl rounded-t-none md:rounded-r-2xl md:rounded-l-none relative overflow-hidden">
          <div className="text-center card-body items-center z-10">
            <h2 className="card-title">Rover e Scolte</h2>
            <p>
              I Rover e le Scolte tra i 16 e 19 anni aderiscono alla proposta che
              lo scautismo fa alla loro età.
              <Link className="link" href="/rs">Leggi.</Link>
            </p>
            <div className="card-actions justify-center">
              <Link className="btn btn-ghost btn-sm" href="/rs/noviziato">Noviziato</Link>
              <Link className="btn btn-ghost btn-sm" href="/rs/mdv">Clan Fuoco</Link>
            </div>
          </div>
          <Image src="/img/graphics/icon_forcola.svg" alt="" fill className="absolute w-full h-full p-2 opacity-10 object-contain" />
        </div>
      </div>

      <div className="py-12 bg-base-200 -mt-5">
        <Quote type="gruppo" />
      </div>

      <BlogLayout>
        {HomeMDX && (
          <div className="card max-w-none bg-base-300">
            <div className="card-body news">
              <h2 className="card-title">In Primo Piano</h2>
              <HomeMDX />
            </div>
          </div>
        )}
        <div className="grid lg:grid-cols-2 mt-3 gap-3">
          <BlogFeed posts={posts} images={false} />
        </div>
        <p className="text-right w-full mt-3">
          <Link href="/blog" className="btn btn-base-200">Leggi Tutte le notizie</Link>
        </p>
      </BlogLayout>
    </>
  )
}
