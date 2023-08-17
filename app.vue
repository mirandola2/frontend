<script setup>
import { ref } from "vue";

const menu = ref({
  "Chi Siamo": {
    "L'Associazione": "/associazione",
    "Il Gruppo": "/gruppo",
    "La Comunità Capi": "/coca",
  },
  "Lupetti e Coccinelle": {
    "La Branca L/C": "/lc/",
    "Branco della Roccia Azzurra": "/lc/lupetti",
    "Cerchio del Bosco Gioioso": "/lc/coccinelle",
    "Piccole Orme": "/lc/piccole-orme",
    "Specialità": "/lc/specialita",
  },
  "Esploratori e Guide": {
    "La Branca E/G": "/eg",
    "Reparto Brownsea": "/eg/brownsea",
    "Reparto Antares": "/eg/antares",
    "Campi di Specialità e Competenza": "/eg/campetti",
    "Specialità e Brevetti": "/eg/specialità-brevetti",
  },
  "Rover e Scolte": {
    "La Branca R/S": "/rs/",
    "Clan Fuoco Madonna della Valle": "/rs/mdv",
    "Noviziato": "/rs/noviziato",
    "Epppi/Ross": "/rs/epppi-ross",
  },
  'Archivio': {
    "Totem": "/totem",
    "Staff del Passato": "/albo",
    "Campi e Route": "/campi",
  },
  'Utilities': {
    "Ricerca Codice Socio": "/codice",
    "Uniforme e Distintivi": "/uniforme",
  },
});
</script>

<template>
  <div class="drawer drawer-end" tabindex="0">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar bg-primary text-primary-content lg:sticky lg:top-0 lg:z-10">
        <div class="container mx-auto">
          <div class="flex-1 w-3/4 flex">
            <h1 class="text-2xl my-auto font-bold">
              <a href="/">Mirandola 2</a>
            </h1>
          </div>


          <div class="flex-none hidden lg:block">
            <ul class="menu menu-horizontal">
              <!-- Navbar menu content here -->
              <template v-for="(submenu, mainItem) in menu" :key="mainItem">
                <li>
                  <!-- Check if the submenu is an object -->
                  <template v-if="typeof submenu === 'object'">
                    <div class="menu-dropdown-toggle dropdown dropdown-end dropdown-bottom dropdown-hover hover:text-secondary">
                      <label tabindex="0" class="">{{ mainItem }}</label>
                      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-secondary text-white rounded-box w-44">
                        <!-- Loop through the sub-menu items -->
                        <li v-for="(link, subItem) in submenu" :key="subItem">
                          <a :href="link">{{ subItem }}</a>
                        </li>
                      </ul>
                    </div>
                  </template>
                  <!-- If not an object, it's a direct link -->
                  <template v-else>
                    <a :href="submenu" class="hover:text-secondary">{{ mainItem }}</a>
                  </template>
                </li>
              </template>
            </ul>
          </div>
        </div>

        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
      </div>
      <!-- Page content here -->

      <div class="mx-auto flex flex-col min-h-screen">
        <NuxtPage />

        <Footer />
      </div>
    </div>
    <div class="drawer-side min-h-full overflow-y-scroll ">
      <label for="my-drawer-3" class="drawer-overlay"></label>


      <div class="flex flex-row min-h-full ">
        <div class="bg-[#07ac0f] w-1"></div>
        <div class="bg-[#ffee18] w-1"></div>
       


        <div>
          <ul class="menu p-4 w-80 bg-secondary min-h-full overflow-y-scroll  text-white">
            <!-- Sidebar content here -->
            <a href="/">
            <img src="/logo_white.svg" class="h-24 mb-8 " alt="">
          </a>
            <template v-for="(submenu, mainItem) in menu" :key="mainItem">
              <!-- Check if the submenu is an object -->
              <template v-if="typeof submenu === 'object'">
                <li>
                  <details>
                    <summary>{{ mainItem }}</summary>
                    <ul>
                      <!-- Loop through the sub-menu items -->
                      <li v-for="(link, subItem) in submenu" :key="subItem">
                        <a :href="link">{{ subItem }}</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </template>
              <!-- If not an object, it's a direct link -->
              <template v-else>
                <li><a :href="submenu" class="hover:text-secondary">{{ mainItem }}</a></li>
              </template>

            </template>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
