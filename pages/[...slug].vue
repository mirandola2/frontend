<template>
  
 <div class="container p-2 space-y-2 max-w-4xl">
    <h1 class="my-12 text-5xl font-display">{{ page.title }}</h1>

      <div class="card w-96 bg-base-200 text-base-content">
        <div class="card-body">
            <h2 class="card-title">Indice</h2>
            <p><ul v-if="toc && toc.links">
            <li v-for="link in toc.links" :key="link.id" :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }">
                <a :href="`#${link.id}`">
                {{ link.text }}
                </a>
            </li>
            </ul></p>

        </div>
      </div>
 
      <div class="prose max-w-none prose-a:no-underline prose-headings:text-bold prose-a:text-primary px-2 mx-auto">
      <ContentRenderer :value="page" />
      </div>

 </div>
    

      
</template>
<script setup>
const { toc, page, title } = useContent();
</script>
