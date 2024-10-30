import typography from "@tailwindcss/typography"
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [
    typography,
    daisyui, //Make sure you require daisyui AFTER @tailwindcss/typography
    //require('flowbite/plugin')
  ],
  whitelistPatterns: [
    {
      pattern: /bg-[lc | rs | eg | cc]/,
    },
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
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
    },
    colors: {
      lc: "#FFBE0A", //"#FDC500",
      eg: "#559928", //#21A067",
      rs: "#E84C3E", //"#E84C3E",
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
          "base-100": "#ffffff", //"#ECE9E6",
          "base-content": "#000",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
