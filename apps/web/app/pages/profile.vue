<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-900">Account Settings</h1>
      <p class="text-slate-500">Manage your personal information and security preferences.</p>
    </div>

    <!-- Profile Card -->
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div class="p-8">
        <div class="flex flex-col md:flex-row gap-8 items-start">
          <!-- Avatar Section -->
          <div class="flex-shrink-0">
            <div
              class="h-24 w-24 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-100">
              {{ user?.email.substring(0, 2).toUpperCase() }}
            </div>
          </div>

          <!-- Info Section -->
          <div class="flex-1 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email
                  Address</label>
                <p class="text-slate-900 font-medium">{{ user?.email }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Account
                  Role</label>
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {{ user?.role }}
                </span>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Member
                  Since</label>
                <p class="text-slate-900 font-medium">
                  {{ user ? new Date(user.created).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year:
                  'numeric' }) : '...' }}
                </p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                <div class="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="bg-slate-50 px-8 py-4 border-t border-slate-200 flex justify-between items-center">
        <p class="text-xs text-slate-500">
          Your unique identifier: <span class="font-mono">{{ user?.id }}</span>
        </p>
        <AppButton variant="ghost" class="text-xs" @click="addToast('Contact your admin to change email', 'info')">
          Request Changes
        </AppButton>
      </div>
    </div>

    <!-- Security Section (Showcase only) -->
    <div class="mt-8 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
      <div class="flex items-center gap-4 mb-6">
        <div class="p-2 bg-slate-100 rounded-lg text-slate-600">
          <Icon name="heroicons:shield-check" class="w-6 h-6" />
        </div>
        <h2 class="text-lg font-bold text-slate-900">Security & Privacy</h2>
      </div>
      <p class="text-sm text-slate-600 mb-6">
        Authenticated sessions are managed via secure JWT tokens with 1-hour expiration, following UK cybersecurity
        standards.
      </p>
      <div class="flex gap-4">
        <AppButton variant="primary" disabled>Change Password</AppButton>
        <AppButton variant="ghost" disabled>Enable 2FA</AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { getMe } = useUsers()
  const { addToast } = useToast()

  const { data: user, pending, error } = await getMe()

  if (error.value) {
    addToast('Failed to load profile data', 'error')
  }
</script>