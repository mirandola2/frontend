<script setup>
const props = defineProps({title: {
    type: String,
    required: true
}, image: {
    type: String,
    default: "/hero.jpg",
}, color: {
    type: String,
    default: "bg-primary",
}, logo: {
    type: String,
    default: undefined,
}});

</script>

<template>
  <div class="hero rounded-xl" :style="{'background-image': 'url(' + image + ')'}">
    <div class="hero-overlay bg-opacity-50 rounded-xl" :class="color"></div>
    <div class="hero-content p-20 text-center text-white">
      <div class="max-w-md"> 
        <img v-if="logo != undefined" :src="logo" class="w-52 inline p-3 pb-8" />
        <h1 class="mb-5 text-2xl md:text-4xl font-bold">
          {{ title }}
        </h1>
      </div>
    </div>
  </div>


</template>


