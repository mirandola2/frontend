'use client'

import Link from 'next/link'
import Hero from '@/components/Hero'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <>
      <Hero title="Quando la strada non c'è, inventala!" />
      <div className="container py-12 text-center max-w-2xl space-y-8">
        <p className="text-lg">
          Ops, si è verificato un errore e non siamo in grado di fornirti la pagina correttamente.
        </p>

        <div className="bg-base-200 rounded-box p-6 inline-block">
          <p>
            <span className="font-bold">Errore 500</span>
            {error.message && <span> - {error.message}</span>}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary btn-lg">
            Torna alla Home
          </Link>
          <button type="button" onClick={reset} className="btn btn-outline btn-primary btn-lg">
            Riprova
          </button>
        </div>
      </div>
    </>
  )
}
