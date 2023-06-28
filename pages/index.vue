<template>
  <div>
    <Hero
      title="Quarant'anni di giochi, avventure e strade."
      image="/hero.jpg"
      color="primary"
      logo="/logo_white.svg"
    />
    <div class="container p-2 space-y-2">
    
      <Quote type="gruppo"/>
      <div class="py-10 gap-6 grid md:grid-cols-3 justify-items-stretch">
        <div class="card  max-w-full bg-lc text-neutral-content">
        <div class="card-body">
          <h2 class="card-title">Lupetti e Coccinelle 🐺🐞</h2>
          <p>Dagli 8 agli 11 anni i bambini e le bambine vivono nel "branco" o nel "cerchio" come lupetti o coccinelle. <a class="link">Leggi tutto.</a></p>
          <div class="card-actions justify-between items-center">
          <button class="btn btn-md btn-primary items-center">Bacheca LC</button>
          <div>
          <button class="btn btn-xs btn-ghost btn-primary">Branco</button>
          <button class="btn btn-xs btn-ghost btn-primary">Cerchio</button>
          </div>
        </div>
        </div>
        </div>
      
        <div class="card  max-w-full bg-eg text-neutral-content">
        <div class="card-body">
          <h2 class="card-title">Esploratori e Guide ⛺️🌲</h2>
          <p>La Branca Esploratori/Guide si rivolge ai ragazzi dagli 12 ai 16 anni che si uniscono in Unità chiamate Reparti.  <a class="link">Leggi tutto.</a></p>
          <div class="card-actions justify-between items-center">
          <button class="btn btn-md btn-primary">Bacheca EG</button>
          <div>
            <button class="btn btn-xs btn-ghost btn-primary">Esploratori</button>
            <button class="btn btn-xs btn-ghost btn-primary">Guide</button>
          </div>
          </div>
        </div>
        </div>

        <div class="card  max-w-full bg-rs text-neutral-content">
        <div class="card-body">
          <h2 class="card-title">Rover e Scolte 🚶‍♂️🚶‍♀️</h2>
          <p>I Rover e le Scolte sono ragazzi/e tra i 16 e 19 anni che aderiscono alla  proposta che lo Scoutismo fa alla loro età.  <a class="link">Leggi tutto.</a></p>
          <div class="card-actions justify-between items-center">
          <button class="btn btn-md btn-primary">Bacheca RS</button>
          <div>
          <button class="btn btn-xs btn-ghost btn-primary">Noviziato</button>
          <button class="btn btn-xs btn-ghost btn-primary">Clan Fuoco</button>
          </div>
          </div>
        </div>
        </div>
        



      </div>



      <div class="card w-96 max-w-full bg-neutral text-neutral-content">
        <div class="card-body">
          <h2 class="card-title">Compleanni 🥳</h2>
          <p>Oggi è il compleanno di John Doe, auguri!</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>




</script>
