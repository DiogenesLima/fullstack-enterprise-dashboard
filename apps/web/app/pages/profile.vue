<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-900">{{ t('pages.profile.title') }}</h1>
      <p class="text-slate-500">{{ t('pages.profile.subtitle') }}</p>
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
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{{ t('pages.profile.labels.email') }}</label>
                <p class="text-slate-900 font-medium">{{ user?.email }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{{ t('pages.profile.labels.role') }}</label>
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {{ user?.role }}
                </span>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{{ t('pages.profile.labels.member_since') }}</label>
                <p class="text-slate-900 font-medium">
                  {{ user ? formatDate(user.created) : '...' }}
                </p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{{ t('pages.profile.labels.status') }}</label>
                <div class="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                  {{ t('pages.profile.labels.active') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="bg-slate-50 px-8 py-4 border-t border-slate-200 flex justify-between items-center">
        <p class="text-xs text-slate-500">
          {{ t('pages.profile.labels.unique_id') }}: <span class="font-mono">{{ user?.id }}</span>
        </p>
        <AppButton variant="ghost" class="text-xs" @click="addToast(t('pages.profile.actions.contact_admin'), 'info')">
          {{ t('pages.profile.actions.request_changes') }}
        </AppButton>
      </div>
    </div>

    <!-- Security Section (Showcase only) -->
    <div class="mt-8 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
      <div class="flex items-center gap-4 mb-6">
        <div class="p-2 bg-slate-100 rounded-lg text-slate-600">
          <Icon name="heroicons:shield-check" class="w-6 h-6" />
        </div>
        <h2 class="text-lg font-bold text-slate-900">{{ t('pages.profile.security.title') }}</h2>
      </div>
      <p class="text-sm text-slate-600 mb-6">
        {{ t('pages.profile.security.description') }}
      </p>
      <div class="flex gap-4">
        <AppButton variant="primary" disabled>{{ t('pages.profile.security.change_password') }}</AppButton>
        <AppButton variant="ghost" disabled>{{ t('pages.profile.security.enable_2fa') }}</AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { getMe } = useUsers()
  const { addToast } = useToast()
  const { t } = useI18n()
  const { formatDate } = useFormatters()
  
  useHead({ title: `${t('pages.profile.title')} | ${t('title')}` })

  const { data: user, pending, error } = await getMe()

  if (error.value) {
    addToast(t('pages.profile.errors.load_fail'), 'error')
  }
</script>