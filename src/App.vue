<script setup>
import NavBar from "./components/partials/NavBar.vue";


</script>

<template>
  <div>
    <NavBar />
    <div class="container mx-auto p-2">

    <router-view></router-view>
  </div>
  </div>
</template>
