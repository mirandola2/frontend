<script setup>
const props = defineProps({title: {
    type: String,
    required: true
}, image: {
    type: String,
    default: "/hero.jpg",
}, color: {
    type: String,
    default: "primary",
}, logo: {
    type: String,
    default: undefined,
}});

</script>

<template>
  <div class="hero" :style="{'background-image': 'url(' + image + ')'}">
    <div class="hero-overlay bg-opacity-60" :class="'bg-' + color"></div>
    <div class="hero-content py-32 text-white">
    <div class="flex flex-col md:flex-row">
        <img v-if="logo != undefined" :src="logo" class="w-52 pb-8 md:p-0 md:w-72 mx-auto" />
        <div class="md:ml-10 my-auto text-center md:text-left">
        <h2 class="text-3xl mb-5 hidden md:block">AGESCI - Gruppo Scout Mirandola 2</h2>
        <h1 class=" text-3xl md:text-6xl font-display">
          {{ title }}
        </h1>
      </div>
    </div>
    </div>
  </div>


</template>


