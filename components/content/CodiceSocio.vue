<template>
  <div class="card w-full not-prose max-w-xl mt-12 mx-auto">
    <div class="card-body">
      <h2 class="card-title">Ricerca codice socio</h2>
      <button class="btn ml-auto text-primary font-bold"
      @click="logout" v-if="logged">
        Logout <span class="material-symbols-rounded"> logout </span>
      </button>
      <div class="flex gap-2" v-if="!logged">
        <input
          type="password"
          v-model="pw"
          placeholder="Parola magica"
          class="input input-bordered w-full"
        />
        <button class="btn btn-primary" @click="digestMessage(pw)">
          Login
        </button>
      </div>
      <div class="flex gap-2">
        <input
          type="text"
          v-model="name"
          placeholder="Nome Completo"
          class="input input-bordered w-full"
          v-bind:disabled="!logged"
        />
        <button
          class="btn btn-primary"
          onclick="modal.showModal()"
          @click="searchMemberCode()"
          v-bind:disabled="!logged"
        >
          Cerca
        </button>
      </div>

      <p class="text-sm text-right" v-if="lastupdate">
        Dati aggiornati al {{ lastupdate }}
      </p>
    </div>
  </div>

  <dialog id="modal" class="modal">
    <div class="modal-box">
      <span class="loading loading-spinner loading-md" v-if="loading"></span>
      <span v-if="error!=''" class="font-bold text-error">{{ error }}</span>
      <span v-else-if="loading == false && personData.length == 0"
        >Codice socio non trovato.</span
      >
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
          <button class="btn" @click="loading = false">Chiudi</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup>
const name = ref("");
const personData = ref();
const loading = ref(true);
const pw = ref("");
const error = ref("")

const cookie = useCookie("psk", { maxAge: 345600000 });
const logged = ref(cookie.value && cookie.value.length == 64);

function logout(){
  cookie.value = undefined
  logged.value = false
}

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  cookie.value = hashHex;
  logged.value = true;
}

const navbar_solid = ref(true);

function check() {
  name.value = name.value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/gi, "");
}

async function searchMemberCode() {
  try {
    const res = await fetch(
      `https://people.mirandola2.workers.dev/data?name=${encodeURIComponent(
        name.value.toLowerCase().trim()
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Just-A-PSK": cookie.value,
        },
      }
    );

    if (res.status === 403) {
      loading.value = false;
      error.value = "Non sei autorizzato o il token usato è errato. Esci e riprova.";
      personData.value = [];
    } else {
      personData.value = await res.json();
      error.value = "";
    }
  } catch (e) {
    error.value = "Errore di rete";
    personData.value = [];
  } finally {
    console.log(personData.value);
    loading.value = false;
  }
}

defineProps({
  lastupdate: {
    type: String,
    required: false,
  },
});
</script>
