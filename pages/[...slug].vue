<template>
  <Hero :title="page.title" :image="page.image"/>

  <div class="container space-y-2">
    <div
      class="prose max-w-none
      prose-a:no-underline prose-a:text-primary 
      prose-p:text-justify prose-p:max-w-4xl prose-p:mx-auto
      prose-li:my-0 prose-ul:max-w-4xl prose-ul:mx-auto prose-ol:max-w-4xl prose-ol:mx-auto
      prose-table:max-w-4xl prose-table:mx-auto
      prose-headings:max-w-4xl prose-headings:mx-auto
      prose-blockquote:max-w-4xl prose-blockquote:mx-auto prose-blockquote:font-serif
      prose-figure:rounded-xl prose-img:rounded-xl
      
      "
    >
      <ContentRenderer :value="page" />
    </div>
  </div>
</template>
<script setup>
const { toc, page } = useContent();
</script>
