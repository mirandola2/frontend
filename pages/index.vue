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
        <div class="text-center card-body items-center z-10">
          <h2 class="card-title">Lupetti e Coccinelle</h2>
          <p>
            Dagli 8 agli 11 anni i bambini e le bambine vivono nel "branco" e
            nel "cerchio".
            <a class="link" href="/lc">Leggi tutto.</a>
          </p>
          <div class="card-actions justify-center">
            <a class="btn btn-ghost btn-sm" href="/lc/lupetti">Branco</a>
            <a class="btn btn-ghost btn-sm" href="/lc/coccinelle">Cerchio</a>
          </div>
        </div>
        <img
          src="/cappellini.svg"
          class="absolute w-full h-full p-2 opacity-10 object-contain"
        />
      </div>

      <div class="card max-w-full bg-eg text-lc-content rounded-none">
        <div class="card-body items-center text-center z-10">
          <h2 class="card-title">Esploratori e Guide</h2>
          <p>
            La Branca Esploratori/Guide si rivolge ai ragazzi dagli 12 ai 16
            anni che si uniscono nei Reparti.
            <a class="link" href="/eg">Leggi tutto.</a>
          </p>
          <div class="card-actions justify-center">
            <a class="btn btn-ghost btn-sm" href="/eg/brownsea">Esploratori</a>
            <a class="btn btn-ghost btn-sm" href="/eg/antares">Guide</a>
          </div>
        </div>
        <img
          src="/tenda.svg"
          class="absolute w-full h-full p-2 opacity-10 object-contain"
        />
      </div>

      <div
        class="card max-w-full bg-rs text-rs-content rounded-b-2xl rounded-t-none md:rounded-r-2xl md:rounded-l-none"
      >
        <div class="text-center card-body items-center z-10">
          <h2 class="card-title">Rover e Scolte</h2>
          <p>
            I Rover e le Scolte tra i 16 e 19 anni aderiscono alla proposta che
            lo Scoutismo fa alla loro età.
            <a class="link" href="/rs">Leggi tutto.</a>
          </p>
          <div class="card-actions justify-center">
            <a class="btn btn-ghost btn-sm" href="/rs/noviziato">Noviziato</a>
            <a class="btn btn-ghost btn-sm" href="/rs/mdv">Clan Fuoco</a>
          </div>
        </div>
        <img
          src="/forcola.svg"
          class="absolute w-full h-full p-2 opacity-10 object-contain"
        />
      </div>
    </div>

    <div class="-mt-5">
      <div class="py-12 bg-base-200">
        <Quote type="gruppo" class="text-xl" />
      </div>
    </div>

    <div class="container mt-3">
      <div class="gap-3 flex justify-items-stretch">
        <div class="w-full max-w-7xl mx-auto text-neutral-content">
          <div class="card max-w-none bg-base-200">
            <div class="card-body">
              <h2 class="card-title">{{ data.title }}</h2>
              <ContentRenderer :value="data" />
            </div>
          </div>
          <div class="grid mt-5">
            <div
              class="card w-96 bg-base-100 shadow-xl"
              v-for="post in contentQuery"
            >
              <figure class="h-40">
                <img
                  :src="post.img"
                  alt="Shoes"
                  
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title">
                  {{ post.title }}
                  <div class="badge" :class="badge[post.category].bg">{{badge[post.category].text}}</div>
                </h2>
                <p>{{ post.description }} <a class="link" :href="post._path">Leggi tutto</a></p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="card max-w-sm bg-neutral text-neutral-content divide-y divide-base-100"
        >
          <div class="card-body">
            <h2 class="card-title">Compleanni</h2>
            <p>
              <Birthdays />
            </p>
          </div>
          <div class="card-body">
            <h2 class="card-title">Meteo Mirandola</h2>
            <Weather />
          </div>
          <div class="card-body">
            <h2 class="card-title">S. Messa di Gruppo</h2>
            <p>Ogni Domenica, alle 9.00 in Duomo</p>
          </div>
          <div class="card-body">
            <h2 class="card-title">Liturgia del Giorno</h2>
            <p>
              <DailyWord />
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

const contentQuery = await queryContent("blog").find();


const badge = {
  lc: {bg: "bg-lc text-lc-content", text: "L/C"},
  eg: {bg: "bg-eg text-eg-content", text: "E/G"},
  rs: {bg: "bg-rs text-rs-content", text: "R/S"},
  cc: {bg: "bg-cc text-primary-content", text: "Gruppo"},
};


</script>
