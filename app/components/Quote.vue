<template>
  <div class="my-8 max-w-xl mx-auto">
    <ClientOnly>
      <p v-if="quote" class="italic text-center font-serif balanced" :class="class">
        «{{ quote.text }}» <span v-if="quote.author">({{ quote.author }})</span>
      </p>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { queryContent, useAsyncData } from "#imports";

const props = defineProps({
  type: {
    type: String,
  },
  quote: {
    type: String,
  },
  class: {
    type: String,
    default: "text-xl",
  },
});


const quote = ref(null);

const { data: quotes } = await useAsyncData('quotes', () => queryContent("/_quotes").findOne());

onMounted(() => {
  if (props.quote == null) {
    if (quotes.value && quotes.value.body) {
      const filteredRows = quotes.value.body.filter(row => row.type === props.type);
      
      if (filteredRows.length > 0) {
        quote.value = filteredRows[Math.floor(Math.random() * filteredRows.length)];
      }
    }
  } else {
    quote.value = { text: props.quote };
  }
});
</script>

<style>
.balanced {
  text-wrap: balance;
}
</style>
