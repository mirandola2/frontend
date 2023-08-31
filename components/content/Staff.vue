<template>
  <!--parametri capo: nome,nomeCaccia,ruolo,staff,coca,desc,img
-->
  <p
    v-for="capo in data.body.filter((value) =>
      props.coca == false
        ? value.staff == props.staff
        : value.staff == props.staff && value.coca == 1
    )"
  >
    <!---MEGLIO FARE UNA TABELLA invece che un <p>-->
    <span v-if="namesCannotBeShown()"> {{ capo.nomeCaccia }}</span>
    <span v-else>{{ capo.nome }}</span>
  </p>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  staff: {
    // quale staff mostrare [L | C | E | G | N | CF | CC ]
    type: String,
    required: true,
  },
  coca: {
    //true se vuoi mostrare solo la staff in comunità capi
    type: Boolean,
    required: false,
    default: false,
  },
});

const { data } = await useAsyncData(() => queryContent("/_capi").findOne());

function namesCannotBeShown() {
  return (props.staff == "L" || props.staff == "C") && props.coca == false;
}
</script>
