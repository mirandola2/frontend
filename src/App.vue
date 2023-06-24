<script setup>
import NavBar from "./components/partials/NavBar.vue";
</script>

<template>
  <div class="container mx-auto p-2 flex flex-col min-h-screen">
    <div class="space-y-2">
    <NavBar />

    <router-view></router-view>
  </div>

    <footer
      class="footer items-center p-4 bg-neutral text-neutral-content rounded-lg mt-auto"
    >
      <div class="items-center grid-flow-col">
        <img src="/logo_colored.png" class="w-16" />
        AGESCI - Gruppo Scout Mirandola 2<br />Via Posta, 55 - 41037 Mirandola
        (MO)
      </div>
    </footer>
  </div>
</template>
