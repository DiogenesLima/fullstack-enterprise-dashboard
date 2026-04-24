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
    
      <div class="bg-white border border-slate-200 rounded-xl shadow-sm">
        <div class="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 class="font-bold text-slate-800">Recent Signups</h3>
          <NuxtLink to="/users" class="text-sm text-indigo-600 hover:underline">View all</NuxtLink>
        </div>
      
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <tbody class="divide-y divide-slate-100">
              <tr v-for="user in recentUsers" :key="user.id" class="hover:bg-slate-50 transition">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                      {{ user.email[0].toUpperCase() }}
                    </div>
                    <span class="text-sm font-medium text-slate-700">{{ user.email }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-xs text-slate-400">
                  {{ new Date(user.created).toLocaleDateString('en-GB') }}
                </td>
                <td class="px-6 py-4 text-right">
                  <span
                    class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border border-slate-200 text-slate-500">
                    {{ user.role }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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

  const { data: recentUsers } = await useFetch < UserResponse[] > ('/analytics/recent-users', {
    baseURL: config.public.apiBase,
  });
</script>