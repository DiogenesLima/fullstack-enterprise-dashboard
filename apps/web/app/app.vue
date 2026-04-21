<template>
  <div class="p-8 font-sans">
    <h1 class="text-2xl font-bold mb-4">User Profile (UK Market Showcase)</h1>

    <!-- 1. Loading state -->
    <div v-if="pending" class="text-blue-600">
      Fetching data from NestJS API...
    </div>

    <!-- 2. Error state -->
    <div v-else-if="error" class="text-red-600 p-4 border border-red-200 rounded">
      <p>Error connecting to Backend: {{ error.message }}</p>
      <button @click="refresh" class="mt-2 text-sm underline">Try again</button>
    </div>

    <!-- 3. Data display (Success) -->
    <div v-else-if="user" class="bg-white shadow rounded-lg p-6 border border-gray-100">
      <ul class="space-y-3">
        <li><strong>ID:</strong> {{ user.id }}</li>
        <li><strong>Email:</strong> {{ user.email }}</li>
        <li>
          <strong>Role:</strong>
          <span class="px-2 py-1 text-xs rounded bg-green-100 text-green-800 uppercase">
            {{ user.role }}
          </span>
        </li>
        <li class="text-gray-500 text-sm">
          <strong>Created at:</strong> {{ new Date(user.created).toLocaleDateString('en-GB') }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { UserResponse } from '@enterprise/api-contracts'

  const config = useRuntimeConfig()

  const {
    data: user,
    pending,
    error,
    refresh
  } = await useFetch < UserResponse > ('/users/profile', {
    baseURL: config.public.apiBase,

    onResponseError({ response }) {
      console.error('API Error:', response.statusText)
    }
  })
</script>