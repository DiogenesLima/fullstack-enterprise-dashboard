// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxtjs/i18n'
  ],

  icon: {
    serverBundle: 'local'
  },

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-GB', file: 'en-GB.json', name: 'English' },
      { code: 'pt', iso: 'pt-BR', file: 'pt-BR.json', name: 'Português' },
      { code: 'es', iso: 'es-ES', file: 'es-ES.json', name: 'Español' }
    ],
    lazy: true,
    langDir: '../app/locales/',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    skipSettingLocaleOnNavigate: false,
    detectBrowserLanguage: false, 
  },

  build: {
    transpile: ['@enterprise/api-contracts']
  },
  vite: {
    server: {
      fs: {
        allow: ['../../packages/api-contracts']
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api/v1'
    }
  },
  devtools: { enabled: true }
})
