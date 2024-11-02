// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindConfig from "./tailwind.config"

export default defineNuxtConfig({
  experimental: { appManifest: false },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [{name: 'theme-color', content: '#462678'}],
    }
  },
  plugins: [{ src: "~/plugins/simple-analytics.js", ssr: false }],
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
  content: {
    ignores: [
      '/content/index.md',
      'totem'
    ],
    markdown: {
      anchorLinks: false
    },
    documentDriven: true,
  }
})

