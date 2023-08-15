<template>
    <div class="my-8 max-w-xl mx-auto">
      <p v-if="quote" class="text-xl italic text-center font-serif balanced">«{{ quote.text }}» <span v-if="quote.author">({{ quote.author }})</span></p>
    </div>
  </template>
  
  <script setup>
  import * as toml from 'toml';
  import { ref, watchEffect } from 'vue';
  
  const props = defineProps({
  type: String
})

  const quote = ref(null);
  
  watchEffect(async () => {
    try {
      const response = await fetch('/quotes.toml');
      const tomlText = await response.text();
      const parsedToml = toml.parse(tomlText);
      quote.value = parsedToml["frasi"][props.type][Math.floor(Math.random()*parsedToml["frasi"][props.type].length)];
    } catch (error) {
      console.error('🥲 Failed to load quotes TOML file.');
    }
  });
  </script>


<style>
.balanced{
  text-wrap: balance;
}

</style>
  