/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    //"./node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}",
    //"./node_modules/flowbite/**/*.js"
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"), //Make sure you require daisyui AFTER @tailwindcss/typography
    //require('flowbite/plugin')
  ],
    daisyui: {
    themes: ["cupcake"],
  },
}

