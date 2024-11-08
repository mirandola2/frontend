// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindConfig from "./tailwind.config"

export default defineNuxtConfig({
  image: {
    provider: 'ipx', // IPX proxy server for images
  },
  experimental: { appManifest: false },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [{name: 'theme-color', content: '#462678'}],
    }
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image'],
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