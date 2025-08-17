<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";

const { toast, toastMessage, showToast } = useToast()



const props = defineProps({
  photoPath: {
    type: String,
    required: true,
  },
  videoPath: {
    type: String,
    required: true,
  },
});

const { data: photoData } = await useAsyncData("csv-photos", () =>
  queryContent(props.photoPath).findOne()
);

const { data: videoData } = await useAsyncData("csv-videos", () =>
  queryContent(props.videoPath).findOne()
);

const sortDesc = ref(true);
const searchQuery = ref("");
const selectedType = ref("both");

// URL formatting helper
const formatUrlId = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};
// Get current URL parameters
const getUrlParams = () => {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get("search") || "",
    type: params.get("type") || "both",
    sort: params.get("sort") || "desc",
    card: window.location.hash ? window.location.hash.substring(1) : "",
  };
};

// Update URL with current filters without page reload
const updateUrl = () => {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams();

  if (searchQuery.value.trim()) {
    params.set("search", searchQuery.value.trim());
  }

  if (selectedType.value !== "both") {
    params.set("type", selectedType.value);
  }

  // Only set sort param if ascending, default is descending
  if (!sortDesc.value) {
    params.set("sort", "asc");
  }

  // Compose URL with params and hash
  const queryString = params.toString();
  const url = queryString
    ? `${window.location.pathname}?${queryString}${window.location.hash}`
    : window.location.pathname + window.location.hash;

  // Replace current history state without reloading page
  window.history.replaceState({}, "", url);
};

// Initialize filters from URL parameters
const initializeFromUrl = () => {
  const params = getUrlParams();

  searchQuery.value = params.search;
  selectedType.value = params.type;
  sortDesc.value = params.sort === "desc";
};
const focusCard = async (cardId, jumpToElement = false) => {
  if (!cardId) return;

  const element = document.getElementById(formatUrlId(cardId));
  
  if (!element) {
    // Wait for element if it doesn't exist yet
    await new Promise(resolve => setTimeout(resolve, 100));
    const retryElement = document.getElementById(formatUrlId(cardId));
    if (!retryElement) return;
    
    if (jumpToElement) {
      // Calculate position with offset
      let elementTop = 0;
      let current = retryElement;
      while (current) {
        elementTop += current.offsetTop;
        current = current.offsetParent;
      }
      
      window.scrollTo({
        top: elementTop - 200, // 200px offset
        behavior: 'smooth'
      });
    }
    
    retryElement.focus({ preventScroll: true });
    return;
  }

  if (jumpToElement) {
    // Calculate position with offset
    let elementTop = 0;
    let current = element;
    while (current) {
      elementTop += current.offsetTop;
      current = current.offsetParent;
    }
    
    window.scrollTo({
      top: elementTop - 200, // 200px offset
      behavior: 'smooth'
    });
  }

  element.focus({ preventScroll: true });
};

// Better initialization
onMounted(async () => {
  initializeFromUrl();

  // Wait for Vue to finish rendering
  await nextTick();
  
  // Additional wait for data to be processed
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Handle initial hash
  const params = getUrlParams();
  if (params.card) {
    await focusCard(params.card, true);
  }

  // Listen for hash changes
  window.addEventListener("hashchange", handleHashChange);
});


// Improved hash change handler with error handling
const handleHashChange = async () => {
  const cardId = window.location.hash.replace("#", "");
  if (cardId) {
    const success = await focusCard(cardId, true);
    if (!success) {
      console.warn(`Could not scroll to card: ${cardId}`);
    }
  }
};

// Better onMounted with proper async handling
onMounted(async () => {
  // Initialize filters from URL
  initializeFromUrl();

  // Wait for Vue's initial render
  await nextTick();

  // Handle initial hash if present
  const params = getUrlParams();
  if (params.card) {
    try {
      await focusCard(params.card, true);
    } catch (error) {
      console.warn('Failed to scroll to initial card:', error);
    }
  }

  // Set up hash change listener
  window.addEventListener("hashchange", handleHashChange);
});

// Enhanced copyLink function with better error handling
const copyLink = async (entry) => {
  const cardId = formatUrlId(entry.id);
  const currentUrl = window.location.origin + window.location.pathname;
  const params = new URLSearchParams(window.location.search);
  const queryString = params.toString();
  const fullUrl = `${currentUrl}${queryString ? "?" + queryString : ""}#${cardId}`;

  try {
    // Modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(fullUrl);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = fullUrl;
      textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, textArea.value.length);
      
      if (!document.execCommand('copy')) {
        throw new Error('Copy command failed');
      }
      
      document.body.removeChild(textArea);
    }

    // Update URL hash
    history.replaceState(null, null, `#${cardId}`);
    
    // Scroll to and focus the card
    const success = await focusCard(cardId, true);
    
    if (!success) {
      console.warn('Link copied but could not scroll to card');
    }
    toast("Link Copiato!")
    
  } catch (err) {
    console.error("Failed to copy link:", err);
    
    // Still try to navigate even if copy failed
    history.replaceState(null, null, `#${cardId}`);
    await focusCard(cardId, true);
  }
};


const allData = computed(() => {
  const combined = [];

  // Add photos with type identifier
  if (photoData.value?.body?.length) {
    photoData.value.body.forEach((item) => {
      combined.push({
        ...item,
        type: "photo",
      });
    });
  }

  // Add videos with type identifier
  if (videoData.value?.body?.length) {
    videoData.value.body.forEach((item) => {
      combined.push({
        ...item,
        type: "video",
      });
    });
  }

  return combined;
});

const filteredData = computed(() => {
  if (!allData.value?.length) return [];

  let filtered = allData.value;

  // Filter by type
  if (selectedType.value !== "both") {
    filtered = filtered.filter((row) => row.type === selectedType.value);
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(
      (row) =>
        row.name?.toLowerCase().includes(query) ||
        row.year?.toString().includes(query) ||
        (Number(row.year) + 1)?.toString().includes(query)
    );
  }

  return filtered;
});

const grouped = computed(() => {
  if (!filteredData.value?.length) return [];

  const groups = filteredData.value.reduce((acc, row) => {
    const year = Number(row.year);

    if (!acc[year]) acc[year] = [];
    acc[year].push(row);
    return acc;
  }, {});

  // Sort years and return as array of objects
  const sortedYears = Object.keys(groups)
    .map(Number)
    .sort((a, b) => (sortDesc.value ? b - a : a - b));

  return sortedYears.map((year) => ({
    year,
    entries: groups[year],
  }));
});

const totalEntries = computed(() => {
  return grouped.value.reduce(
    (total, group) => total + group.entries.length,
    0
  );
});

const typeStats = computed(() => {
  const stats = { photo: 0, video: 0 };
  filteredData.value.forEach((item) => {
    stats[item.type]++;
  });
  return stats;
});

const getTypeIcon = (type) => {
  return type === "photo" ? "photo_camera" : "videocam";
};

const getTypeLabel = (type) => {
  return type === "photo" ? "Foto" : "Video";
};

// Watch for filter changes and update URL
watch([searchQuery, selectedType, sortDesc], () => {
  updateUrl();
});

</script>

<template>
  <div class="not-prose space-y-4">
    <!-- Search and Controls -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div
        class="flex flex-col md:flex-row items-start md:items-center gap-4 w-full"
      >
        <div class="relative flex-1 w-full">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cerca per nome o anno..."
            class="input input-sm input-bordered input-secondary w-full pr-8"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              class="w-4 h-4 text-base-content/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
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

      <div
        class="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm text-base-content/70"
      >
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
    <div
      v-if="searchQuery.trim() || selectedType !== 'both'"
      class="flex items-center gap-2"
    >
      <button
        @click="
          searchQuery = '';
          selectedType = 'both';
        "
        class="btn btn-sm btn-ghost text-base-content/70 hover:text-base-content"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Cancella filtri
      </button>
    </div>

    <!-- No results message -->
    <div v-if="grouped.length === 0" class="text-center py-12">
      <div class="text-base-content/50 mb-2">
        <svg
          class="w-12 h-12 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
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
    <div
      v-for="group in grouped"
      :key="group.year"
      class="bg-base-200 p-6 rounded-2xl"
    >
      <h2 class="text-2xl font-bold mb-4">
        Anno {{ group.year }}-{{ group.year + 1 }}
      </h2>
      <div class="grid md:grid-cols-3 gap-4">
        <div
          v-for="entry in group.entries"
          :key="`${entry.type}-${entry.name}-${entry.year}`"
          :id="formatUrlId(entry.id)"
          class="card bg-base-100 shadow hover:shadow-2xl transition-all duration-200 group focus:outline-none focus:shadow-2xl focus:ring-4 focus:ring-secondary focus:ring-offset-4"
          tabindex="0"
        >
          <div class="card-body">
            <span class="material-symbols-rounded text-sm">{{
              getTypeIcon(entry.type)
            }}</span>

            <a
              :href="entry.url"
              class="card-title text-base font-normal group-hover:text-secondary group-hover:underline transition-colors"
            >
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
  <Toast v-if="showToast" :message="toastMessage" />

</template>

