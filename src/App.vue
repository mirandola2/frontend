<script setup>
import Menu from "./components/Menu.vue";
</script>

<template>
  <div>
    <Menu />

    <div
      class="hero"
      style="
        background-image: url('hero.jpg');
      "
      
    >
      <div class="hero-overlay bg-primary bg-opacity-50"></div>
      <div class="hero-content p-20 text-center text-white">
        <div class="max-w-md">
          <img class="w-52 inline p-3 pb-8" src="logo_white.svg" />
          <h1 class="mb-5 text-4xl font-bold">
            Un'avventura giocata insieme da 40 anni!
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
