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


    <BlogLayout>
      <div class="card max-w-none bg-base-300">
            <div class="card-body">
              <h2 class="card-title">{{ data.title }}</h2>
              <ContentRenderer :value="data" />
            </div>
          </div>
          <div class="grid lg:grid-cols-2 mt-3 grid-flow-rows gap-3">
            <BlogFeed />
          </div>
          <p class=" text-right w-full mt-3"><a href="/blog" class="btn btn-base-200">Leggi Tutte le notizie</a></p>
    </BlogLayout>

  </div>
</template>

<script setup>
const { data } = await useAsyncData("home", () =>
  queryContent("/_home").findOne()
);


</script>
