<template>
  <BlogLayout>
    <div class="hero rounded-2xl bg-base-200">
      <div
        class="hero-content flex w-full flex-col justify-between xl:flex-row-reverse"
      >
        <NuxtImg placeholder :src="page.img" class="md:max-w-sm rounded-lg shadow-2xl" />
        <div class="text-center mx-auto">
          <h2 class="text-lg">Blog</h2>
          <h1 class="text-4xl my-4 font-display">{{ page.title }}</h1>
          <span class="badge border-0" :class="badge[page.category].bg">{{
            badge[page.category].text
          }}</span>
          <span class="badge border-0 bg-base-300">{{
            capitalizeFirstLetter(
              new Date(page.date).toLocaleDateString("it-IT", {
                month: "long",
                year: "numeric",
              })
            )
          }}</span>
        </div>
      </div>
    </div>
    <div class="prose-container">
      <ContentRenderer :value="page" />
    </div>
  </BlogLayout>
</template>

<script setup>
const { toc, page } = useContent();

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
