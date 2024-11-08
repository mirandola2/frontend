<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    default: "/img/misc/hero.jpg",
  },
  color: {
    type: String,
    default: "primary",
  },
  logo: {
    type: String,
    default: undefined,
  },
  big: {
    type: Boolean,
    default: false,
  },
});

const bgColor = {
  lc: "bg-lc",
  eg: "bg-eg",
  rs: "bg-rs",
  cc: "bg-cc",
  primary: "bg-primary",
};
</script>

<template>
<div class="">
  <div class="hero mb-5 relative overflow-hidden">
    <!-- Image with absolute positioning to fill container -->
    <NuxtImg 
      :src="image" 
      placeholder 
      alt="Hero Image" 
      class="absolute inset-0 w-full h-full object-cover"
    />
    
    <!-- Overlay with absolute positioning and background color -->
    <div class="absolute inset-0 bg-opacity-60" :class="bgColor[color]"></div>

    <!-- Content container with padding based on `big` or not -->
    <div 
      class="container max-w-4xl mx-auto md:px-12 flex flex-col md:flex-row text-white relative z-10"
      :class="big ? 'pt-28 pb-44' : 'py-28'"
    >
      <NuxtImg 
        v-if="logo" 
        :src="logo" 
        placeholder 
        class="w-40 pb-8 mx-auto md:p-0 md:w-56 lg:w-64 md:mr-10"
      />
      <div class="text-center md:text-left md:mr-auto" :class="logo ? 'ml-0' : ''">
        <h2 class="text-lg md:text-3xl mb-5">
          AGESCI - Gruppo Scout Mirandola 2
        </h2>
        <h1 class="text-5xl md:text-6xl font-display">
          {{ title }}
        </h1>
      </div>
    </div>
  </div>
</div>



</template>


