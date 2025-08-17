<template>
  <div class="p-12 space-y-4">
    <div class="text-4xl">Ops, si è verificato un errore.</div>
    <a class="btn btn-primary" href="/">Torna alla home</a>
  </div>
  <NuxtErrorBoundary>
  <template #error="{ error }">
      You can display the error locally here: {{ error }}
    </template>
  </NuxtErrorBoundary>

  {{ error }}

</template>


<script setup>

defineProps({
  error: Object
})
</script>
