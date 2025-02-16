<template>
  <div class="relative hover:shadow shadow-lg rounded-2xl" v-for="post in contentQuery">
    <a class="absolute z-10 w-full h-full pointer-events-auto" :href="post._path"></a>
    <div
      class="card w-full bg-base-100"
      :class="{ 'md:card-side': horizontal }"
    >
      <figure
        class="bg-contain"
        :class="{ 'md:max-w-xs max-h-40 md:max-h-none': horizontal, 'max-h-40': !horizontal }"
        v-if="images"
      >
        <NuxtImg :src="post.img" :alt="post.title" class="" />
      </figure>
      <div class="card-body">
        <h2 class="text-xl font-bold">
          {{ post.title }}
          <span
            class="badge inline border-0"
            :class="badge[post.category].bg"
            >{{ badge[post.category].text }}</span
          >
        </h2>
        <p>
          {{ post.description }}
          <a class="link" :href="post._path">Leggi tutto</a>
        </p>
        <p class="text-sm opacity-50">
          Pubblicato in {{
              new Date(post.date).toLocaleDateString("it-IT", {
                month: "long",
                year: "numeric",
              })
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  horizontal: {
    type: Boolean,
    required: false,
    default: false,
  },
  all: {
    type: Boolean,
    required: false,
    default: false,
  },
  images:{
    type: Boolean,
    required: false,
    default: true,
  }
});

const contentQuery = props.all
  ? await queryContent("blog").sort({ date: -1 }).find()
  : await queryContent("blog").limit(4).sort({ date: -1 }).find();

const badge = {
  lc: { bg: "bg-lc text-lc-content", text: "L/C" },
  eg: { bg: "bg-eg text-eg-content", text: "E/G" },
  rs: { bg: "bg-rs text-rs-content", text: "R/S" },
  cc: { bg: "bg-cc text-white", text: "Gruppo" },
};


</script>
