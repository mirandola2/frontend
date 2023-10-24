<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
  />
  <div class="not-prose mx-auto max-w-4xl">
    <a
      role="button"
      class="btn btn-block max-w-lg mx-auto btn-outline btn-secondary"
      :href="href"
      ><span class="material-symbols-rounded"> {{icon}} </span> <slot></slot
    ></a>

</div>
</template>
<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
    default: "open_in_new", 
  },
});
</script>
