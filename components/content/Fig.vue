<template>
  <div
    class="not-prose object-contain bg-base-200 p-5 rounded-xl justify-center content-center"
    :class="{
      'my-2 max-w-3xl w-full mx-auto clear-both': float == '0',
      'md:float-left m-3 md:ml-0 md:max-w-sm': float == '1',
      'md:float-right md:max-w-sm m-3 md:mr-0': float == '2',
    }"
  >
    <div v-if="typeof src == String">
      <button @click="showSingle" class="block mx-auto h-auto w-auto">
        <img
          :src="src"
          :alt="alt || desc || ''"
          class="rounded-lg shadow-lg w-auto h-auto"
          :class="{ 'max-h-48': float != '0' }"
        />
      </button>
      <p class="text-sm text-center opacity-70 mt-2 mx-auto">
        {{ desc }}
      </p>
    </div>
    <div v-else>
      <button @click="showSingle" class="block mx-auto h-auto w-auto">
        <img
          :src="src[indexRef]"
          :alt="alt[indexRef] || desc[indexRef] || ''"
          class="rounded-lg shadow-lg w-auto h-auto"
          :class="{ 'max-h-48': float != '0' }"
        />
      </button>
      <p class="text-sm text-center opacity-70 mt-2 mx-auto">
        {{ desc[indexRef] || '' }}
      </p>
      <div class="join mx-auto">
         <button class="join-item btn-secondary btn btn-xs" :class="{'btn-active': 'indexRef==index'}"  v-for="(item, index) in src" v-on:click="indexRef=index">{{index}}</button>
      </div>
    </div>
  </div>

  <client-only>
    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    />
  </client-only>
</template>
<script setup>
const props = defineProps({
  src: {
    required: false,
  },
  alt: {
    type: String,
    required: false,
    default: "",
  },
  desc: {
    required: false,
    default: undefined,
  },
  float: {
    type: String,
    required: false,
    default: "2", //0: not floating, 1: float left, 2: float right
  },
});

import { ref, defineComponent } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";

const visibleRef = ref(false);
const indexRef = ref(0);
const imgsRef = ref([]);

const onShow = () => {
  visibleRef.value = true;
};
const showSingle = () => {
  imgsRef.value = [
    {
      src: props.src,
      title: props.desc,
    },
  ];
  onShow();
};

const showMulti = () => {  
  imgsRef.value = src.map((e, i)=>{
    return {src: e, title: desc[i] || ""}
  });
  onShow();
};

const onHide = () => (visibleRef.value = false);
</script>

<style>
.vel-modal {
  background: rgba(0, 0, 0, 0.8) !important;
}

.vel-img-title {
  color: white;
  font-size: 16px;
  font-family: "Ubuntu";
}
</style>
