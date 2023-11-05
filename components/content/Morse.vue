<template>
  <div class="max-w-md mx-auto">
    <textarea
      class="textarea textarea-lg w-full textarea-bordered bg-base-200 h-24"
      placeholder="Messaggio"
      v-model="mex_text"
      @input="text2morse()"
    ></textarea>
    <textarea
      class="textarea textarea-lg w-full textarea-bordered bg-base-200 h-24"
      placeholder="Codice Morse"
      v-model="mex_morse"
      @input="morse2text()"
    ></textarea>
  </div>
</template>

<script setup>
const mex_text = ref();
const mex_morse = ref();

const morseDict = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0",
  " ": " ",
  "/": " "
};

function text2morse() {
  mex_text.value = mex_text.value
    .toUpperCase()
    .replace(/[^A-Z0-9\s\n\r]/g, "")
    .replace(/  +/g, " ");

  var str = [];

  mex_text.value.split("").forEach((letter) => {
    if (letter == " " || letter == "\r" || letter == "\n") {
      str.push("/");
    } else {
      str.push(morseDict[letter]);
    }
  });

  mex_morse.value = str.join(" ");
}

function morse2text() {
  mex_morse.value = mex_morse.value.toUpperCase().replace(/[^ \n./-]/g, "");
  var str = [];

  mex_morse.value.split(" ").forEach((letter) => {
    if (letter in morseDict) {
      str.push(morseDict[letter]);
    }
  });

  mex_text.value = str.join("");
}
</script>
