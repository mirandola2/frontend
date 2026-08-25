import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center bg-base-100 px-4 py-16">
      <div className="text-center max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl text-primary">Oops! Questa pagina non esiste.</h1>
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
  )
}
