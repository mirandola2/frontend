<template>
  <Hero :title="page.title" :image="page.image" v-if="page?.show_hero != false"/>

  <div class="container space-y-2 mt-5">
    <div
      class="prose-container"
    >
      <ContentRenderer :value="page" />
    </div>
  </div>
</template>
<script setup>
const { toc, page } = useContent();

useHead({
  title: page.title
})

</script>
