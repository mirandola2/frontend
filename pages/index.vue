<template>
  <div>
    <Hero
      title="Quarant'anni di giochi, avventure e strade."
      image="/hero.jpg"
      color="primary"
      logo="/logo_white.svg"
    />
    <div class="container p-2 space-y-2">
      <Quote type="gruppo" />
      <div
        class="py-10 gap-2 md:gap-6 grid md:grid-cols-3 justify-items-stretch"
      >
        <div class="card max-w-full bg-lc text-neutral-content">
          <div class="card-body">
            <img class="h-16 ml-auto" src="/cappellini.svg" />
            <h2 class="card-title">Lupetti e Coccinelle</h2>
            <p>
              Dagli 8 agli 11 anni i bambini e le bambine vivono nel "branco" o
              nel "cerchio" come lupetti o coccinelle.
              <a class="link" href="/lc">Leggi tutto.</a>
            </p>
            <div class="card-actions justify-end items-center">
              <a class="btn btn-ghost" href="/lc/lupetti">Branco</a>
              <a class="btn btn-ghost" href="/lc/coccinelle">Cerchio</a>
            </div>
          </div>
        </div>

        <div class="card max-w-full bg-eg text-neutral-content">
          <div class="card-body">
            <img class="h-16 ml-auto" src="/tenda.svg" />
            <h2 class="card-title">Esploratori e Guide</h2>
            <p>
              La Branca Esploratori/Guide si rivolge ai ragazzi dagli 12 ai 16
              anni che si uniscono in Unità chiamate Reparti.
              <a class="link" href="/eg">Leggi tutto.</a>
            </p>
            <div class="card-actions justify-end items-center">
              <a class="btn btn-ghost" href="/eg/brownsea">Esploratori</a>
              <a class="btn btn-ghost" href="/eg/antares">Guide</a>
            </div>
          </div>
        </div>

        <div class="card max-w-full bg-rs text-neutral-content">
          <div class="card-body">
            <img class="h-16 ml-auto" src="/forcola.svg" />
            <h2 class="card-title">Rover e Scolte</h2>
            <p>
              I Rover e le Scolte sono ragazzi/e tra i 16 e 19 anni che
              aderiscono alla proposta che lo Scoutismo fa alla loro età.
              <a class="link" href="/rs">Leggi tutto.</a>
            </p>
            <div class="card-actions justify-end items-center">
              <a class="btn btn-ghost" href="/rs/noviziato">Noviziato</a>
              <a class="btn btn-ghost" href="/rs/mdv">Clan Fuoco</a>
            </div>
          </div>
        </div>

        <div
          class="card max-w-full md:col-span-2 bg-neutral text-neutral-content"
        >
          <div class="card-body">
            <h2 class="card-title">{{ data.title }}</h2>
            <ContentRenderer :value="data" />
          </div>
        </div>

        <div class="card max-w-full bg-neutral text-neutral-content">
          <div class="card-body">
            <h2 class="card-title">Compleanni 🥳</h2>
            <p>
              {{ compleanni }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data } = await useAsyncData("home", () =>
  queryContent("/_home").findOne()
);

const compleanni = ref();

watchEffect(async () => {
  compleanni.value = birthdaysFormatter(
    await (await fetch("https://people.mirandola2.workers.dev/birthday")).json()
  );
  console.log(compleanni.value);
});

function birthdaysFormatter(birthdays) {
  let returnBDString = "";
  let flagFarBDString = true;
  let counterFarBD = 0;

  const birthdaysReduced = birthdays.reduce(function (acc, curr) {
    acc[curr.t_minus] = acc[curr.t_minus] || [];
    acc[curr.t_minus].push(curr.name);
    if (curr.t_minus > 1) {
      counterFarBD += 1;
    }
    return acc;
  }, Object.create(null));

  for (const [tminus, names] of Object.entries(birthdaysReduced)) {
    const length = names.length;

    let namesString = "";

    if (length === 0) {
      namesString = "";
    } else if (length === 1) {
      namesString = names[0];
    } else {
      const last = names.pop();
      namesString = names.join(", ") + " e " + last;
    }

    if (tminus === "0") {
      returnBDString += `Oggi è il compleanno di ${namesString}, auguri! `;
    } else if (tminus === "1") {
      returnBDString += `Domani ${
        length < 2 ? "compierà" : "compieranno"
      } gli anni ${namesString}. `;
    } else {
      returnBDString += `${
        flagFarBDString
          ? counterFarBD < 2
            ? "Il prossimo compleanno è di"
            : "I prossimi compleanni sono di"
          : ", "
      } ${namesString} fra ${tminus} giorni`;
      flagFarBDString = false;
    }
  }

  returnBDString +=
    returnBDString == "" && !flagFarBDString ? "Nessuno compierà gli anni durante la prossima settimana." : ".";
  return returnBDString;
}
</script>
