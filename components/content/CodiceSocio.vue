<template>
  <div class="card w-full not-prose max-w-xl mt-12 mx-auto">
    <div class="card-body">
      <h2 class="card-title">Riceca codice socio</h2>
      <div class="join">
        
        <input
          type="text"
          v-model="name"
          placeholder="Nome Completo"
          class="input input-bordered w-full join-item"
        />
        <button
          class="btn btn-primary join-item"
          onclick="modal.showModal()"
          @click="searchMemberCode()"
        >
          Cerca
        </button>
      </div>
      <p class="text-sm text-right" v-if="lastupdate">Dati aggiornati al censimento {{ lastupdate }}.</p>
    </div>
  
  </div>

  <dialog id="modal" class="modal">
    <div class="modal-box">
      <span class="loading loading-spinner loading-md" v-if="loading"></span>
      <span v-if="loading == false && personData.length==0" >Codice socio non trovato.</span>
      <table class="table text-sm py-8 font-mono" v-for="data in personData">
        <tbody>
          <tr>
            <td class="pl-0">Nome:</td>
            <th>{{ data?.name }}</th>
          </tr>
          <tr>
            <td class="pl-0">Data di nascita:</td>
            <th>{{ data?.birthday }}</th>
          </tr>
          <tr>
            <td class="pl-0">Codice Socio:</td>
            <th class="text-3xl bold">{{ data?.code }}</th>
          </tr>
        </tbody>
      </table>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="loading=false">Chiudi</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup>
const name = ref("");
const personData = ref();
const loading = ref(true);


const navbar_solid = ref(true)

function check() {
  name.value = name.value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/gi, "");
}

async function searchMemberCode() {
  personData.value = await (
    await fetch(
      `https://people.mirandola2.workers.dev/data?name=${encodeURIComponent(name.value.toLowerCase().trim())}`
    )
  ).json();
  console.log(personData.value)
  loading.value = false;
}


defineProps({
  lastupdate: {
    type: String,
    required: false
  }
})
</script>
