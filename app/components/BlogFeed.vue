<template>
  <div
    class="relative hover:shadow shadow-lg rounded-2xl"
    v-for="post in contentQuery"
    :key="post.path"
  >
    <a class="absolute z-10 w-full h-full" :href="post.path"></a>

    <div class="card w-full bg-base-100" :class="{ 'md:card-side': horizontal }">
      <figure
        v-if="images"
        class="bg-contain"
        :class="{
          'md:max-w-xs max-h-40 md:max-h-none': horizontal,
          'max-h-40': !horizontal
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

        <p class="text-sm opacity-50">
          Pubblicato in
          {{
            new Date(post.date).toLocaleDateString('it-IT', {
              month: 'long',
              year: 'numeric',
            })
          }}
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

const { data: contentQuery } = await useAsyncData('blog-posts', () => {
  const query = queryCollection('blog').order('date', 'DESC')
  return props.all ? query.all() : query.limit(4).all()
})
</script>
