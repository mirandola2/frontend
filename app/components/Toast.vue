<template>
  <Teleport to="body">
    <div v-if="show" class="toast" @click="hide">
      {{ message }}
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  message: String,
  duration: { type: Number, default: 1000 }
})

const emit = defineEmits(['close'])
const show = ref(true)

const hide = () => {
  show.value = false
  emit('close')
}

onMounted(() => {
  setTimeout(hide, props.duration)
})
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  z-index: 9999;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  cursor: pointer;
}
</style>