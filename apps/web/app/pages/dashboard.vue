<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-900 mb-8">System Overview</h1>

    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      <div v-for="i in 3" :key="i" class="h-32 bg-slate-200 rounded-xl"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Card: Total Users -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <div class="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <Icon name="heroicons:users" class="w-6 h-6" />
          </div>
          <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Live</span>
        </div>
        <p class="text-sm font-medium text-slate-500">Total Users</p>
        <h3 class="text-3xl font-bold text-slate-900">{{ data?.totalUsers }}</h3>
      </div>

      <!-- Card: Admins -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <div class="p-2 bg-purple-50 rounded-lg text-purple-600">
            <Icon name="heroicons:shield-check" class="w-6 h-6" />
          </div>
        </div>
        <p class="text-sm font-medium text-slate-500">Administrators</p>
        <h3 class="text-3xl font-bold text-slate-900">{{ data?.totalAdmins }}</h3>
      </div>

      <!-- Card: Last Signup -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <Icon name="heroicons:bolt" class="w-6 h-6" />
          </div>
        </div>
        <p class="text-sm font-medium text-slate-500">Latest Entry</p>
        <h3 class="text-lg font-bold text-slate-900 truncate" :title="data?.lastSignup">
          {{ data?.lastSignup }}
        </h3>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DashboardChart v-if="data" :admins="data.totalAdmins" :users="data.totalUsers - data.totalAdmins" />
    
      <div class="bg-indigo-600 rounded-xl p-8 text-white flex flex-col justify-center">
        <h2 class="text-2xl font-bold mb-2">UK Market Ready</h2>
        <p class="opacity-80">This dashboard demonstrates real-time data aggregation from a PostgreSQL database using Prisma
          7 and NestJS.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { token } = useAuth()
  const config = useRuntimeConfig()

  const { data, pending } = await useFetch < any > ('/analytics/overview', {
    baseURL: config.public.apiBase,
    headers: { Authorization: `Bearer ${token.value}` }
  })
</script>