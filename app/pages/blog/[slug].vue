<template>
  <Head>
    <Title>
      {{ page?.title }} ~ Blog degli Scout Mirandola 2 ~ Da più di 40 anni
      facciamo giochi, avventure e strade.
    </Title>
    <Meta
      v-if="page?.description"
      name="description"
      :content="page.description"
    />
    <Meta v-if="page?.img" name="og:image" :content="page.img" />
  </Head>
  <BlogLayout>
    <div class="card bg-neutral image-full w-full mx-auto relative overflow-auto">
      <figure class="h-full">
        <NuxtImg
          v-if="page?.img"
          :src="page.img"
          alt="Immagine del blog"
          class="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm"
        />
      </figure>
      <div class="card-body">
        <h3 class="text-3xl">Blog</h3>
        <h2 class="card-title text-4xl font-display">{{ page.title }}</h2>
        <p>
          {{ page?.description || "Descrizione non disponibile." }}
        </p>
        <div class="card-actions justify-end">
          <span
            v-if="page?.category"
            class="badge border-0"
            :class="badge[page.category]?.bg"
          >
            {{ badge[page.category]?.text }}
          </span>
          <span class="badge border-0 bg-base-300">
            {{
              capitalizeFirstLetter(
                new Date(page.date).toLocaleDateString("it-IT", {
                  month: "long",
                  year: "numeric",
                })
              )
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="prose-container mt-6">
      <ContentRenderer v-if="page" :value="page" />
    </div>
  </BlogLayout>
</template>

<script setup>
const route = useRoute();

const { data: page } = await useAsyncData(
  route.path,
  () => queryCollection('blog').path(route.path).first()
);

const toc = computed(() => page.value?.toc ?? []);

const badge = {
  lc: { bg: "bg-lc text-lc-content", text: "L/C" },
  eg: { bg: "bg-eg text-eg-content", text: "E/G" },
  rs: { bg: "bg-rs text-rs-content", text: "R/S" },
  cc: { bg: "bg-cc text-white", text: "Gruppo" },
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>
