<template>
<div class="not-prose card w-96 bg-base-200 text-base-content">
        <div class="card-body">
            <h2 class="card-title">Indice</h2>
            <p><ul v-if="toc && toc.links">
            <li v-for="link in toc.links" :key="link.id" :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }">
                <a :href="`#${link.id}`">
                {{ link.text }}
                </a>
            </li>
            </ul></p>

        </div>
      </div>
</template>
<script setup>
const {toc} = useContent()
</script>