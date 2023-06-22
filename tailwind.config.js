/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")], //Make sure you require daisyui AFTER @tailwindcss/typography
  daisyui: {
    themes: ["cupcake"],
  },
}

