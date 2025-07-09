<template>
  <div class="card not-prose my-5 w-full max-w-3xl mx-auto bg-neutral">
    <div class="card-body">
      <h2 class="card-title">Generatore di Alci</h2>
      <p>
        Usa <strong>u</strong>, <strong>l</strong>, <strong>d</strong>, e
        <strong>s</strong> come segnaposto per rispettivamente maiuscole,
        minuscole, numeri e simboli!
      </p>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Numero di alci:</span>
        </label>
        <input
          v-model.number="count"
          type="number"
          min="1"
          placeholder="50"
          class="input input-bordered w-full bg-base-200"
        />
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Pattern:</span>
        </label>
        <input
          v-model="format"
          type="text"
          class="input input-bordered w-full bg-base-200 font-[monospace]"
          @input="validateFormat"
        />
      </div>

      <div class="form-control w-full" v-if="format.includes('s')">
        <label class="label">
          <span class="label-text">Simboli personalizzati:</span>
        </label>
        <input
          v-model="customSymbols"
          type="text"
          placeholder="!@#$%^&*"
          class="input input-bordered w-full bg-base-200 font-[monospace]"
        />
      </div>

      <div v-if="!isValidFormat && format" class="alert alert-error">
        <span>Formato non valido.</span>
      </div>

      <button
        @click="generateStrings"
        :disabled="!isValidFormat"
        class="btn btn-primary w-full mt-4"
      >
        Genera Stringhe
      </button>

      <div v-if="generatedStrings.length > 0" class="mt-4">
        <div class="flex gap-2 mt-4 flex-wrap items-stretch">
          <button
            @click="copyAllToClipboard"
            class="btn btn-info btn-sm flex-1"
          >
            Copia Tutto
          </button>
          <button @click="exportToTxt" class="btn btn-secondary btn-sm flex-1">
            Esporta .TXT
          </button>
        </div>

        <div class="mt-5 font-bold">
          Stringhe Generate ({{ generatedStrings.length }})
        </div>
        <div
          class="grid gap-2"
          style="grid-template-columns: repeat(auto-fit, minmax(2.5rem, 1fr))"
        >
          <button
            v-for="(str, index) in generatedStrings"
            :key="index"
            @click="copyToClipboard(str)"
            class="btn btn-sm btn-outline font-[monospace] w-auto"
            title="Copia"
          >
            {{ str }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Reactive data
const count = ref(50);
const format = ref("udu");
const customSymbols = ref("!@#$%^&*");
const generatedStrings = ref([]);

// Character sets
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";

// Validation
const isValidFormat = computed(() => {
  if (!format.value) return false;
  // Only allow u, l, d, s as pattern characters (case-insensitive)
  // No other letters allowed
  return /^[ulds\-\d_ .]+$/i.test(format.value);
});

// Generate random character from set
const getRandomFromSet = (charset) => {
  return charset[Math.floor(Math.random() * charset.length)];
};

// Generate random uppercase letter
const getRandomUppercase = () => getRandomFromSet(uppercaseChars);

// Generate random lowercase letter
const getRandomLowercase = () => getRandomFromSet(lowercaseChars);

// Generate random digit
const getRandomDigit = () => getRandomFromSet(digits);

// Generate random symbol
const getRandomSymbol = () => {
  const symbols = customSymbols.value || "!@#$%^&*";
  return getRandomFromSet(symbols);
};

// Generate single string based on format
const generateString = (formatPattern) => {
  return formatPattern
    .toLowerCase()
    .replace(/u/g, () => getRandomUppercase())
    .replace(/l/g, () => getRandomLowercase())
    .replace(/d/g, () => getRandomDigit())
    .replace(/s/g, () => getRandomSymbol());
};

// Generate array of strings
const generateStrings = () => {
  if (!isValidFormat.value || count.value <= 0) return;

  const strings = new Set(); // Use Set to ensure uniqueness
  const maxAttempts = count.value * 1000; // Prevent infinite loop
  let attempts = 0;

  // Generate strings until we have enough unique ones
  while (strings.size < count.value && attempts < maxAttempts) {
    const newString = generateString(format.value);
    strings.add(newString);
    attempts++;
  }

  generatedStrings.value = Array.from(strings);
};

// Validate format on input
const validateFormat = () => {
  // This is handled by the computed property
};

// Copy single string to clipboard
const copyToClipboard = async (text) => {
  try {
    showToast("Copiato!");

    function showToast(message) {
      const toast = document.createElement("div");
      toast.textContent = message;
      toast.style.position = "fixed";
      toast.style.bottom = "32px";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%)";
      toast.style.background = "#333";
      toast.style.color = "#fff";
      toast.style.padding = "12px 24px";
      toast.style.borderRadius = "8px";
      toast.style.zIndex = 9999;
      toast.style.fontSize = "1rem";
      toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 1000);
    }
    await navigator.clipboard.writeText(text);
    // You could add a toast notification here
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
};

// Copy all strings to clipboard
const copyAllToClipboard = async () => {
  const allStrings = generatedStrings.value.join("\n");
  await copyToClipboard(allStrings);
};

// Export to TXT file
const exportToTxt = () => {
  const content = generatedStrings.value.join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `alci.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
</script>
