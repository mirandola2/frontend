<template>
   <p v-for="capo in capi">{{ capo.nome }} </p>

</template>
<script setup>
import { ref } from 'vue'
const props = defineProps(
    {
        staff: {
            type: String,
            required: true
        },
    }
)

const capi = ref()

await useAsyncData(() => queryContent('/_capi').findOne().then(res=>{
    capi.value = res.body.filter((value)=> value.staff == props.staff )
}))



</script>