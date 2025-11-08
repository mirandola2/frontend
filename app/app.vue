<script setup>
import { useRoute, useSeoMeta } from "#app";
import Header from "./components/Header.vue";

const route = useRoute();

useSeoMeta({
	ogTitle:
		route.path !== "/"
			? `${route.meta?.title || "Pagina"} ~ Agesci Gruppo Mirandola 2`
			: "Agesci Scout Mirandola 2 ~ 40 anni di giochi, avventure e strade!",
	description:
		route.path === "/"
			? "Siamo a Mirandola dal 1983: scopri le ultime notizie, la nostra storia, i nostri staff, i nomi totem, la galleria foto e video e una raccolta di strumenti utili."
			: route.meta?.description ||
				"Siamo a Mirandola dal 1983: scopri le ultime notizie e la nostra storia.",
	ogDescription:
		route.path === "/" || !route.meta?.description
			? "Siamo a Mirandola dal 1983: scopri le ultime notizie, la nostra storia, i nostri staff, i nomi totem, la galleria foto e video e una raccolta di strumenti utili."
			: route.meta.description,
});

</script>

<template>
	

	<link
		rel="stylesheet" defer
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
	/>
	<Header>
		<NuxtPage />
		<Footer />
	</Header>
</template>
