'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const is404 = 'statusCode' in error && (error as any).statusCode === 404

  return (
    <html lang="it">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#462678" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body>
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
                    {is404 ? "Oops! Questa pagina non esiste." : "Quando la strada non c'è, inventala!"}
                  </h1>
                  <p className="text-lg">
                    {is404
                      ? "La pagina che stai cercando non è stata trovata. Potrebbe essere stata rimossa o il link potrebbe essere errato."
                      : "Ops, si è verificato un errore e non siamo in grado di fornirti la pagina correttamente."}
                  </p>
                </div>

                <div className="bg-base-200 rounded-lg p-6 inline-block">
                  <p>
                    <span className="font-bold">Errore {'statusCode' in error ? (error as any).statusCode : '500'}</span>
                    {!is404 && error.message && <span> - {error.message}</span>}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link href="/" className="btn btn-primary btn-lg">
                    Torna alla Home
                  </Link>
                  {!is404 && (
                    <button onClick={reset} className="btn btn-outline btn-primary btn-lg">
                      Riprova
                    </button>
                  )}
                </div>
              </div>
            </div>

            <Footer />
          </main>
        </Header>
      </body>
    </html>
  )
}
