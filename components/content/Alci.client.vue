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
          max="1000"
          @input="count = Math.max(1, Math.min(count, 1000))"
          placeholder="50"
          class="input input-bordered w-full bg-base-200"
        />
      </div>
      <div class="form-control w-full flex flex-row items-center gap-2">
        <label class="label cursor-pointer">
          <span class="label-text">Modalità Expert 🧙</span>
          <input type="checkbox" v-model="expertMode" class="toggle toggle-secondary toggle-md  ml-2" />
        </label>
      </div>
      <div class="form-control w-full" v-if="expertMode">
        <label class="label">
          <span class="label-text">
            Pattern: usa <code>m</code>, <code>M</code>, <code>0</code>, e <code>$</code> come segnaposto per rispettivamente lettere minuscole o maiuscole,
            numeri e simboli scelti casualmente. Usa <code>-</code> per separare uno o più segnaposto che generaranno singoli caratteri.
          </span>
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

      <div class="form-control w-full" v-if="format.includes('$') && expertMode">
        <label class="label">
          <span class="label-text font-bold">Simboli personalizzati:</span>
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

      <div v-if="generatedStrings.length > 0">
        <div class="flex gap-2 mt-2 flex-wrap items-stretch">
          <button
            @click="copyAllToClipboard"
            class="btn btn-sm flex-1"
          >
            Copia Tutto
          </button>
          <button @click="exportToTxt" class="btn btn-secondary btn-sm flex-1">
            Esporta .txt
          </button>
          <button
            @click="showPdfOptions = !showPdfOptions"
            class="btn btn-secondary btn-sm flex-1"
            :class="{ 'btn-active': showPdfOptions }"
          >
            Esporta PDF...
          </button>
        </div>

        <!-- PDF Options Panel -->
        <div v-if="showPdfOptions" class="mt-2 p-4 bg-base-200 rounded-lg border border-primary">
          <h3 class="font-bold mb-3">Esporta PDF 🚧</h3>
          <p class="text-sm"> L'esportazione del PDF è ancora sperimentale. Selezionando la modalità expert puoi regolare alcune impostazioni o lasciare quelle predefinte che sono quelle raccomandate.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Orientation -->
            <div class="form-control md:col-span-2"  v-if="expertMode">
              <label class="label">
                <span class="label-text font-bold">Orientamento</span>
              </label>
              <span class="text-xs p-1 mb-2"> In modalità verticale (predefinto) la carta sarà da rifilare nella parte bassa per creare un quadrato che può essere piegato in due. In modalità orizzontale sarà sufficiente piegare il foglio in due per la parte lunga e ottenere così l'alce.</span>
              <select v-model="pdfOptions.orientation" class="select select-bordered select-sm">
                <option value="portrait">Verticale</option>
                <option value="landscape">Orizzontale</option>
              </select>
             
            </div>

            <!-- Font Family -->
            <div class="form-control"  v-if="expertMode">
              <label class="label">
                <span class="label-text font-bold">Font </span>
              </label>
              <select v-model="pdfOptions.fontFamily" class="select select-bordered select-sm">
                <option value="helvetica">Helvetica</option>
                <option value="times">Times</option>
                <option value="courier">Courier</option>
              </select>
            </div>

            <!-- Font Size -->
            <div class="form-control"  v-if="expertMode">
              <label class="label">
                <span class="label-text font-bold">Dimensione font <span class="font-normal" v-if="pdfOptions.fontSize != defaultfontSize">
                 (default: {{ defaultfontSize }})</span>  
                </span>
              </label>
              <input
                v-model.number="pdfOptions.fontSize"
                type="number"
                class="input input-bordered input-sm"
              />
            </div>

            <!-- Font Style -->
            <div class="form-control"  v-if="expertMode">
              <label class="label">
                <span class="label-text font-bold">Stile font</span>
              </label>
              <select v-model="pdfOptions.fontStyle" class="select select-bordered select-sm">
                <option value="normal">Normale</option>
                <option value="bold">Grassetto</option>
                <option value="italic">Corsivo</option>
                <option value="bolditalic">Grassetto Corsivo</option>
              </select>
            </div>

            <!-- Multiple per page
            <div class="form-control"  v-if="expertMode">
              <label class="label">
                <span class="label-text font-bold">Elementi per pagina</span>
              </label>
              <input
                v-model.number="pdfOptions.itemsPerPage"
                @change="pdfOptions.fontSize = pdfOptions.itemsPerPage > 1 ? int(pdfOptions.fontSize / pdfOptions.itemsPerPage)  : defaultfontSize"
                type="number"
                min="1"
                max="8"
                class="input input-bordered input-sm"
              />
            </div> -->
          </div>

          <button
            @click="exportToPdf"
            class="btn btn-accent btn-sm w-full mt-4"
            :disabled="generatedStrings.length === 0"
          >
            Genera PDF
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
import { ref, computed, onMounted } from "vue";

// Reactive data
const count = ref(50);
const format = ref("M-0-M");
const customSymbols = ref("!@#$%&*");
const generatedStrings = ref([]);
const expertMode = ref(useCookie("expertMode") || false);
const separator = ref("");
const showPdfOptions = ref(false);


const defaultfontSize = ref((- 35 * format.value.split("-").length + 320)); // Default font size based on format length and items per page


// PDF Options
const pdfOptions = ref({
  orientation: 'portrait',
  textPosition: 'center',
  fontFamily: 'helvetica',
  fontSize: defaultfontSize.value,
  fontStyle: 'bold',
  //itemsPerPage: 1,
  //debugLines: false
});

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

  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const filename = `alci_${dateStr}_${generatedStrings.value.length}.txt`;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

const exportToPdf = async() => {
  // Create a new jsPDF instance with custom options
  if (typeof window === 'undefined') return; // SSR guard
  if (!jsPDFInstance) {
    await loadJsPDF().catch((err) => {
      console.error("Failed to load jsPDF", err);
      return;
    });
  }

  if (!jsPDFInstance || generatedStrings.value.length === 0) return;
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: pdfOptions.value.orientation,
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdfOptions.value.orientation === 'landscape' ? 297 : 210;
  const pageHeight = pdfOptions.value.orientation === 'landscape' ? 210 : 297;
  
  const margin = 10; //mm
  const lineHeight = pdfOptions.value.fontSize /  2.835 * 0.8;

  
  doc.setFont(pdfOptions.value.fontFamily, pdfOptions.value.fontStyle);
  doc.setFontSize(pdfOptions.value.fontSize);
  
  
  generatedStrings.value.forEach((str, index) => {
    
    const yPosition = margin + lineHeight;
    
    let xPosition;
    const textWidth = doc.getTextWidth(str);
    xPosition = (pageWidth - textWidth) / 2;
  
    
    doc.text(str, xPosition, yPosition);
    doc.addPage();

   
  });

  // Save the PDF
  // Compose filename:  alci _ current date _ number of alci
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const filename = `alci_${dateStr}_${generatedStrings.value.length}.pdf`;
  doc.save(filename);
};

let jsPDFInstance = null;

const loadJsPDF = () => {
  if (typeof window === 'undefined') return Promise.resolve(); // SSR guard
  if (window.jspdf && window.jspdf.jsPDF) {
    jsPDFInstance = window.jspdf.jsPDF;
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = () => {
      if (window.jspdf && window.jspdf.jsPDF) {
        jsPDFInstance = window.jspdf.jsPDF;
        resolve();
      } else {
        reject(new Error('jsPDF failed to load'));
      }
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

onMounted(() => {
  loadJsPDF().catch(console.error);
});

</script>


<style scoped>
code {
  font-family: monospace;
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>