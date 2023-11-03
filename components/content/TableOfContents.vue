<template>
<div class="not-prose card w-full bg-base-200 text-base-content my-5" :class="{'md:float-right md:ml-5 md:w-96': !notaside}">
        <div class="card-body">
            <h2 class="card-title">Indice</h2>
            <ul v-if="toc && toc.links">
            <li v-for="link in toc.links" :key="link.id" :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }">
                <a :href="`#${link.id}`">
                {{ link.text }}
                </a>
            </li>
            </ul>

        </div>
      </div>
</template>
<script setup>
const {toc} = useContent()

defineProps({
    notaside: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>