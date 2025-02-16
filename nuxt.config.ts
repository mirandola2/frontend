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
    '@nuxt/fonts',
    '@nuxtjs/sitemap'
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
  },

  image: {
    provider: 'weserv',
    weserv: {
      baseURL: 'http://assets.mirandola2.it/',
      modifiers: { withoutEnlargement: 'false' },
      
    }
  
  },

  compatibilityDate: '2024-11-11'
})