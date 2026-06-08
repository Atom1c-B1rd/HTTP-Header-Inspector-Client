// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  ssr:false,
  app:{
    baseURL:'/HTTP-Header-Inspector-Client/'
  },
  nitro: {
    prerender: {
      failOnError: false,
    },
  },
  runtimeConfig:{
    public:{
      apiBase: process.env.NUXT_API_BASE ?? 'http://localhost:8000',
    }
  }
})
