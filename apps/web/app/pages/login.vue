<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-xl mb-4 shadow-lg shadow-indigo-200">
          <Icon name="heroicons:lock-closed" class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-slate-900">Enterprise Portal</h1>
        <p class="text-slate-500 text-sm mt-2">Sign in to access your dashboard</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Business Email</label>
          <input v-model="form.email" type="email" required
            class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="admin@enterprise.uk" />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input v-model="form.password" type="password" required
            class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="••••••••" />
        </div>

        <AppButton :loading="loading" class="w-full py-3">
          Sign In
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

  const form = reactive({ email: '', password: '' })
  const loading = ref(false)
  const error = ref('')

  const handleLogin = async () => {
    loading.value = true
    error.value = ""
    try {
      await login(form)
      addToast('Welcome back!', 'success')
    } catch (e: any) {
      error.value = e
      addToast('Authentication failed', 'error')
    } finally {
      loading.value = false
    }
  }
</script>