<template>
  <div class="flex min-h-screen bg-slate-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full">
      <div class="p-6 flex items-center gap-3">
        <div class="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">E</div>
        <span class="text-white font-semibold text-lg tracking-tight">Enterprise</span>
      </div>

      <nav class="flex-1 px-4 space-y-2 mt-4">
        <NuxtLink to="/dashboard"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-slate-800 hover:text-white"
          active-class="bg-slate-800 text-white border-l-4 border-indigo-500">
          <Icon name="heroicons:squares-2x2" class="w-5 h-5" />
          <span class="text-sm font-medium">Dashboard Overview</span>
        </NuxtLink>

        <NuxtLink to="/users"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-slate-800 hover:text-white"
          active-class="bg-slate-800 text-white border-l-4 border-indigo-500">
          <Icon name="heroicons:users" class="w-5 h-5" />
          <span class="text-sm font-medium">User Management</span>
        </NuxtLink>
      </nav>

      <!-- Logout Section -->
      <div class="p-4 border-t border-slate-800">
        <button @click="handleLogout"
          class="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
          <Icon name="heroicons:arrow-left-on-rectangle" class="w-5 h-5" />
          <span class="text-sm font-medium">Sign Out</span>
        </button>
      
        <div class="mt-4 px-4 py-3 text-[10px] uppercase tracking-widest font-semibold text-slate-500">
          UK Market v1.0
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 ml-64 min-h-screen">
      <!-- Top Bar -->
      <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-8 sticky top-0 z-30">
        <div class="flex items-center gap-4">
          <span class="text-sm text-slate-500">Welcome, **Senior Dev**</span>
          <div class="h-8 w-8 rounded-full bg-slate-200 border border-slate-300"></div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  const { logout } = useAuth()
  const { addToast } = useToast()

  const handleLogout = () => {
    logout()
    addToast('Signed out successfully. See you soon!', 'info')
  }
</script>