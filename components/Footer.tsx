'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <div className="mt-auto">
      <footer className="mt-12 py-5 sm:p-10 bg-primary text-primary-content">
        <div className="container footer md:footer-horizontal text-center place-items-center md:justify-between md:place-items-start md:text-left items-center">
          <aside className="gap-5">
            <div className="space-y-2">
              <p>
                <b>AGESCI - Gruppo Scout Mirandola 2</b>
                <br />
                Via Posta, 55 - 41037 Mirandola (MO)
              </p>
              <p suppressHydrationWarning>&copy; {new Date().getFullYear()} - Tutti i diritti riservati</p>
              <nav className="text-accent font-bold" aria-label="Link utili">
                <div className="grid grid-flow-col gap-4">
                  <Link className="link link-hover" href="/privacy-policy">
                    Privacy Policy
                  </Link>
                  <Link className="link link-hover" href="/contatti">
                    Contatti
                  </Link>
                  <button
                    type="button"
                    className="link link-hover text-left"
                    onClick={() => (document.getElementById('credit_modal') as HTMLDialogElement | null)?.showModal()}
                  >
                    Credit
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          <p className="text-2xl font-serif inline md:text-right">
            <i>Eccoci,</i> <br />
            <i>del nostro meglio,</i> <br />
            per <i>essere pronti</i> <br />
            a <i>servire</i>.
          </p>
        </div>
      </footer>

      <dialog id="credit_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Chiudi">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-primary">Credits</h3>
          <p className="py-4 font-normal text-justify">
            Il sito web che stai leggendo è stato sviluppato sulla base del lavoro di{' '}
            <i>Lince Spensierata</i>, da <i>Aquila Ambiziosa</i> e tutti coloro che lo hanno
            aiutato durante le fasi di costruzione e revisione. Il codice sorgente dell&apos;intero
            sito, così come l&apos;elenco di chi ha contribuito, è disponibile su{' '}
            <i>GitHub/Mirandola2</i>. Essendo open-source, chiunque può leggere il codice e
            migliorarlo.
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Chiudi">chiudi</button>
        </form>
      </dialog>
    </div>
  )
}
