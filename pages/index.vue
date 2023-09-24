<template>
  <div>
    <Hero
      title="Quarant'anni di giochi, avventure e strade."
      image="/hero.jpg"
      big
    />

    <div class="container grid md:grid-cols-3 -mt-24">
      <div
        class="card max-w-full bg-lc text-eg-content rounded-t-2xl rounded-b-none md:rounded-l-2xl md:rounded-r-none"
      >
      <div class="card-body items-center z-10">
          <h2 class="card-title">Lupetti e Coccinelle</h2>
          <p class="text-center">
            Dagli 8 agli 11 anni i bambini e le bambine vivono nel "branco" e
            nel "cerchio".
            <a class="link" href="/lc">Leggi tutto.</a>
          </p>
          <div class="card-actions justify-center">
            <a class="btn btn-ghost" href="/lc/lupetti">Branco</a>
            <a class="btn btn-ghost" href="/lc/coccinelle">Cerchio</a>
          </div>
        </div>
        <img src="/cappellini.svg" class="absolute w-full h-full p-2 opacity-10 object-contain"/> 
      </div>

      <div class="card max-w-full bg-eg text-lc-content rounded-none">
        <div class="card-body items-center z-10">
          <h2 class="card-title">Esploratori e Guide</h2>
          <p class="text-center">
            La Branca Esploratori/Guide si rivolge ai ragazzi dagli 12 ai 16
            anni che si uniscono nei Reparti.
            <a class="link" href="/eg">Leggi tutto.</a>
          </p>
          <div class="card-actions justify-center">
            <a class="btn btn-ghost" href="/eg/brownsea">Esploratori</a>
            <a class="btn btn-ghost" href="/eg/antares">Guide</a>
          </div>
        </div>
        <img src="/tenda.svg" class="absolute w-full h-full p-2 opacity-10 object-contain"/> 
      </div>

      <div
        class="card max-w-full bg-rs text-rs-content rounded-b-2xl rounded-t-none md:rounded-r-2xl md:rounded-l-none"
      >
        <div class="card-body items-center z-10">
          <h2 class="card-title">Rover e Scolte</h2>
          <p class="text-center">
            I Rover e le Scolte tra i 16 e 19 anni aderiscono alla proposta che
            lo Scoutismo fa alla loro età.
            <a class="link" href="/rs">Leggi tutto.</a>
          </p>
          <div class="card-actions justify-center">
            <a class="btn btn-ghost" href="/rs/noviziato">Noviziato</a>
            <a class="btn btn-ghost" href="/rs/mdv">Clan Fuoco</a>
          </div>
        </div>
        <img src="/forcola.svg" class="absolute w-full h-full p-2 opacity-10 object-contain"/> 
      </div>
    </div>

    <div class="mt-5 container">
      <div class="py-8 bg-neutral rounded-2xl">
        <Quote type="gruppo" />

      </div>
    </div>

    <div class="container mt-5">
      <div
        class="gap-2 grid md:grid-cols-3 justify-items-stretch"
      >
        <div
          class="card max-w-full md:col-span-2 text-neutral-content"
        >
          <div class="card-body">
            <h2 class="card-title">{{ data.title }}</h2>
            <ContentRenderer :value="data" />
          </div>
        </div>

        <div class="card max-w-full bg-neutral text-neutral-content">
          <div class="card-body">
            <h2 class="card-title">Compleanni</h2>
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
    returnBDString == ""
      ? "Nessuno compierà gli anni durante la prossima settimana."
      : counterFarBD != 0
      ? "."
      : "";
  return returnBDString;
}
</script>
