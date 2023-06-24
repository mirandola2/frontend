<template>
    <div>
      <pre>{{ tomlContent }}</pre>
    </div>
  </template>
  
  <script setup>
  import * as toml from 'toml';
  import { ref, watchEffect } from 'vue';
  
  const props = defineProps({
  type: String
})

  const tomlContent = ref('...');
  
  watchEffect(async () => {
    try {
      const response = await fetch('/quotes.toml');
      const tomlText = await response.text();
      const parsedToml = toml.parse(tomlText);
      tomlContent.value = parsedToml["frasi"][props.type][0];
    } catch (error) {
      console.error('Failed to load TOML file:', error);
    }
  });
  </script>
  