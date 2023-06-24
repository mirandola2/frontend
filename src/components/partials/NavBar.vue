<script>
export default {
  name: "NavBar",
};
</script>
<template>
  <div class="navbar bg-primary text-primary-content rounded-xl">
    <div class="container mx-auto px-3">
      
      <div class="navbar-start w-3/4">
        
        <h1 class="text-2xl">Agesci Mirandola 2</h1>
      </div>

      <div class="navbar-center">
        
      </div>

      <div class="navbar-end w-10 ml-auto">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost">
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

          <ul
            tabindex="0"
            class="menu menu-xl dropdown-content mt-3 z-[1] p-2 shadow rounded-box bg-secondary w-72"
          >
            <li><a href="/">Home</a></li>
            
            <li tabindex="1">
              <details>
                <summary> Chi siamo </summary>
             
             <ul
               class=""
             >
            <li><a href="associazione">L'Associazione</a></li>
            <li><a href="gruppo">Il Gruppo</a></li>
            <li><a href="coca">La Comunità Capi</a></li>
          </ul>
           
          </details>
        </li>

           
            <li tabindex="1">
              <details>
                <summary> Lupetti e Coccinelle </summary>
             
             <ul
               class=""
             >
             <li><a href="/lc/">La Branca L.C.</a></li>
               <li><a href="/lc/branco">Branco della Roccia Azzurra</a></li>
               <li><a href="/lc/cerchio">Cerchio del Bosco Gioioso</a></li>
               <li><a href="/lc/piccole-orme">Piccole Orme</a></li>
               <li><a href="/lc/specialita">Specialità</a></li>
             </ul>
           
          </details>
        </li>
              
            <li tabindex="1">
              <details>
              <summary> Esploratori e Guide </summary>
              <ul
                class=""
              >
              <li><a href="/eg"> La Branca E.G. </a></li>
                <li><a href="/eg/brownsea">Reparto Brownsea</a></li>
                <li><a href="/eg/antares">Reparto Antares</a></li>
                <li><a href="/eg/campetti">Campi di Specialità e Competenza</a></li>
                <li><a href="/eg/specialità-brevetti">Specialità e Brevetti</a></li>
              </ul>
            </details>
            </li>
            <li tabindex="1">
              <details>
              <summary> Rover e Scolte </summary>
                <ul
                class=""
              >
              <li><a href="/rs/">La Branca R.S.</a></li>
                <li><a href="/rs/mdv">Clan Fuoco Madonna della Valle</a></li>
                <li><a href="/rs/noviziato">Noviziato</a></li>
                <li><a href="/rs/epppi-ross">Epppi/Ross</a></li>
              </ul>
              </details>
           
            </li>

            <li><a>Archivio</a></li>
            <li><a>Utilities</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
