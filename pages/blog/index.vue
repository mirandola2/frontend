<template>
    <BlogLayout>
          <div class="grid gap-3">
            <div
    class="card w-full bg-base-200 shadow-none"
   
   
  >

    <div class="card-body">
      <h2 class="text-2xl font-bold">
        Tutte le notizie
      </h2>
    </div>
    </div>
            <BlogFeed horizontal />
          </div>
    </BlogLayout>
</template>
<script setup>

useHead({
  title: 'Blog',
})


</script>