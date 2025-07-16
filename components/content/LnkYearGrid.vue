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
const searchQuery = ref('')

const filteredData = computed(() => {
  if (!data.value?.body?.length) return []
  
  if (!searchQuery.value.trim()) {
    return data.value.body
  }
  
  const query = searchQuery.value.toLowerCase().trim()
  return data.value.body.filter(row => 
    row.name?.toLowerCase().includes(query) ||
    row.year?.toString().includes(query)
  )
})

const grouped = computed(() => {
  if (!filteredData.value?.length) return []
     
  const groups = filteredData.value.reduce((acc, row) => {
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

const totalEntries = computed(() => {
  return grouped.value.reduce((total, group) => total + group.entries.length, 0)
})

const copyLink = async (entry) => {
  try {
    await navigator.clipboard.writeText(entry.url)
    // You might want to show a toast notification here
    console.log('Link copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}
</script>

<template>
  <div class="not-prose space-y-4">
    <!-- Search and Controls -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <div class="flex items-center gap-2 flex-1">
        <div class="relative flex-1 max-w-sm">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cerca per nome o anno..."
            class="input input-sm input-bordered input-secondary w-full pr-8"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg class="w-4 h-4 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
        
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
      </div>
      
      <div class="flex items-center gap-2 text-sm text-base-content/70">
        <span>{{ totalEntries }} elementi in {{ grouped.length }} anni</span>
        <span v-if="searchQuery.trim()" class="badge badge-secondary badge-sm">
          Filtrato
        </span>
      </div>
    </div>
    
    <!-- Clear search button when searching -->
    <div v-if="searchQuery.trim()" class="flex items-center gap-2">
      <button
        @click="searchQuery = ''"
        class="btn btn-sm btn-ghost text-base-content/70 hover:text-base-content"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        Cancella ricerca
      </button>
    </div>
    
    <!-- No results message -->
    <div v-if="grouped.length === 0" class="text-center py-12">
      <div class="text-base-content/50 mb-2">
        <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </div>
      <p class="text-lg font-medium text-base-content/70">
        Nessun risultato trovato
      </p>
      <p class="text-base-content/50">
        Prova a modificare i termini di ricerca
      </p>
    </div>
            
    <!-- Results -->
    <div v-for="group in grouped" :key="group.year" class="bg-base-200 p-6 rounded-2xl">
      <h2 class="text-2xl font-bold mb-4">Anno {{ group.year }}</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <div
          v-for="entry in group.entries"
          :key="entry.name"
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200 group"
        >
          <div class="card-body">
            <div class="flex items-start justify-between gap-2 mb-2">
              <a :href="entry.url"  class="card-title text-base font-normal group-hover:text-secondary group-hover:underline transition-colors">
                {{ entry.name }}
              </a>
              
            </div>
            
            <div class="card-actions justify-end mt-auto">
              <button
                @click="copyLink(entry)"
                class="btn btn-ghost btn-sm transition-opacity duration-200"
                title="Copia link"
              >
                <span class="material-symbols-rounded">link</span>
              </button>
              <a 
                :href="entry.url" 
                target="_blank" 
                class="btn btn-sm btn-outline btn-secondary  hover:btn-secondary-focus transition-colors"
              >
                <span class="material-symbols-rounded">east</span>
                
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>