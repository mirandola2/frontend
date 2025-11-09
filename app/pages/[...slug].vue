<template>
  <Head>
		<Title>{{page?.title}} ~ Scout Mirandola 2 ~ Da più di 40 anni facciamo giochi, avventure e strade.</Title>
    <Meta
      name="description"
      :content="page?.description ? page.description : `Pagina ${page?.title} del sito del Gruppo Scout Mirandola 2.`"
    />

    <Meta      
      name="og:image"
      :content="page.image"
    />
	</Head>

  <Hero :title="page?.title" :image="page?.image" v-if="page?.show_hero != false"/>

  <div class="container space-y-2" :class="{'-mt-16': page?.overlap_hero, 'mt-5': !page?.overlap_hero}">
    <div
      class="prose-container"
    >
      <ContentRenderer :value="page" />
    </div>
  </div>

</template>
<script setup>

const route = useRoute();

const { data: page } = await useAsyncData(
  route.path,
  () => queryCollection('pages').path(route.path).first()
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

</script>
