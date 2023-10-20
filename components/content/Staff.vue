<template>
  <!--parametri capo: nome,nomeCaccia,ruolo,staff,coca,desc,img
-->
  <select
    class="select rounded-full select-primary w-full max-w-xs block ml-auto mb-3"
    v-model="actualStaff" v-if="selector" :on-change="pushQuery()"
  >
    <option :value="'*'">Tutti i Capi</option>
    <option :value="'CJ'">Capi Gruppo</option>
    <option :value="'L'">Lupetti</option>
    <option :value="'C'">Coccinelle</option>
    <option :value="'E'">Esploratori</option>
    <option :value="'G'">Guide</option>
    <option :value="'N'">Noviziato</option>
    <option :value="'CF'">Clan Fuoco</option>
    <option :value="'CC'">Altri incarichi</option>
  </select>

  <div class="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    <div
      v-for="person in data.body.filter((value) =>
        props.coca == false
          ? actualStaff == '*' || value.staff?.split(' ').includes(actualStaff)
          : (actualStaff == '*' || value.staff?.split(' ').includes(actualStaff)) && value.coca == 1
      )"
      class="card bg-base-200"
    >
      <div class="card-body p-5">
        <div class="flex gap-4 justify-start items-center mb-4">
          <img
            class="mask mask-squircle w-28 h-28 drop-shadow-lg pointer-events-none"
            :src="
              person.img != '' && person.img != undefined
                ? '/img/staff/' + person.img
                : 'https://api.dicebear.com/7.x/thumbs/svg?seed=' + person.nome
            "
            alt="Avatar Staff"
          />
          <div>
            <div v-if="namesCannotBeShown()">
              <h2 class="text-xl font-bold">
                {{ person.nomeCaccia }}
              </h2>
            </div>
            <div class="align-center pb-0" v-else>
              <h2 class="text-xl font-bold" v-if="!coca">
                {{ person.nome.split(' ').slice(0,-1).join(' ') }}
              </h2>
              <h2 class="text-xl font-bold" v-else>{{ person.nome }}</h2>
              <p>
                {{ person.ruolo }}
              </p>
            </div>

            <div
              class="badge font-bold badge-lg"
              v-if="coca"
              v-for="s in person.staff?.split(' ')"
              :class="getColorStaffName(s)"
            >
              {{ getFullStaffName(s) }}
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

const route = useRoute()
const router = useRouter()


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
  selector: {
    //true se vuoi mostrare solo la staff in comunità capi
    type: Boolean,
    required: false,
    default: false,
  },
});

const actualStaff = ref(route.query.staff || props.staff);

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
    CJ: "Co.Ca.",
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
    CJ: "bg-cc",
  };
  return staffNames[staff];
}

function pushQuery(){
  
  router.push({ query: actualStaff.value != '*' ? { staff: actualStaff.value } : {}})
}
</script>
