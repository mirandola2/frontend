<template>
  <div class="not-prose max-w-4xl mx-auto">
    <a
      role="button"
      class="btn btn-outline btn-secondary w-fit"
      :href="href"
      :target="self?'_self':'_blank'"
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
  self: {
    type: Boolean,
    required: false,
    default: false, 
  },
});
</script>
