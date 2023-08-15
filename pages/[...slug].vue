<template>
  
 <div class="container p-2 space-y-2 max-w-4xl">
    <h1 class="my-12 text-5xl font-display">{{ page.title }}</h1>
      <div class="prose max-w-none prose-a:no-underline prose-headings:text-bold prose-a:text-primary px-2 mx-auto">
      <ContentRenderer :value="page" />
      </div>

 </div>
    

      
</template>
<script setup>
const { toc, page } = useContent();
</script>
