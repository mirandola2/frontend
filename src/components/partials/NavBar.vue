<script>
export default {
  name: "NavBar",
};
</script>
<template>
  <div class="navbar bg-primary text-primary-content">
    <div class="container mx-auto">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-5 h-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>

          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content bg-primary drop-shadow-2xl rounded-xl w-40"
          >
            <li><a>Home</a></li>
            <li class="menu-title">
              <span>Chi siamo</span>
            </li>
            <li><a>L'Associazione</a></li>
            <li><a>Il Gruppo</a></li>
            <li><a>La Comunità Capi</a></li>

            <li class="menu-title">
              <span>Le Branche</span>
            </li>
            <li tabindex="1">
              <a> Lupetti e Coccinelle </a>
              <ul
                class="bg-primary drop-shadow-2xl rounded-xl py-0 -ml-10 z-10"
              >
                <li><a>Branco della Roccia Azzurra</a></li>
                <li><a>Cerchio del Bosco Gioioso</a></li>
                <li><a>Piccole Orme</a></li>
                <li><a>Specialità</a></li>
              </ul>
            </li>
            <li tabindex="1">
              <a> Esploratori e Guide </a>
              <ul
                class="bg-primary drop-shadow-2xl rounded-xl py-0 -ml-10 z-10"
              >
                <li><a>Reparto Brownsea</a></li>
                <li><a>Reparto Antares</a></li>
                <li><a>Campi di Specialità e Competenza</a></li>
                <li><a>Specialità e Brevetti</a></li>
              </ul>
            </li>
            <li tabindex="1">
              <a> Rover e Scolte </a>
              <ul
                class="bg-primary drop-shadow-2xl rounded-xl py-0 -ml-10 z-10"
              >
                <li><a>Clan Fuoco Madonna della Valle</a></li>
                <li><a>Noviziato</a></li>
                <li><a>Epppi/Ross</a></li>
              </ul>
            </li>

            <li class="menu-title">
              <span>Altro</span>
            </li>
            <li><a>Archivio</a></li>
            <li><a>Utilities</a></li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <h1 class="font-bold text-xl">Agesci Mirandola 2</h1>
      </div>
      <div class="navbar-end">
        <!--
  <button class="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
    <button class="btn btn-ghost btn-circle">
      <div class="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span class="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  -->
      </div>
    </div>
  </div>
</template>
