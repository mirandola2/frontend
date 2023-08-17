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
  <div class="hero max-w-none w-screen " :style="{'background-image': 'url(' + image + ')'}">
    <div class="hero-overlay bg-opacity-60" :class="'bg-' + color"></div>     
    <div class=" container py-12 flex-col md:flex-row text-white ">

        <img v-if="logo != undefined" :src="logo" class="w-40 pb-8 md:p-0 md:w-72 md:mr-10" />
        <div class="my-auto text-center md:text-left mr-auto">
          <h2 class="text-xl md:text-3xl mb-5 ">AGESCI - Gruppo Scout Mirandola 2</h2>
          <h1 class=" text-5xl md:text-6xl font-display">
            {{ title }}
          </h1>
        </div>
    </div>
  </div>
  <!--<div class="bg-[#ffee18] h-1 w-full"></div>
        <div class="bg-[#07ac0f] h-1 w-full"></div>
        -->
        
        
 


</template>


