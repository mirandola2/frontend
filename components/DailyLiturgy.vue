<template>
<span class="loading loading-spinner loading-xs" v-if="!word.loaded"></span>
{{ word.text }}
</template>
<script setup>
const word = ref(
  {
    text: "",
    loaded: true
  }
);

watchEffect(async () => {
  fetch("https://liturgia.silvestrini.org/rss_giorno.xml").then(
    res=>res.text()
  ).then( text=>word.value.text=text)
  .catch(error => word.value.text="A causa di un errore non siamo riusciti a recuperare i dati.")

});


</script>

