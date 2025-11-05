import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  plugins: [typography, daisyui],

  safelist: [{ pattern: /bg-(lc|rs|eg|cc)/ }],
};
