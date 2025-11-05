// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindConfig from "./tailwind.config"

export default defineNuxtConfig({
  experimental: { appManifest: false },
  site: { url: 'https://mirandola2.it' } ,

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
  
  image: {
    provider: 'imagekit',
    imagekit: {
      baseURL: 'https://ik.imagekit.io/mir2',
    }
  },

  compatibilityDate: '2025-11-01'
})