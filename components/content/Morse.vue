<template>

<div class=" max-w-md mx-auto">
    <textarea class="textarea textarea-lg w-full textarea-bordered bg-base-200 h-24" placeholder="Messaggio" v-model="mex" @input="code = textToMorse(mex)"></textarea>
    <textarea class="textarea textarea-lg w-full textarea-bordered bg-base-200 h-24" placeholder="Codice Morse" v-model="code" @input="mex = morseToText(code)"></textarea>

</div>



</template>

<script setup>

const mex = ref()
const code = ref()


var dot = ".",
  dash = "-",
  divide = " / ",
  newline = "\n";

var morse = {
  a: [dot, dash],
  b: [dash, dot, dot, dot],
  c: [dash, dot, dash, dot],
  d: [dash, dot, dot],
  e: [dot],
  f: [dot, dot, dash, dot],
  g: [dash, dash, dot],
  h: [dot, dot, dot, dot],
  i: [dot, dot],
  j: [dot, dash, dash, dash],
  k: [dash, dot, dash],
  l: [dot, dash, dot, dot],
  m: [dash, dash],
  n: [dash, dot],
  o: [dash, dash, dash],
  p: [dot, dash, dash, dot],
  q: [dash, dash, dot, dash],
  r: [dot, dash, dot],
  s: [dot, dot, dot],
  t: [dash],
  u: [dot, dot, dash],
  v: [dot, dot, dot, dash],
  w: [dot, dash, dash],
  x: [dash, dot, dot, dash],
  y: [dash, dot, dash, dash],
  z: [dash, dash, dot, dot],
  1: [dot, dash, dash, dash, dash],
  2: [dot, dot, dash, dash, dash],
  3: [dot, dot, dot, dash, dash],
  4: [dot, dot, dot, dot, dash],
  5: [dot, dot, dot, dot, dot],
  6: [dash, dot, dot, dot, dot],
  7: [dash, dash, dot, dot, dot],
  8: [dash, dash, dash, dot, dot],
  9: [dash, dash, dash, dash, dot],
  0: [dash, dash, dash, dash, dash],
  space: [divide],
  return: [newline],
  
};

function textToMorse(str) {
  var chars = str
      .toLowerCase()
      .replace(/[^a-z0-9\s\n\r]/g, "")
      .replace(/  +/g, " ")
      .split(""),
    morsecode = [];

  for (let i = 0; i < chars.length; i++) {
    if (chars[i] == " ") {
      morsecode.push(morse.space.join(""));
    } else if (chars[i] == "\r" || chars[i] == "\n") {
      morsecode.push(morse.return.join(""));
    } else {
      morsecode.push(morse[chars[i]].join(""));
    }
  }

  return morsecode.join(" ");
}

function morseToText(str) {
  var chars = str
      .toLowerCase()
      .replace(/[^a-z0-9\s\n\r]/g, "")
      .replace(/  +/g, " ")
      .split(""),
    morsecode = [];

  for (let i = 0; i < chars.length; i++) {
    if (chars[i] == " ") {
      morsecode.push(morse.space.join(""));
    } else if (chars[i] == "\r" || chars[i] == "\n") {
      morsecode.push(morse.return.join(""));
    } else {
      morsecode.push(morse[chars[i]].join(""));
    }
  }

  return morsecode.join(" ");
}
</script>
