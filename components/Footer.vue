<template>
  <footer class="p-10 mt-auto bg-primary text-primary-content">
    <div class="container footer text-center place-items-center md:justify-between md:place-items-start md:text-left items-center">
      <aside class="flex gap-5">
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
              <a class="link link-hover">Privacy Policy</a>
              <a class="link link-hover">Contatti</a>

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
                  <p class="py-4">
                    Sito web open-source sviluppato da Aquila Ambiziosa. Puoi vedere il codice e contribuire anche tu su <i>github/mirandola2</i>.
                    Questo lavoro è stato possibile solo grazie all'aiuto di Lince Spensierata, Leoncino Spensierato e tutti coloro che hanno partecipato.
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
  </footer>
</template>
