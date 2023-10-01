<template>
  <div class="hero bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
      <div class="max-w-2xl">
        <h1 class="text-3xl font-bold">{{ page.title }}</h1>
      </div>
      <img :src="page.img" class="max-w-sm rounded-lg" />
    </div>
  </div>

  <div class="flex p-5">
    <div class="container mx-auto">
      <ContentRenderer :value="page" />
    </div>

    <Sidebar />
  </div>
</template>
<script setup>
const { toc, page } = useContent();
</script>
