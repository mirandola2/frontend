<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  path: {
    type: String,
    required: true,
  }
})

const { data } = await useAsyncData('csv', () =>
  queryContent(props.path).findOne()
)
const sortDesc = ref(true)

const grouped = computed(() => {
  if (!data.value?.body?.length) return []
  
  const groups = data.value.body.reduce((acc, row) => {
    // Extract the first year from formats like "1983-84"
    const yearStr = row.year?.toString().split('-')[0]
    const year = Number(yearStr)

    if (!acc[year]) acc[year] = []
    acc[year].push(row)
    return acc
  }, {})
  
  // Sort years and return as array of objects
  const sortedYears = Object.keys(groups)
    .map(Number)
    .sort((a, b) => sortDesc.value ? b - a : a - b)
    
  return sortedYears.map(year => ({
    year,
    entries: groups[year]
  }))
})

</script>

<template>
  <div class="not-prose space-y-4">
    <div class="flex items-center gap-2">
      <select
        v-model="sortDesc"
        class="select select-sm select-bordered select-secondary text-secondary font-bold"
      >
        <option :value="true">Dal più recente</option>
        <option :value="false">Dal meno recente</option>
      </select>
      <select
        class="select select-sm select-bordered select-secondary text-secondary font-bold"
      >
        <option :value="photo">Foto</option>
        <option :value="both" disabled>Foto e Video</option>
        <option :value="video" disabled>Video</option>
      </select>
      <span class="text-sm text-base-content/70">
        {{ grouped.length }} anni trovati
      </span>
    </div>


    

    <div v-for="group in grouped" :key="group.year" class="bg-base-200 p-6 rounded-2xl">
      <h2 class="text-2xl font-bold mb-4">Anno {{ group.year }}</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <div
          v-for="entry in group.entries"
          :key="entry.name"
          class="card bg-base-100 shadow-xl hover:shadow group"
        >
            <a :href="entry.url" target="_blank" class="card-body block h-full w-full cursor-pointer">
            <h3 class="card-title font-normal group-hover:underline group-hover:text-secondary">{{ entry.name }}</h3>
            </a>
            <div class="card-body flex flex-col items-center">
            
            <div class="card-actions justify-end">
              <a :href="entry.url" target="_blank" class="btn btn-sm btn-secondary">Visualizza</a>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>