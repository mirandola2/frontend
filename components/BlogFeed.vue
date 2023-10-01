<template>
  <div
    class="card w-full bg-base-100 shadow-lg"
    :class="{'card-side': horizontal}"
    v-for="post in contentQuery"
  >
    <figure class="bg-contain">
      <img class=" max-h-40" :src="post.img" :alt="post.title" />
    </figure>
    <div class="card-body border-base-200 rounded-2xl rounded-t-none">
      <h2 class="text-xl font-bold">
        {{ post.title }}
        <span class="badge inline" :class="badge[post.category].bg">{{
          badge[post.category].text
        }}</span>
      </h2>
      <p>
        {{ post.description }}
        <a class="link" :href="post._path">Leggi tutto</a>
      </p>
    </div>
  </div>
</template>
<script setup>
const contentQuery = await queryContent("blog").find();

const badge = {
  lc: { bg: "bg-lc text-lc-content", text: "L/C" },
  eg: { bg: "bg-eg text-eg-content", text: "E/G" },
  rs: { bg: "bg-rs text-rs-content", text: "R/S" },
  cc: { bg: "bg-cc text-primary-content", text: "Gruppo" },
};

const props = defineProps({
  horizontal: {
    type: Boolean,
    required: false,
    default: false,
  },
  all:  {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
