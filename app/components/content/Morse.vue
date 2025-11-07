<template>
<div class="card not-prose lg:float-right my-5 lg:m-5 w-full lg:w-96 bg-neutral">
  <div class="card-body">
    <h2 class="card-title">Traduttore Morse</h2>
    <p>Scrivi un messaggio qui sotto per tradurlo! Puoi anche tradurre direttamente dal codice morse, separando le lettere con <strong>/</strong> e le parole con <strong>//</strong>.</p>
    <textarea
      class="textarea w-full textarea-bordered bg-base-200 h-24 font-[monospace]"
      placeholder="Messaggio (SOS)"
      v-model="mex_text"
      @input="text2morse()"
    ></textarea>
    <textarea
      class="textarea w-full textarea-bordered bg-base-200 h-24 font-[monospace]"
      placeholder="Codice Morse (... / --- / ...)"
      v-model="mex_morse"
      @input="morse2text()"
    ></textarea>
  </div>
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
  "//": " "
};

function text2morse() {
  mex_text.value = mex_text.value
    .toUpperCase()
    .replace(/[^ A-Z0-9]/g, "")
    .replace(/  +/g, " ");

  
  var morseWords = []
  mex_text.value.split(" ").forEach((word) => {
    let str = [];
    word.split("").forEach((letter)=>{
      str.push(morseDict[letter]);
    })
    morseWords.push(str.join(' / '))
  });
  mex_morse.value = morseWords.join(' // ');
}

function morse2text() {
  mex_morse.value = mex_morse.value.toUpperCase().replace(/[^ \n./-]/g, "");
  
  var textWords = []
  mex_morse.value.split("//").forEach((word) => {
    let str = [];
    word.split('/').forEach((letter)=>{
      if (letter.trim() in morseDict) {
      str.push(morseDict[letter.trim()]);
      }else{
        str.push('?')
      }
    })
    textWords.push(str.join(""))
  });

  mex_text.value = textWords.join(" ");
}
</script>
