<template>
  <span class="loading loading-spinner loading-xs" v-if="!word.loaded"></span>
  <span v-else>  "{{ word.json.CantoVangelo }}" <a class="link" :href="word.json.Link">({{ word.json.Letture }})</a>
</span>
</template>
<script setup>
const word = ref({
  json: "",
  loaded: false,
});


watchEffect(async () => {

  fetch("https://daily.mirandola2.workers.dev/").then(
    res => res.json()
  ).then(
    json =>{
      word.value.json = json
      word.value.loaded = true
    }
  )
  
});

  

</script>
