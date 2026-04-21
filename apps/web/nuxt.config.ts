// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
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
