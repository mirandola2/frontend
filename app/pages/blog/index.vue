<template>
  <Head>
    <Title
      >Blog del Gruppo Scout Mirandola 2 ~ Da più di 40 anni facciamo giochi,
      avventure e strade.</Title
    >
    <Meta
      name="description"
      content="Siamo a Mirandola dal 1983: scopri le ultime notizie, la nostra storia, i nostri staff, i nomi totem, la galleria foto e video e una raccolta di strumenti utili."
    />
  </Head>

  <BlogLayout>
    <div class="grid gap-3">
      <div class="card w-full bg-base-200 shadow-none">
        <div class="card-body">
          <h2 class="text-2xl font-bold">Tutte le notizie</h2>
        </div>
      </div>
      <BlogFeed horizontal />
    </div>
  </BlogLayout>
</template>
