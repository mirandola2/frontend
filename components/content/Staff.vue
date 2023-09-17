<template>
  <!--parametri capo: nome,nomeCaccia,ruolo,staff,coca,desc,img
-->
  <div class="not-prose grid md:grid-cols-3 gap-4">
    <div
      v-for="capo in data.body.filter((value) =>
        props.coca == false
          ? value.staff == props.staff
          : value.staff == props.staff && value.coca == 1
      )"
      class="card bg-base-200"
    >
      <div class="card-body items-start">
        <img
          class="mask mask-squircle w-28 h-28 mx-auto mb-4"
          src="/hero.jpg"
          alt="Avatar Staff"
        />

        <h2 class="card-title flex-col items-start">
          <template v-if="namesCannotBeShown()">
            {{ capo.nomeCaccia }}</template
          >
          <template v-else
            >{{ capo.nome }}
            <span class="text-sm">
              {{ capo.ruolo }} <div class="badge" :class="'bg-' + getColorStaffName( capo.staff )">{{getFullStaffName( capo.staff ) }}</div>

            </span></template
          >
        </h2>

        <p class="text-sm" v-if="!coca">{{ capo.desc }}</p>
      </div>
    </div>
  </div>
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

function getFullStaffName (staff) {
  const staffNames = { L : 'Lupetti',
   C: 'Coccinelle',  E: "Esploratori", G : "Guide", N: "Noviziato", CF: "ClanFuoco", CC: "Co.Ca."}
  return staffNames[staff]
  }

  function getColorStaffName (staff) {
  const staffNames = { L : 'lc',
   C: 'lc',  E: "eg", G : "eg", N: "rs", CF: "rs", CC: "cc"}
  return staffNames[staff]
  }

</script>
