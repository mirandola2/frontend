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
          @change="resetStrings"
          placeholder="50"
          class="input input-bordered w-full bg-base-200"
        />
      </div>

      <div class="form-control w-full flex flex-row items-center gap-2">
        <label class="label cursor-pointer">
          <span class="label-text">Modalità Expert 🧙</span>
          <input
            type="checkbox"
            v-model="expertMode"
            class="toggle toggle-secondary toggle-md ml-2"
          />
        </label>
      </div>
      <div class="form-control w-full" v-if="expertMode">
        <label class="label">
          <span class="label-text">
            Pattern: usa <code>m</code>, <code>M</code>, <code>0</code>, e
            <code>$</code> come segnaposto per rispettivamente lettere minuscole
            o maiuscole, numeri e simboli scelti casualmente. Usa
            <code>-</code> per separare uno o più segnaposto che generaranno
            singoli caratteri.
          </span>
        </label>
        <input
          v-model="format"
          type="text"
          class="input input-bordered w-full bg-base-200 font-[monospace]"
          @change="resetStrings"
        />
        <label class="label">
          <span class="label-text">Separatore</span>
        </label>
        <input
          v-model="separator"
          type="text"
          placeholder="(nessuno)"
          class="input input-bordered w-full bg-base-200 font-[monospace]"
          @change="resetStrings"
        />
      </div>

      <div
        class="form-control w-full"
        v-if="format.includes('$') && expertMode"
      >
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
          <button @click="copyAllToClipboard" class="btn btn-sm flex-1">
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
        <div
          v-if="showPdfOptions"
          class="mt-2 p-4 bg-base-200 rounded-lg border border-primary"
        >
          <h3 class="font-bold mb-3">Esporta PDF 🚧</h3>
          <p class="text-sm mb-4">
            L'esportazione del PDF è ancora sperimentale. Selezionando la
            modalità expert puoi regolare alcune impostazioni o lasciare quelle
            predefinte che sono quelle raccomandate.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Orientation -->
            <div class="form-control md:col-span-2" v-if="expertMode">
              <label class="label">
                <span class="label-text font-bold">Orientamento</span>
              </label>
              <span class="text-xs p-1 mb-2">
                In modalità verticale (predefinto) la carta sarà da rifilare
                nella parte bassa per creare un quadrato che può essere piegato
                in due. In modalità orizzontale sarà sufficiente piegare il
                foglio in due per la parte lunga e ottenere così l'alce.</span
              >
              <select
                v-model="pdfOptions.orientation"
                class="select select-bordered select-sm"
              >
                <option value="portrait">Verticale</option>
                <option value="landscape">Orizzontale</option>
              </select>
            </div>

            <!-- Font Family -->
            <div class="form-control" v-if="expertMode">
              <label class="label">
                <span class="label-text font-bold">Font </span>
              </label>
              <select
                v-model="pdfOptions.fontFamily"
                class="select select-bordered select-sm"
              >
                <option value="helvetica">Helvetica</option>
                <option value="times">Times</option>
                <option value="courier">Courier</option>
              </select>
            </div>

            <!-- Font Size -->
            <div class="form-control" v-if="expertMode">
              <label class="label">
                <span class="label-text font-bold"
                  >Dimensione font
                  <span
                    class="font-normal"
                    v-if="pdfOptions.fontSize != defaultfontSize"
                  >
                    (default: {{ defaultfontSize }})</span
                  >
                </span>
              </label>
              <input
                v-model.number="pdfOptions.fontSize"
                type="number"
                class="input input-bordered input-sm"
              />
            </div>

            <!-- Font Size -->
            <div class="form-control" v-if="expertMode">
              <label class="label">
                <span class="label-text font-bold"
                  >Margine
                  <span
                    class="font-normal"
                    v-if="pdfOptions.margin != defaultmargin"
                  >
                    (default: {{ defaultmargin }})</span
                  >
                </span>
              </label>
              <input
                v-model.number="pdfOptions.margin"
                type="number"
                class="input input-bordered input-sm"
              />
            </div>

            <!-- Font Style -->
            <div class="form-control" v-if="expertMode">
              <label class="label">
                <span class="label-text font-bold">Stile font</span>
              </label>
              <select
                v-model="pdfOptions.fontStyle"
                class="select select-bordered select-sm"
              >
                <option value="normal">Normale</option>
                <option value="bold">Grassetto</option>
                <option value="italic">Corsivo</option>
                <option value="bolditalic">Grassetto Corsivo</option>
              </select>
            </div>
          </div>

          <!-- Color Controls (PDF only) -->
          <div class="form-control w-full mt-4" v-if="expertMode">
            <label class="label">
              <span class="label-text font-bold">Colore testo PDF:</span>
            </label>
            <div class="flex gap-2 items-center">
              <input
                v-model="textColor"
                type="text"
                placeholder="255,0,0 o #FF0000"
                class="input input-bordered input-sm flex-1 bg-base-200 font-[monospace]"
                @input="updateColorFromInput"
              />
              <input
                v-model="colorHex"
                type="color"
                class="w-12 h-12 border-2 border-base-300 rounded-full cursor-pointer"
                @input="updateColorFromWheel"
              />
            </div>
          </div>

          <!-- Image Upload (PDF only) -->
          <div class="form-control w-full mt-4" v-if="expertMode">
            <label class="label">
              <span class="label-text font-bold">Logo (opzionale):</span>
            </label>
            <span class="text-xs p-1 mb-2">
              L'immagine apparirà sotto il testo nel PDF, mantenendo le
              proporzioni originali
            </span>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              @change="handleImageUpload"
              class="file-input file-input-bordered file-input-sm w-full bg-base-200"
            />
          </div>



          <div
            v-if="uploadedImage && expertMode"
            class="mt-2 form-control w-full"
          >
            <label class="label">
              <span class="label-text">Opacità logo:</span>
            </label>
            <input
              v-model.number="imageOpacity"
              type="number"
              min="0"
              max="100"
              class="input input-bordered input-sm"
            />
          </div>

            <div
            v-if="uploadedImage && expertMode"
            class="mt-2 form-control w-full"
            >
            <label class="label">
              <span class="label-text">Posizione logo:</span>
            </label>
            <span class="text-xs p-1 mb-2">Scegliendo "Retro del foglio" la stampa dovrà essere fronte retro e il logo verrà stampato su quello che diventerà l'interno dell'alce. Scegliendo "Sotto il testo" il logo verrà stampato capovolto e sarà a contatto con la fronte.</span>
            <select v-model="pdfOptions.imagePosition" class="select select-bordered select-sm">
              <option value="under">Sotto il testo (ruotato)</option>
              <option value="back">Retro del foglio</option>
            </select>
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
          Alci Generate ({{ generatedStrings.length }})
        </div>
        <div class="grid gap-2 lg:grid-cols-6 grid-cols-3">
          <button
            v-for="(str, index) in generatedStrings"
            :key="index"
            @click="copyToClipboard(str)"
            class="btn btn-sm btn-outline font-[monospace] w-auto min-w-fit max-w-full text-left wrap-break-word"
            title="Copia"
          >
            {{ str }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <Toast v-if="showToast" :message="toastMessage" />

</template>

<script setup>
import { get } from "@vueuse/core";
import { ref, computed, onMounted } from "vue";

// Reactive data
const count = ref(50);
const format = ref("M-0-M");
const customSymbols = ref("!@#$%&*");
const generatedStrings = ref([]);
const expertMode = ref(useCookie("expertMode") || false);
const separator = ref("");
const showPdfOptions = ref(false);

// Color and image controls
const textColor = ref("#000000");
const colorHex = ref("#000000");
const uploadedImage = ref(null);
const imageOpacity = ref(100);

const defaultfontSize = computed(() => -35 * format.value.split("-").length + 320); // Default font size based on format length and items per page
const defaultmargin = computed(() => 10); // Default margin in mm

const resetStrings = () => {
  generatedStrings.value = [];
};

// PDF Options
const pdfOptions = ref({
  orientation: "portrait",
  textPosition: "center",
  fontFamily: "helvetica",
  fontSize: computed(() => defaultfontSize.value),
  fontStyle: "bold",
  imagePosition: "under", // 'under' or 'back'
  margin: 10, // mm
});

// Character sets
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";

// Color handling functions
const updateColorFromInput = () => {
  const input = textColor.value.trim();

  if (input.startsWith("#")) {
    // Hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(input)) {
      colorHex.value = input;
    }
  } else if (input.includes(",")) {
    // RGB format
    const rgb = input.split(",").map((c) => parseInt(c.trim()));
    if (rgb.length === 3 && rgb.every((c) => c >= 0 && c <= 255)) {
      colorHex.value = `#${rgb
        .map((c) => c.toString(16).padStart(2, "0"))
        .join("")}`;
    }
  }
};

const updateColorFromWheel = () => {
  textColor.value = colorHex.value;
};

// Image handling
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

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
  M: uppercaseChars,
  m: lowercaseChars,
  0: digits,
  $: () => customSymbols.value || "!@#$%^&*",
};

const generateString = (formatPattern) => {
  const parts = formatPattern.split("-");
  const result = parts.map((part) => {
    const charsets = Array.from(part).map((char) => {
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
const { toast, toastMessage, showToast } = useToast()

const copyToClipboard = async (text) => {
  try {

    
    await navigator.clipboard.writeText(text);
  } catch (err) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
  toast("Alce Copiata!")

};

const copyAllToClipboard = async () => {
  const allStrings = generatedStrings.value.join("\n");
  await copyToClipboard(allStrings);
};

const getFileName = (extention) => {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  return `alci_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}_${generatedStrings.value.length}.${extention}`;
};

const exportToTxt = () => {
  const content = generatedStrings.value.join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = getFileName("txt");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

const exportToPdf = async () => {
  // Create a new jsPDF instance with custom options
  if (typeof window === "undefined") return; // SSR guard
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
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdfOptions.value.orientation === "landscape" ? 297 : 210;
  const pageHeight = pdfOptions.value.orientation === "landscape" ? 210 : 297;


  const lineHeight = (pdfOptions.value.fontSize / 2.835) * 0.9; //mm;

  doc.setFont(pdfOptions.value.fontFamily, pdfOptions.value.fontStyle);
  doc.setFontSize(pdfOptions.value.fontSize);

  // Convert hex color to RGB for PDF
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgb = hexToRgb(colorHex.value);
  if (rgb) {
    doc.setTextColor(rgb.r, rgb.g, rgb.b);
  }

  // Pre-process image if uploaded
  let processedImageData = null;
  if (uploadedImage.value) {
    try {
      processedImageData = await new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          // Calculate image dimensions maintaining aspect ratio
          const imgWidth = img.width;
          const imgHeight = img.height;
          const aspectRatio = imgWidth / imgHeight;

          // Calculate size to fit within page while maintaining aspect ratio

          // Make image height equal to text height (font size in mm)
          let displayHeight = lineHeight;
          let displayWidth = displayHeight * aspectRatio;

          const imgX = (pageWidth - displayWidth) / 2;

          const imgY = pdfOptions.value.imagePosition == "under" ? pdfOptions.value.margin * 3 + lineHeight : pdfOptions.value.margin; // back or under, if under should be lower than the text

          // Create canvas for opacity processing (no rotation)
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const scale = 4;
            // Set canvas size to fit rotated image (swap width/height for 90deg rotation)
            canvas.width = displayWidth * scale;
            canvas.height = displayHeight * scale;

            ctx.save();
            if (pdfOptions.value.imagePosition == "under") {
              ctx.translate(canvas.width / 2, canvas.height / 2);
              ctx.rotate(Math.PI);
            } else { // back position, no rotation
              ctx.translate(canvas.width / 2, canvas.height / 2);
            }
       
            ctx.scale(scale, scale);
            ctx.globalAlpha = imageOpacity.value / 100;
            ctx.drawImage(
            img,
            -displayWidth / 2,
            -displayHeight / 2,
            displayWidth,
            displayHeight
            );
            ctx.restore();

          // Detect image type
          let imgType = "JPEG";
          if (uploadedImage.value.startsWith("data:image/png")) {
            imgType = "PNG";
          }
          const imgData = canvas.toDataURL(
            imgType === "PNG" ? "image/png" : "image/jpeg"
          );

          resolve({
            imgData,
            imgType,
            width: displayWidth,
            height: displayHeight,
            x: imgX,
            y: imgY, // align image under the text
          });
        };

        img.onerror = reject;
        img.src = uploadedImage.value;
      });
    } catch (err) {
      console.log("Error processing image:", err);
      processedImageData = null;
    }
  }

  // Now generate the PDF pages
  generatedStrings.value.forEach((str, index) => {
    const yPosition = pdfOptions.value.margin + lineHeight;

    // Center text horizontally
    const textWidth = doc.getTextWidth(str);
    const xPosition = (pageWidth - textWidth) / 2;

    // Add text first (so it appears on top)
    doc.text(str, xPosition, yPosition);

    // Add background image if processed successfully (under the text)
    if (processedImageData) {
      try {
        if (pdfOptions.value.imagePosition === "back") {
          doc.addPage();
        }
        doc.addImage(
          processedImageData.imgData,
          processedImageData.imgType,
          processedImageData.x,
          processedImageData.y,
          processedImageData.width,
          processedImageData.height
        );
      } catch (err) {
        console.log("Error adding image to PDF:", err);
      }
    }

    if (index < generatedStrings.value.length - 1) {
      doc.addPage();
    }
  });

  // Save the PDF
  doc.save(getFileName("pdf"));
};

let jsPDFInstance = null;

const loadJsPDF = () => {
  if (typeof window === "undefined") return Promise.resolve(); // SSR guard
  if (window.jspdf && window.jspdf.jsPDF) {
    jsPDFInstance = window.jspdf.jsPDF;
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => {
      if (window.jspdf && window.jspdf.jsPDF) {
        jsPDFInstance = window.jspdf.jsPDF;
        resolve();
      } else {
        reject(new Error("jsPDF failed to load"));
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
input[type="color"] {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0;
}

::-webkit-color-swatch-wrapper {
  padding: 0;
}

::-webkit-color-swatch {
  border: 0;
  border-radius: 0;
}

::-moz-color-swatch,
::-moz-focus-inner {
  border: 0;
}

::-moz-focus-inner {
  padding: 0;
}

.mytoast{
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  z-index: 9999;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

</style>
