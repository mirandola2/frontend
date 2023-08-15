/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"), //Make sure you require daisyui AFTER @tailwindcss/typography
    //require('flowbite/plugin')
  ],
  theme: {
    fontFamily: {
      sans: ["DM Sans", "ui-sans-serif", "system-ui"],
      display: ["Caprasimo", "ui-sans-serif", "system-ui"],
      serif: ['Playfair Display', "ui-serif"]
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '0.5rem',
        md: '0.75rem'
      },
    },
    colors: {
      lc: "#FDC500",
      eg: "#21A067",
      rs: "#E84C3E",
      cc: "#9B66A5",
      white: "#ffffff"
    },
  },
  daisyui: {
    themes: [
      {
        agesci: {
          primary: "#462678",
          secondary: "#6B478D",
          accent: "#AEB0D9",
          neutral: "#E5D6C7",
          "base-100": "#F7F4F0", //"#ECE9E6",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
