<template>
  <Hero :title="page.title" :image="page.image"/>

  <div class="container p-3 space-y-2 max-w-3xl">
    <div
      class="prose prose-neutral max-w-none prose-a:no-underline prose-a:text-primary mx-auto prose-p:text-justify prose-li:my-0"
    >
      <ContentRenderer :value="page" />
    </div>
  </div>
</template>
<script setup>
const { toc, page } = useContent();
</script>
