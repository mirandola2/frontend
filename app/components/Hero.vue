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
  <div>
    <div class="hero relative mb-5 overflow-hidden">
      <NuxtImg
        :src="image"
        placeholder
        alt="Hero Image"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="absolute inset-0"
        :class="`${bgColor[color]} opacity-75`"
      ></div>

      <div
        class="container relative z-10 mx-auto flex max-w-4xl flex-col text-white md:flex-row md:px-12"
        :class="big ? 'pt-28 pb-44' : 'py-28'"
      >
        <NuxtImg
          v-if="logo"
          :src="logo"
          placeholder
          class="mx-auto w-40 pb-8 md:mr-10 md:w-56 md:p-0 lg:w-64"
        />

        <div
          class="text-center md:text-left md:mr-auto"
          :class="logo ? 'ml-0' : ''"
        >
          <h2 class="mb-5 text-lg md:text-3xl">
            AGESCI - Gruppo Scout Mirandola 2
          </h2>
          <h1 class="font-display text-5xl md:text-6xl">
            {{ title }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
