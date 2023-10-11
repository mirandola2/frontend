<template>
  <div class="not-prose" :class="{'my-2 max-w-xl': float==0, 'md:float-left m-3 md:ml-0': float==1, 'md:float-right m-3 md:mr-0': float==2}">
    <div class="w-full bg-base-200 p-5 rounded-xl place-items-center ">
      <a :href="src">
        <img :src="src" :alt="alt || desc" class="rounded-lg shadow-lg m-auto "/>
      </a>
      <p class="text-sm text-center opacity-70 mt-2 mx-auto">
        {{ desc }}
      </p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: false,
    default: "",
  },
  desc: {
    type: String,
    required: false,
    default: "",
  },
  float: {
    type: Number,
    required: false,
    default: 1  //0: not floating, 1: float left, 2: float right
  }
});
</script>
