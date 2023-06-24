<template>
  <div>
    <Hero
      title="Quarant'anni di giochi, avventure e strade."
      image="/hero.jpg"
      color="primary"
      logo="/logo_white.svg"
    />

    <div class="card w-96 bg-neutral text-neutral-content">
      <div class="card-body">
        <h2 class="card-title">Compleanni 🥳</h2>
        <p>Oggi è il compleanno di John Doe, auguri!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Hero from "/components/Hero.vue";
</script>
