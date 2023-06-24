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
    <div>
        <img v-if="logo != undefined" :src="logo" class="w-52 inline pb-8" />
        <h1 class="mb-5 text-3xl md:text-4xl font-display">
          {{ title }}
        </h1>
    </div>
    </div>
  </div>


</template>


