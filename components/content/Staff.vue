<template>
  <!--parametri capo: nome,nomeCaccia,ruolo,staff,coca,desc,img
-->
  <div class="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    <div
      v-for="person in data.body.filter((value) =>
        props.coca == false
          ? props.staff == '*' || value.staff == props.staff
          : (props.staff == '*' || value.staff == props.staff) &&
            value.coca == 1
      )"
      class="card bg-base-200"
    >
      <div class="card-body p-5">
        <div class="flex gap-4 justify-start items-center mb-4">
          <img
            class="mask mask-squircle w-24 h-24 "
            :src="
              person.img != '' && person.img != undefined
                ? '/people/' + person.img
                : 'https://api.dicebear.com/7.x/thumbs/svg?seed=' + person.nome
            "
            alt="Avatar Staff"
          />
          <div class="">
            <div v-if="namesCannotBeShown()">
              <h2 class="text-xl font-bold">
                {{ person.nomeCaccia }}
              </h2>
            </div>
            <div class="align-center pb-0" v-else>
              <h2 class="text-xl font-bold" v-if="!coca">{{ person.nome.split(" ")[0] }}</h2>
              <h2 class="text-xl font-bold" v-else>{{ person.nome }}</h2>
              <p>
                {{ person.ruolo }}
              </p>
            </div>

            <div
              class="badge font-bold badge-lg"
              v-if="coca"
              :class="getColorStaffName(person.staff)"
            >
              {{ getFullStaffName(person.staff) }}
            </div>
          </div>
        </div>

        <p class="text-sm" v-if="!coca">{{ person.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  staff: {
    // quale staff mostrare [L | C | E | G | N | CF | CC | *]
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

function getFullStaffName(staff) {
  const staffNames = {
    L: "Lupetti",
    C: "Coccinelle",
    E: "Esploratori",
    G: "Guide",
    N: "Noviziato",
    CF: "Clan Fuoco",
    CC: "Co.Ca.",
  };
  return staffNames[staff];
}

function getColorStaffName(staff) {
  const staffNames = {
    L: "bg-lc",
    C: "bg-lc",
    E: "bg-eg",
    G: "bg-eg",
    N: "bg-rs",
    CF: "bg-rs",
    CC: "bg-cc",
  };
  return staffNames[staff];
}
</script>
