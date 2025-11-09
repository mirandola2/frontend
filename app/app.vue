<script setup>
import { watch } from "vue";
import { useRoute, useSeoMeta } from "#app";
import Header from "./components/Header.vue";

const route = useRoute();

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
