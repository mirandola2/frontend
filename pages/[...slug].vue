<template>
  <Hero :title="page.title" :image="page.image" v-if="page?.show_hero != false"/>

  <div class="container space-y-2" :class="{'-mt-16': page?.overlap_hero, 'mt-5': !page?.overlap_hero}">
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
