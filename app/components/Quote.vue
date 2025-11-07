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
import { useAsyncData } from "#imports";

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

const { data: quotes_raw } = await useAsyncData(() => queryCollection("quotes").first());
const quotes = computed(() => quotes_raw.value.meta.body || []);
onMounted(() => {
  if (props.quote == null) {
    if (Array.isArray(quotes.value) && quotes.value.length > 0) {
      const filteredRows = quotes.value.filter(row => row.type === props.type);
      
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
