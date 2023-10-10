<template>
  <Hero
      title="Ricerca Codice Socio"
      image="/hero.jpg"
    />

  <div class="card w-full max-w-md mt-12 mx-auto bg-base-100">
    <div class="card-body">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Codice Fiscale</span>
        </label>
        <input
          type="text"
          v-model="fiscalCode"
          placeholder="ABCCBA00X00F40I"
          class="input input-bordered w-full max-w-xs"
          @input="checkFC()"
        />
      </div>
      <div class="card-actions justify-end">
        <button
          class="btn btn-primary"
          onclick="modal.showModal()"
          @click="searchMemberCode()"
          :disabled="fiscalCode.length != 16"
        >
          Cerca
        </button>
      </div>
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
const fiscalCode = ref("");
const personData = ref();
const loading = ref(true);


const navbar_solid = ref(true)

function checkFC() {
  fiscalCode.value = fiscalCode.value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/gi, "");
}

async function searchMemberCode() {
  personData.value = await (
    await fetch(
      `https://people.mirandola2.workers.dev/data?id=${fiscalCode.value.toLowerCase()}`
    )
  ).json();
  console.log(personData.value)
  loading.value = false;
}
</script>
