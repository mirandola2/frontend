<script setup>
const props = defineProps({title: {
    type: String,
    required: false
}, image: {
    type: String,
    default: "/hero.jpg",
}, color: {
    type: String,
    default: "neutral",
}, logo: {
    type: String,
    default: undefined,
}});


const bgColor = {
  lc : 'bg-lc',
  eg : 'bg-eg',
  rs : 'bg-rs',
  cc : 'bg-cc', 
  primary : 'bg-primary',
  neutral: 'bg-[#000000]'

}

</script>

<template>
  <div class="hero" :style="{'background-image': 'url(' + image + ')'}">
    <div class="hero-overlay bg-opacity-40" :class="bgColor[color]"></div>     
    <div class="container max-w-4xl mx-auto md:px-12 py-20 flex flex-col md:flex-row text-white ">
        <img v-if="logo != undefined" :src="logo" class="w-40 pb-8 mx-auto md:p-0 md:w-56 lg:w-64 md:mr-10" />
        <div class="text-center md:text-left md:mr-auto" :class="{'ml-0': 'logo!=undefined' }">
          <h2 class="text-lg md:text-3xl mb-5 ">AGESCI - Gruppo Scout Mirandola 2</h2>
          <h1 class=" text-5xl md:text-6xl font-display">
            {{ title }}
          </h1>
        </div>
    </div>
  </div>
 
</template>


