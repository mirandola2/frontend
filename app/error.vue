<script setup>
import { useRouter, useRoute } from "#app";

const props = defineProps({
  error: Object
});

const router = useRouter();
const route = useRoute();


const handleReload = () => {
  router.go(0);
};
</script>

<template>
	<Head>
		<Title>Errore ~ Scout Mirandola 2</Title>
	</Head>

	<link
		rel="stylesheet" defer
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
	/>
	
	<div >
		<main class="drawer-content flex flex-col min-h-screen">
			<!-- Navbar -->
			<div
				class="navbar text-primary-content sticky xl:top-0 z-50 bg-primary shadow-md"
			>
				<div class="container max-w-none max-xl:px-5 xl:mx-auto flex items-center">
					<div class="flex-1">
						<h1 class="text-2xl font-bold">
							<a href="/">
								<NuxtImg placeholder src="/img/graphics/logo_white.svg" class="h-16 -ml-3 xl:ml-0" alt="logo"/>
							</a>
						</h1>
					</div>

				
				</div>

			</div>

			<!-- Error Content -->
			<div class="flex-1 flex items-center justify-center bg-base-100 px-4 py-16">
				<div class="text-center max-w-2xl space-y-8">
					<div class="space-y-4">
						<h1 class="text-4xl text-primary">
							Quando la strada non c'è, inventala!
						</h1>
						<p class="text-lg">
Ops, si è verificato un errore e non siamo in grado di fornirti la pagina correttamente.						</p>
					</div>

					<div class="bg-base-200 rounded-lg p-6 inline-block">
						<p class="">
							<span class="font-bold">Errore {{ error?.statusCode || '500' }}</span>
							<span v-if="error?.message"> - {{ error.message }}</span>
						</p>
					</div>

					<div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
						<a href="/" class="btn btn-primary btn-lg">
							Torna alla Home
						</a>
						<button @click="handleReload" class="btn btn-outline btn-primary btn-lg">
							Riprova
						</button>
					</div>
				</div>
			</div>

			<Footer />
		</main>

	
	</div>
</template>