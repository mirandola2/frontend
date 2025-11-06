<template>
  <div class="mt-auto"><footer class="mt-12 py-5 sm:p-10 bg-primary text-primary-content">
    <div class="container footer md:footer-horizontal text-center place-items-center md:justify-between md:place-items-start md:text-left items-center">
      <aside class="gap-5">
        <div class="space-y-2">
          <p>
            <b>AGESCI - Gruppo Scout Mirandola 2</b><br />Via Posta, 55 - 41037
            Mirandola (MO)
          </p>

          <p>
            &copy; {{ new Date().getFullYear() }} - Tutti i diritti riservati
          </p>

          <nav class="text-secondary font-bold">
            <div class="grid grid-flow-col gap-4">
              <a class="link link-hover" href="/privacy-policy">Privacy Policy</a>
              <a class="link link-hover" href="/contatti">Contatti</a>

              <button
                class="link link-hover"
                onclick="credit_modal.showModal()"
              >
                Credit
              </button>
              <dialog id="credit_modal" class="modal">
                <div class="modal-box">
                  <form method="dialog">
                    <button
                      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                      ✕
                    </button>
                  </form>
                  <h3 class="font-bold text-lg">Credits</h3>
                  <p class="py-4 font-normal text-justify">
                    Il sito web che stai leggendo è stato sviluppato sulla base del lavoro di <i>Lince Spensierata</i>, da <i>Aquila Ambiziosa</i> e tutti coloro che lo hanno aiutato durante le fasi di costruzione e revisione.
                    Il codice sorgente dell'intero sito, così come l'elenco di chi ha contribuito, è disponibile su <i>GitHub/Mirandola2</i>. Essendo open-source, chiunque può leggere il codice e migliorarlo.
                  </p>
                </div>
              </dialog>
            </div>
          </nav>
        </div>
      </aside>

      <p class="text-2xl font-serif inline md:text-right">
        <i>Del nostro meglio</i> <br />
        per <i>essere pronti</i> <br />
        a <i>servire</i>.
      </p>
    </div>
  </footer></div>
</template>
