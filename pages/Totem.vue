<template>
  <hero
    title="Nomi Totem"
    image="http://mirandola2.weebly.com/uploads/1/1/8/8/11889083/background-images/1888766141.jpg"
  ></hero>

  <div
    class="justify-between content-start container flex flex-col gap-4 md:gap-8 md:flex-row-reverse"
  >
    <div class="md:w-1/2">
      <p class="my-8 text-justify">
        Il Totem è un nome, di solito di un animale (ma a volte anche di piante,
        alberi o agenti atmosferici), seguito da un aggettivo, che viene dato
        alle guide e agli scout per sottolineare una loro caratteristica.
        Normalmente il nome dell'animale richiama una caratteristica fisica
        della persona, mentre l'aggettivo una caratteristica della personalità.
        In passato, nel nostro gruppo, il totem veniva assegnato alle guide del
        primo anno (prima media) e agli scout dell’ultimo anno (seconda
        superiore). Oggi il totem viene assegnato in terza media (dal 1991 per
        gli scout e dal 2006 per le guide), con una cerimonia chiamata
        “totemizzazione”. Durante questa cerimonia la guida o lo scout per
        ricevere il suo "Totem" dovrà superare delle prove che testimonieranno
        il suo valore.
      </p>

      <div class="form-control w-full md:sticky md:top-20 mb-8">
        <label class="label">
          <span class="label-text">Filtra per nome o per totem</span>
        </label>
        <input
          type="text"
          v-model="filter"
          placeholder="Inserisci una parte del nome o del totem"
          class="input input-bordered w-full"
          @input="updateTotem()"
        />
      </div>
    </div>
    <div class="md:w-1/2">
      <table class="table h-fit" v-if="loading.loaded">
        <template v-for="(totems, locationAndYear) in tableTotem">
          <thead v-if="totems.people.length > 0">
            <div class="my-12"></div>
            <tr class="bg-neutral sticky top-2 md:top-20">
              <th class="rounded-l-xl w-1/2">{{ totems.location }}</th>
              <th class="rounded-r-xl">{{ totems.year }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="person in totems.people" class="hover">
              <td class="rounded-l-xl">{{ person.name }}</td>
              <td class="rounded-r-xl">{{ person.totem }}</td>
            </tr>
          </tbody>
        </template>
      </table>
      <div v-else class="my-8 text-primary text-center">
        <span class="loading loading-spinner loading-lg" v-if="!loading.error"></span>
        <br />
        {{ loading.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const totem = ref(null);
const tableTotem = ref({});
const filter = ref("");
const loading = ref({
  loaded: false,
  text: "Il Grande Capo Manitù sta caricando i nomi totem, attendete!",
  error: false,
});

function updateTotem() {
  tableTotem.value = {};

  totem.value.forEach((person) => {
    const locationAndYear = person["location"] + person["year"];
    if (!tableTotem.value[locationAndYear]) {
      tableTotem.value[locationAndYear] = {
        year: person["year"],
        location: person["location"],
        people: [],
      };
    }

    if (
      filter.value == "" ||
      person.name.toLowerCase().includes(filter.value.toLowerCase()) ||
      person.totem.toLowerCase().includes(filter.value.toLowerCase())
    ) {
      tableTotem.value[locationAndYear].people.push(person);
    }
  });
}

watchEffect(() => {
  fetch("https://people.mirandola2.workers.dev/totem")
    .then((res) => res.json())
    .then((t) => {
      totem.value = t;
      updateTotem();
      loading.value.loaded = true;
    })
    .catch((error) => {
      loading.value.text =
        "Un problema non ha permesso il caricamento dei dati, riprova più tardi.";
      loading.value.error = true;
    });
});
</script>
