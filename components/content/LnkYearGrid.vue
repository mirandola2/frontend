<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  photoPath: {
    type: String,
    required: true,
  },
  videoPath: {
    type: String,
    required: true,
  }
})

const { data: photoData } = await useAsyncData('csv-photos', () =>
  queryContent(props.photoPath).findOne()
)

const { data: videoData } = await useAsyncData('csv-videos', () =>
  queryContent(props.videoPath).findOne()
)

const sortDesc = ref(true)
const searchQuery = ref('')
const selectedType = ref('both')

const allData = computed(() => {
  const combined = []
  
  // Add photos with type identifier
  if (photoData.value?.body?.length) {
    photoData.value.body.forEach(item => {
      combined.push({
        ...item,
        type: 'photo'
      })
    })
  }
  
  // Add videos with type identifier
  if (videoData.value?.body?.length) {
    videoData.value.body.forEach(item => {
      combined.push({
        ...item,
        type: 'video'
      })
    })
  }
  
  return combined
})

const filteredData = computed(() => {
  if (!allData.value?.length) return []
  
  let filtered = allData.value
  
  // Filter by type
  if (selectedType.value !== 'both') {
    filtered = filtered.filter(row => row.type === selectedType.value)
  }
  
  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(row => 
      row.name?.toLowerCase().includes(query) ||
      row.year?.toString().includes(query) ||
      (Number(row.year) + 1)?.toString().includes(query)
    )
  }
  
  return filtered
})

const grouped = computed(() => {
  if (!filteredData.value?.length) return []
     
  const groups = filteredData.value.reduce((acc, row) => {
    const year = Number(row.year)
     
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

const typeStats = computed(() => {
  const stats = { photo: 0, video: 0 }
  filteredData.value.forEach(item => {
    stats[item.type]++
  })
  return stats
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

const getTypeIcon = (type) => {
  return type === 'photo' ? 'photo_camera' : 'videocam'
}

const getTypeLabel = (type) => {
  return type === 'photo' ? 'Foto' : 'Video'
}
</script>

<template>
  <div class="not-prose space-y-4">
    <!-- Search and Controls -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div class="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
      <div class="relative flex-1 w-full">
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
      
      <div class="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <select
        v-model="sortDesc"
        class="select select-sm select-bordered select-secondary text-secondary font-bold w-full sm:w-auto"
        >
        <option :value="true">Dal più recente</option>
        <option :value="false">Dal meno recente</option>
        </select>
        
        <select
        v-model="selectedType"
        class="select select-sm select-bordered select-secondary text-secondary font-bold w-full sm:w-auto"
        >
        <option value="both">Foto e Video</option>
        <option value="photo">Solo Foto</option>
        <option value="video">Solo Video</option>
        </select>
      </div>
      </div>
      
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm text-base-content/70">
      <div class="flex items-center gap-2">
        <span class="flex items-center gap-1">
        <span class="material-symbols-rounded text-xs">photo_camera</span>
        {{ typeStats.photo }}
        </span>
        <span class="flex items-center gap-1">
        <span class="material-symbols-rounded text-xs">videocam</span>
        {{ typeStats.video }}
        </span>
      </div>
      </div>
    </div>
    
    <!-- Clear filters button when filtering -->
    <div v-if="searchQuery.trim() || selectedType !== 'both'" class="flex items-center gap-2">
      <button
        @click="searchQuery = ''; selectedType = 'both'"
        class="btn btn-sm btn-ghost text-base-content/70 hover:text-base-content"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        Cancella filtri
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
        Prova a modificare i termini di ricerca o i filtri
      </p>
    </div>
            
    <!-- Results -->
    <div v-for="group in grouped" :key="group.year" class="bg-base-200 p-6 rounded-2xl">
      <h2 class="text-2xl font-bold mb-4">Anno {{ group.year }}-{{ group.year +1 }}</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <div
          v-for="entry in group.entries"
          :key="`${entry.type}-${entry.name}-${entry.year}`"
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200 group"
        >
          <div class="card-body">
            <span class="material-symbols-rounded text-sm">{{ getTypeIcon(entry.type) }}</span>
           
              <a :href="entry.url" class="card-title text-base font-normal group-hover:text-secondary group-hover:underline transition-colors">
                {{ entry.name }}
              </a>
            
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
                class="btn btn-sm btn-outline btn-secondary hover:btn-secondary-focus transition-colors"
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