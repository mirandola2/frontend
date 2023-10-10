<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    default: "/hero.jpg",
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
  <div class="relative">
    <div class="hero mb-5" :style="{ 'background-image': 'url(' + image + ')' }">
      <div class="hero-overlay bg-opacity-60" :class="bgColor[color]"></div>
      <div
        class="container max-w-4xl mx-auto md:px-12 flex flex-col md:flex-row text-white"
        :class="{ 'pt-28 pb-44': big, 'py-28': !big }"
      >
        <img
          v-if="logo != undefined"
          :src="logo"
          class="w-40 pb-8 mx-auto md:p-0 md:w-56 lg:w-64 md:mr-10"
        />
        <div
          class="text-center md:text-left md:mr-auto"
          :class="{ 'ml-0': 'logo!=undefined' }"
        >
          <h2 class="text-lg md:text-3xl mb-5">
            AGESCI - Gruppo Scout Mirandola 2
          </h2>
          <h1 class="text-5xl md:text-6xl font-display">
            {{ title }}
          </h1>
        </div>
      </div>
    </div>
    <!--<div class="hero-shape-divider">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
        d="M 1200,0 H 0 L 0.42463945,50.754602 81.109481,62.585722 175.44714,35.7591 l 71.7539,32.448322 75.54158,-10.209093 69.42826,25.117788 65.35518,-37.862657 120.15386,35.776535 72.65296,-37.311455 113.52107,27.136356 136.72431,-22.54702 102.48164,22.530375 94.8659,-29.330385 100.5203,27.090352 z"
          class="shape-fill"
        ></path>
      </svg>
    </div>-->
  </div>
</template>

<style>
.hero-shape-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.hero-shape-divider svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 66px;
  transform: rotateY(180deg);
}

.hero-shape-divider .shape-fill {
  fill: #ffffff;
}
</style>
