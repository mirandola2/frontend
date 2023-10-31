<template>
  <div
    class="not-prose  object-contain bg-base-200 p-5 rounded-xl"
    :class="{
      'my-2 max-w-3xl w-full mx-auto clear-both': float == '0',
      'md:float-left m-3 md:ml-0 md:max-w-sm': float == '1',
      'md:float-right md:max-w-sm m-3 md:mr-0': float == '2',
    }"
  >
      <button @click="showSingle" class="block mx-auto h-auto w-auto">
        <img
          :src="src"
          :alt="alt || desc"
          class="rounded-lg shadow-lg w-auto h-auto"
          :class="{'max-h-48': float != '0'}"
        />
      </button>
      <p class="text-sm text-center opacity-70 mt-2 mx-auto">
        {{ desc }}
      </p>
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
    type: String,
    required: false,
    default: "2", //0: not floating, 1: float left, 2: float right
  },
});

import { ref, defineComponent } from "vue";
import VueEasyLightbox from 'vue-easy-lightbox'

const visibleRef = ref(false);
const indexRef = ref(0); // default 0
const imgsRef = ref([]);
// Img Url , string or Array of string
// ImgObj { src: '', title: '', alt: '' }
// 'src' is required
// allow mixing

const onShow = () => {
  visibleRef.value = true;
};
const showSingle = () => {
  imgsRef.value = [{
    src: props.src,
    title: props.desc,
  }]
  // or
  // imgsRef.value  = {
  //   title: 'this is a placeholder',
  //   src: 'http://via.placeholder.com/350x150'
  // }
  onShow();
};

const onHide = () => (visibleRef.value = false);
</script>


<style>
.vel-modal{
  background: rgba(0,0,0,0.8) !important;
}

.vel-img-title{
  color: white;
  font-size: 16px;
  font-family: 'Ubuntu';
}


</style>