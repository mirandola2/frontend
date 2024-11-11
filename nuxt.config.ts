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
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts'
  ],
  fonts: {
    defaults: {
      weights: [400, 700],
      styles: ['normal', 'italic'],
      subsets: [
        'latin'
      ]
    },
  },
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