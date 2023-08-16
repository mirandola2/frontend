<script setup>
import { ref } from 'vue'



const menu = ref({
  "Home": "/",
  "Chi Siamo": {
    "L'Associazione": "/associazione",
    "Il Gruppo": "/gruppo",
    "La Comunità Capi": "/coca"
  },
  "Lupetti e Coccinelle": {
    "La Branca L/C": "/lc/",
    "Branco della Roccia Azzurra": "/lc/lupetti",
    "Cerchio del Bosco Gioioso": "/lc/coccinelle",
    "Piccole Orme": "/lc/piccole-orme",
    "Specialità": "/lc/specialita"
  },
  "Esploratori e Guide": {
    "La Branca E/G": "/eg",
    "Reparto Brownsea": "/eg/brownsea",
    "Reparto Antares": "/eg/antares",
    "Campi di Specialità e Competenza": "/eg/campetti",
    "Specialità e Brevetti": "/eg/specialità-brevetti"
  },
  "Rover e Scolte": {
    "La Branca R/S": "/rs/",
    "Clan Fuoco Madonna della Valle": "/rs/mdv",
    "Noviziato": "/rs/noviziato",
    "Epppi/Ross": "/rs/epppi-ross"
  },
  "Archivio": {
    "Totem": "/totem",
    "Staff del Passato": "/albo",
    "Campi e Route": "/campi"
  },
  "Utilities": {
    "Ricerca Codice Socio": "/codice",
    "Uniforme e Distintivi": "/uniforme"
  }
})

</script>
<template>
  <div class="navbar bg-primary text-primary-content sticky top-0 z-10">
    <div class="container mx-auto px-2">
      <div class="navbar-start w-3/4 flex">
        <h1 class="text-2xl my-auto font-bold"><a href="/">Mirandola 2</a></h1>
      </div>

      <div class="navbar-center"></div>

      <div class="navbar-end w-10 ml-auto">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>

          <ul tabindex="0" class="menu menu-xl dropdown-content mt-3 mr-2 z-[1] rounded-box bg-secondary w-72">
            <!-- Loop through the menu dictionary -->
            <template v-for="(submenu, mainItem) in menu" :key="mainItem">
              <li>
                <!-- Check if the submenu is an object -->
                <template v-if="typeof submenu === 'object'">
                  <details>
                    <summary>{{ mainItem }}</summary>
                    <ul class="">
                      <!-- Loop through the sub-menu items -->
                      <li v-for="(link, subItem) in submenu" :key="subItem">
                        <a :href="link">{{ subItem }}</a>
                      </li>
                    </ul>
                  </details>
                </template>
                <!-- If not an object, it's a direct link -->
                <template v-else>
                  <a :href="submenu">{{ mainItem }}</a>
                </template>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>



