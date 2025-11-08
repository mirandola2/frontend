<template>
  <div
    class="not-prose card w-full bg-base-200 text-base-content my-5"
    :class="{ 'md:float-right md:ml-5 md:w-96': !notaside }"
  >
    <div class="card-body">
      <h2 class="card-title">Indice</h2>
      <ul v-if="toc && toc.links">
        <li v-for="link in toc.links" :key="link.id">
          <a :href="`#${link.id}`">
            {{ link.text }}
          </a>
          <ul v-if="maxdepth>2">
            <li
              v-for="child in link.children"
              :key="child.id"
              class="ml-4 text-sm"
            >
              <a :href="`#${child.id}`">
                {{ child.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
defineProps({
  notaside: {
    type: Boolean,
    required: false,
    default: false,
  },
  maxdepth: {
    type: Number,
    required: false,
    default: 2,
  }
});

const route = useRoute();
const { data: page } = await useAsyncData(
  () => `toc:${route.path}`,
  () => queryCollection("pages").path(route.path).first()
);
const toc = computed(() => page?.value?.body.toc ?? []);

</script>
