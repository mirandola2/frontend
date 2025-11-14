<template>
  <div
    class="relative hover:shadow shadow-lg rounded-2xl"
    v-for="post in contentQuery"
    :key="post.path"
  >
    <a class="absolute z-10 w-full h-full" :href="post.path"></a>

    <div class="card w-full bg-base-100" :class="{ 'md:card-side': horizontal }">
      <figure
        class="bg-contain max-h-40 bg-neutral max-w-full"
        :class="{
          'md:max-w-xs': horizontal,
        }"
      >
        
        <NuxtImg :src="post.img" :alt="post.title" />
      </figure>

      <div class="card-body">
        <h2 class="text-xl font-bold">{{ post.title }}</h2>

        <p>
          {{ post.description }}
          <a class="link" :href="post.path">Leggi tutto</a>
        </p>

        <p class="text-sm">
          <span class="opacity-50">
Pubblicato in
          {{
            new Date(post.date).toLocaleDateString('it-IT', {
              month: 'long',
              year: 'numeric',
            })
          }}
          </span>
          &nbsp;•&nbsp;
          <span class="badge border-0" :class="badge[post.category].bg">{{
            badge[post.category].text
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  horizontal: { type: Boolean, default: false },
  all: { type: Boolean, default: false },
  images: { type: Boolean, default: true },
})


const badge = {
  lc: { bg: "bg-lc text-lc-content", text: "L/C" },
  eg: { bg: "bg-eg text-eg-content", text: "E/G" },
  rs: { bg: "bg-rs text-rs-content", text: "R/S" },
  cc: { bg: "bg-cc text-white", text: "Gruppo" },
};

const { data: contentQuery } = await useAsyncData('blog-posts', () => {
  const query = queryCollection('blog').order('date', 'DESC')
  return props.all ? query.all() : query.limit(4).all()
})
</script>
