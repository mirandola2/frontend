<template>
  <footer class="p-10 bg-neutral text-neutral-content">
    <div class="container footer items-center">
      <aside class="flex gap-5">
        <div class="space-y-2">
          <p>
          <b>AGESCI - Gruppo Scout Mirandola 2</b><br />Via Posta, 55 - 41037 Mirandola
          (MO)
        </p>

        <p>
          &copy; {{ new Date().getFullYear() }} - Tutti i diritti riservati
        </p>


        <nav class="text-primary">
          <div class="grid grid-flow-col gap-4">
            <a class="link link-hover">Privacy Policy</a>
            <a class="link link-hover">Contatti</a>
            <a class="tooltip tooltip-primary link link-hover" data-tip="Sito web open-source by Aquila Ambiziosa e Leoncino Spensierato. Contribuisci su github/mirandola2.">
              Credit
            </a>
          </div>
        </nav>
        </div>
      </aside>

      <p class="text-lg font-serif inline text-primary">
        <i>Del nostro meglio</i> per <i>essere pronti</i> a <i>servire</i>.
      </p>
    </div>
  </footer>
</template>
