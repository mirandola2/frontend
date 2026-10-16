import Link from 'next/link'
import Hero from '@/components/Hero'
import { HouseIcon } from '@phosphor-icons/react/ssr'

export default function NotFound() {
  return (
    <>
      <Hero title="Oops! Questa pagina non esiste." />
      <div className="container py-12 text-center max-w-2xl space-y-8">
        <p className="text-lg">
          La pagina che stai cercando non è stata trovata. Potrebbe essere stata rimossa o il
          link potrebbe essere errato.
        </p>
        <Link href="/" className="btn btn-primary">
          <HouseIcon size={20} weight="bold" aria-hidden />
          Torna alla Home
        </Link>
      </div>
    </>
  )
}
