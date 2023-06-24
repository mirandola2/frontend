<script setup>
import NavBar from "./components/partials/NavBar.vue";


</script>

<template>
  <div>
    
    <div class="container mx-auto p-2 space-y-2">
      <NavBar />
    <router-view></router-view>

    <div class="card w-96 bg-neutral text-neutral-content">
  <div class="card-body">
    <h2 class="card-title">Compleanni 🥳</h2>
    <p>Oggi è il compleanno di John Doe, auguri!</p>
    
  </div>

</div>
  <div class="card w-96 bg-neutral text-neutral-content">
  <div class="card-body">
    <h2 class="card-title">La Preghiera del Rover e della Scolta</h2>
    <p>O Signore, fa' di me uno strumento della tua pace. Dov'è odio, fa' ch'io porti l'amore. <br/>
Dov'è offesa ch'io porti il perdono. Dov'è discordia, ch'io porti l'unione.<br/>
Dov'è dubbio, ch'io porti la fede. Dov'è errore, ch'io porti la verità.<br/>
Dov'è disperazione, ch'io porti la speranza. Dov'è tristezza, ch'io porti la gioia. Dove sono le tenebre, ch'io porti la luce.<br/>
O Maestro, fa' ch'io non cerchi tanto di essere consolato, quanto di consolare; di essere compreso, quanto di comprendere;
di essere amato, quanto di amare.
Poiché è dando, che si riceve; perdonando, che si è perdonati; morendo, che si risuscita a vita eterna.</p>
    
  
  </div>
</div>
  </div>
  </div>
</template>
