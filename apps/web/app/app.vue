<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
    <NuxtPage />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
  useHead({
    title: 'Enterprise Dashboard | UK Market Showcase',
    meta: [
      { name: 'description', content: 'Modern Fullstack Monorepo with Nuxt 4 and NestJS' }
    ]
  })
</script>

<style>
  body {
    @apply bg-gray-50;
  }
</style>