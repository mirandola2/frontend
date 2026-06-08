'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function NotFound() {
  return (
    <Header>
      <main className="drawer-content flex flex-col min-h-screen">
        <div className="navbar text-primary-content sticky xl:top-0 z-50 bg-primary shadow-md">
          <div className="container max-w-none max-xl:px-5 xl:mx-auto flex items-center">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                <Link href="/">
                  <Image
                    src="/img/graphics/logo_white.svg"
                    alt="logo"
                    width={64}
                    height={64}
                    className="h-16 -ml-3 xl:ml-0"
                  />
                </Link>
              </h1>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center bg-base-100 px-4 py-16">
          <div className="text-center max-w-2xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl text-primary">
                Oops! Questa pagina non esiste.
              </h1>
              <p className="text-lg">
                La pagina che stai cercando non è stata trovata. Potrebbe essere stata rimossa o il
                link potrebbe essere errato.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/" className="btn btn-primary btn-lg">
                Torna alla Home
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </Header>
  )
}
