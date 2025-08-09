export const useToast = () => {
  const toastMessage = ref('')
  const showToast = ref(false)

  const toast = (message, duration = 1000) => {
    toastMessage.value = message
    showToast.value = true
    
    setTimeout(() => {
      showToast.value = false
    }, duration)
  }

  return {
    toastMessage,
    showToast,
    toast
  }
}   