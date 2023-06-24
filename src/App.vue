<script setup>
import NavBar from "./components/partials/NavBar.vue";


</script>

<template>
  <div>
    
    <div class="container mx-auto p-2 space-y-2">
      <NavBar />
    <router-view></router-view>
  </div>
  </div>
</template>
