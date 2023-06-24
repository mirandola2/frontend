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
  <div class="hero rounded-xl" :style="{'background-image': 'url(' + image + ')'}">
    <div class="hero-overlay bg-opacity-60 rounded-xl" :class="'bg-' + color"></div>
    <div class="hero-content py-20 text-center w-full" :class="'text-' + color + '-content'">
    <div>
        <img v-if="logo != undefined" :src="logo" class="w-52 inline p-3 pb-8" />
        <h1 class="mb-5 text-2xl md:text-3xl lg:text-4xl font-bold">
          {{ title }}
        </h1>
    </div>
    </div>
  </div>


</template>


