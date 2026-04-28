<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div class="absolute top-4 right-4 sm:top-8 sm:right-8">
      <AppLanguageSelect />
    </div>

    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-xl mb-4 shadow-lg shadow-indigo-200">
          <Icon name="heroicons:lock-closed" class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-slate-900">{{ t('pages.login.title') }}</h1>
        <p class="text-slate-500 text-sm mt-2">{{ t('pages.login.subtitle') }}</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">{{ t('pages.login.email_label') }}</label>
          <input v-model="form.email" type="email" required
            class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            :placeholder="t('pages.login.email_placeholder')" />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">{{ t('pages.login.password_label') }}</label>
          <input v-model="form.password" type="password" required
            class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="••••••••" />
        </div>

        <AppButton :loading="loading" class="w-full py-3">
          {{ t('pages.login.sign_in') }}
        </AppButton>

        <p v-if="error" class="text-center text-sm text-red-600 font-medium bg-red-50 py-2 rounded-lg animate-pulse">
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({ layout: false })

  const { login } = useAuth()
  const { addToast } = useToast()
  const { t } = useI18n()

  const form = reactive({ email: '', password: '' })
  const loading = ref(false)
  const error = ref('')

  const handleLogin = async () => {
    loading.value = true
    error.value = ""
    try {
      await login(form)
      addToast(t('pages.login.messages.login_success'), 'success')
    } catch (e: any) {
      error.value = e
      addToast(t('pages.login.messages.login_error'), 'error')
    } finally {
      loading.value = false
    }
  }
</script>