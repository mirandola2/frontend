'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex-1 flex items-center justify-center bg-base-100 px-4 py-16">
      <div className="text-center max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl text-primary">Quando la strada non c&apos;è, inventala!</h1>
          <p className="text-lg">
            Ops, si è verificato un errore e non siamo in grado di fornirti la pagina correttamente.
          </p>
        </div>

        <div className="bg-base-200 rounded-lg p-6 inline-block">
          <p>
            <span className="font-bold">Errore 500</span>
            {error.message && <span> - {error.message}</span>}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/" className="btn btn-primary btn-lg">
            Torna alla Home
          </Link>
          <button onClick={reset} className="btn btn-outline btn-primary btn-lg">
            Riprova
          </button>
        </div>
      </div>
    </div>
  )
}
