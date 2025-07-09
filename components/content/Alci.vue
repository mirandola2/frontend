<template>
  <div class="card not-prose my-5 w-full max-w-3xl mx-auto bg-neutral">
    <div class="card-body">
      <h2 class="card-title">Generatore di Alci</h2>
      

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
      <div class="form-control w-full flex flex-row items-center gap-2">
        <label class="label cursor-pointer">
          <span class="label-text">Modalità Expert</span>
          <input type="checkbox" v-model="expertMode" class="toggle toggle-secondary toggle-md  ml-2" />
        </label>
      </div>
      <div class="form-control w-full" v-if="expertMode">
        <label class="label">
          <span class="label-text">Pattern: usa <strong>m</strong>, <strong>M</strong>, <strong>0</strong>, e
        <strong>$</strong> come segnaposto per rispettivamente lettere minuscole o maiuscole,
         numeri e simboli!</span>
        </label>
        <input
          v-model="format"
          type="text"
          class="input input-bordered w-full bg-base-200 font-[monospace]"
          @input="validateFormat"
        />
         <label class="label">
          <span class="label-text">Separatore</span>
        </label>
        <input
          v-model="separator"
          type="text"
          placeholder="(nessuno)"
          class="input input-bordered w-full bg-base-200 font-[monospace]"
        />
      </div>

      <div class="form-control w-full" v-if="format.includes('$')">
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
            class="btn btn-sm flex-1"
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
  class="grid gap-2 lg:grid-cols-6 grid-cols-3" 
>
  <button
    v-for="(str, index) in generatedStrings"
    :key="index"
    @click="copyToClipboard(str)"
    class="btn btn-sm btn-outline font-[monospace] w-auto min-w-fit max-w-full text-left break-words"
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
const format = ref("M-0-M");
const customSymbols = ref("!@#$%&*");
const generatedStrings = ref([]);
const expertMode = ref(useCookie("expertMode") || false);
const separator = ref("");

// Character sets
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";

// Validation
const isValidFormat = computed(() => {
  if (!format.value) return false;
 
  // Allow only m, M, 0, $ and spaces, case sensitive
  return /^[mM0$\s\-]+$/.test(format.value);
});

// Generate random character from set
const getRandomFromSet = (charset) => {
  return charset[Math.floor(Math.random() * charset.length)];
};

const patternGenerators = {
  "M": uppercaseChars,
  "m": lowercaseChars,
  "0": digits,
  "$": () => customSymbols.value || "!@#$%^&*",
};


const generateString = (formatPattern) => {
  const parts = formatPattern.split("-");
  const result = parts.map(part => {
    const charsets = Array.from(part).map(char => {
      if (char === "M") return uppercaseChars;
      if (char === "m") return lowercaseChars;
      if (char === "0") return digits;
      if (char === "$") return customSymbols.value || "!@#$%&*";
      return "";
    });
    const combinedCharset = charsets.join("");
    return combinedCharset ? getRandomFromSet(combinedCharset) : "";
  });
  return result.join(separator.value || "");
};
const generateStrings = () => {
  if (!isValidFormat.value || count.value <= 0) return;

  const strings = new Set(); 
  const maxAttempts = count.value * 1000; // Prevent infinite loop
  let attempts = 0;

  while (strings.size < count.value && attempts < maxAttempts) {
    const newString = generateString(format.value);
    strings.add(newString);
    attempts++;
  }

  generatedStrings.value = Array.from(strings);
};

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
  } catch (err) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
};

const copyAllToClipboard = async () => {
  const allStrings = generatedStrings.value.join("\n");
  await copyToClipboard(allStrings);
};

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
