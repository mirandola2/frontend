<script setup>
import { ref, onBeforeMount } from "vue";
const router = useRouter();
const  {page} = useContent()

const menu = ref({
  Home: "/",
  "Chi Siamo": {
    "L'Associazione": "/associazione",
    "Il Gruppo": "/gruppo",
    "La Comunità Capi": "/coca",
    "Il Progetto Educativo": "/progetto",
    Contatti: "/contatti",
    Iscrizioni: "/iscrizioni"
  },
  "Lupetti e Coccinelle": {
    "La Branca L/C": "/lc/",
    "Branco della Roccia Azzurra": "/lc/lupetti",
    "Cerchio del Bosco Gioioso": "/lc/coccinelle",
    "Piccole Orme": "/lc/piccole-orme",
    Specialità: "/lc/specialita",
    "Iniziazione Cristiana": "/lc/ic",
  },
  "Esploratori e Guide": {
    "La Branca E/G": "/eg",
    "Reparto Brownsea": "/eg/brownsea",
    "Reparto Antares": "/eg/antares",
    "Campi di Specialità e Competenza": "/eg/campetti",
    "Specialità e Competenze": "/eg/specialita",
  },
  "Rover e Scolte": {
    "La Branca R/S": "/rs/",
    "Clan Fuoco MdV": "/rs/mdv",
    Noviziato: "/rs/noviziato",
    "Epppi/Ross": "/rs/epppi-ross",
  },
  Archivio: {
    "Archivio Totem": "/totem",
    "Staff del Passato": "/archivio-staff",
    "Campi e Route": "/archivio-campi-route",
    "Foto e Video": "/media",
  },
  Utilities: {
    "Ricerca Codice Socio": "/codice-socio",
    "Uniforme e Distintivi": "/uniforme",
    "Traduttore Morse": "/morse",
    "Materiali e link": "/materiale",
  },
});
const regex = /^\/blog/;

const solid = regex.test(router.currentRoute.value.fullPath) || page.value?.navbar_solid;
const transparentNavbar = ref(!solid);
const fixedNavbar = ref(!solid);

const nuxtApp = useNuxtApp();

nuxtApp.hook("page:finish", () => {
  if (!solid){
    window.addEventListener("scroll", handleScroll);
  }
});

function handleScroll() {
  if (window.scrollY > 5) {
    if (transparentNavbar.value) transparentNavbar.value = false;
  } else {
    if (!transparentNavbar.value) transparentNavbar.value = true;
  }
}

useSeoMeta({
  ogTitle: router.currentRoute.value.path != '/' ? page.value?.title + ' ~ Agesci Gruppo Mirandola 2' : 'Agesci Scout Mirandola 2 ~ 40 anni di giochi, avventure e strade!',
  description: router.currentRoute.value.path == '/' ? 'Siamo a Mirandola dal 1983: scopri le ultime notizie, la nostra storia, i nostri Capi, i nomi totem, la galleria foto e video e una raccolta di strumenti utili.': page.value?.description,
  ogDescription: router.currentRoute.value.path == '/' ? 'Siamo a Mirandola dal 1983: scopri le ultime notizie, la nostra storia, i nostri Capi, i nomi totem, la galleria foto e video e una raccolta di strumenti utili.': page.value?.description,
  ogImage: router.currentRoute.value.path == '/' ? '/img/misc/hero.jpg' : page.value?.image,
})

</script>

<template>
  <Head>
    <Title>{{page?.title ? page?.title + ' ~ ' : 'Gruppo' }} Scout Mirandola 2 ~ Da più di 40 anni facciamo giochi, avventure e strade</Title>
  </Head>

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
  />
  <div class="drawer drawer-end" tabindex="0">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <main class="drawer-content flex flex-col min-h-screen">
      <!-- Navbar -->
      <div
        class="navbar text-primary-content lg:top-0 z-50"
        :class="{
          fixed: fixedNavbar,
          sticky: !fixedNavbar,
          transparent: transparentNavbar,
          'bg-primary shadow-md': !transparentNavbar,
        }"
      >
        <div class="container max-w-none mx-auto">
          <div class="flex-1 w-3/4 flex">
            <h1 class="text-2xl my-auto font-bold">
              <a href="/">
                <NuxtImg placeholder src="/img/graphics/logo_white.svg" class="h-16 -ml-3 lg:ml-0" />
              </a>
            </h1>
          </div>

          <div class="flex-none hidden lg:block">
            <ul class="menu menu-horizontal text-white">
              <!-- Navbar menu content here -->
              <template v-for="(submenu, mainItem) in menu" :key="mainItem">
                <li>
                  <!-- Check if the submenu is an object -->
                  <template v-if="typeof submenu === 'object'">
                    <div
                      class="menu-dropdown-toggle dropdown dropdown-end dropdown-bottom dropdown-hover hover:text-secondary"
                    >
                      <label tabindex="0" class="">{{ mainItem }}</label>
                      <ul
                        tabindex="0"
                        class="dropdown-content z-[1] menu p-2 shadow bg-secondary text-white rounded-box w-60"
                      >
                        <!-- Loop through the sub-menu items -->
                        <li v-for="(link, subItem) in submenu" :key="subItem">
                          <a :href="link">{{ subItem }}</a>
                        </li>
                      </ul>
                    </div>
                  </template>
                  <!-- If not an object, it's a direct link -->
                  <template v-else>
                    <a :href="submenu" class="hover:text-secondary">{{
                      mainItem
                    }}</a>
                  </template>
                </li>
              </template>
            </ul>
          </div>
        </div>

        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
      </div>
      <!-- Page content here -->
      <NuxtPage />

      <Footer />
    </main>
    <div class="drawer-side min-h-full z-50">
      <label for="my-drawer-3" class="drawer-overlay"></label>

      <div class="flex flex-row min-h-full">
        <div class="bg-[#07ac0f] w-1"></div>
        <div class="bg-[#ffee18] w-1"></div>

        <div>
          <ul
            class="menu p-4 w-80 bg-secondary min-h-full overflow-y-scroll text-white"
          >
            <!-- Sidebar content here -->
            <a href="/">
              <NuxtImg placeholder src="/img/graphics/logo_white.svg" class="h-24 mb-8" alt="" />
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
                <li>
                  <a :href="submenu" class="hover:text-secondary">{{
                    mainItem
                  }}</a>
                </li>
              </template>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
