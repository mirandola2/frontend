<template>
    <Hero
      :title="page.title"
      :image="page.image"   
    />


 <div class="container p-2 space-y-2 max-w-4xl">



      <div class="prose max-w-none prose-a:no-underline prose-headings:text-bold prose-a:text-primary px-2 mx-auto">
      <ContentRenderer :value="page" />
      </div>

 </div>
    

      
</template>
<script setup>
const { toc, page } = useContent();
</script>
