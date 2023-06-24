<script>
export default {
  name: "NavBar",
};
</script>
<template>
  <div class="navbar bg-primary text-primary-content sticky top-0">
    <div class="container mx-auto px-2">
      
      <div class="navbar-start w-3/4 flex">
        <h1 class="text-2xl my-auto font-bold"><a href="/">Mirandola 2</a></h1>
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
            class="menu menu-xl dropdown-content mt-3 z-[1] p-2 shadow rounded-box bg-secondary w-72 -mr-0.5"
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
                <summary>Lupetti e Coccinelle</summary>
             
             <ul
               class=""
             >
             <li><a href="/lc/">La Branca L/C</a></li>
               <li><a href="/lc/lupetti">Branco della Roccia Azzurra</a></li>
               <li><a href="/lc/coccinelle">Cerchio del Bosco Gioioso</a></li>
               <li><a href="/lc/piccole-orme">Piccole Orme</a></li>
               <li><a href="/lc/specialita">Specialità</a></li>
             </ul>
           
          </details>
        </li>
              
            <li tabindex="2">
              <details>
              <summary>Esploratori e Guide</summary>
              <ul
                class=""
              >
              <li><a href="/eg">La Branca E/G</a></li>
                <li><a href="/eg/brownsea">Reparto Brownsea</a></li>
                <li><a href="/eg/antares">Reparto Antares</a></li>
                <li><a href="/eg/campetti">Campi di Specialità e Competenza</a></li>
                <li><a href="/eg/specialità-brevetti">Specialità e Brevetti</a></li>
              </ul>
            </details>
            </li>
            <li tabindex="3">
              <details>
              <summary> Rover e Scolte </summary>
                <ul
                class=""
              >
              <li><a href="/rs/">La Branca R/S</a></li>
                <li><a href="/rs/mdv">Clan Fuoco Madonna della Valle</a></li>
                <li><a href="/rs/noviziato">Noviziato</a></li>
                <li><a href="/rs/epppi-ross">Epppi/Ross</a></li>
              </ul>
              </details>
           
            </li>

            <li tabindex="4">
              <details>
              <summary> Archivio </summary>
                <ul
                class=""
              >
                <li><a href="/totem">Totem</a></li>
                <li><a href="/albo">Staff del Passato</a></li>
                <li><a href="/campi">Campi e Route</a></li>
              </ul>
              </details>
           
            </li>

            <li tabindex="5">
              <details>
              <summary> Utilities </summary>
                <ul
                class=""
              >
                <li><a href="/codice">Ricerca Codice Socio</a></li>
                <li><a href="/uniforme">Uniforme e Distintivi</a></li>
              </ul>
              </details>
           
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
