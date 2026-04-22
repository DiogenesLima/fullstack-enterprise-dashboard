<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">User Management</h1>
      <button @click="showForm = !showForm"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
        {{ showForm ? 'Close' : 'Add New User' }}
      </button>
    </header>

    <!-- Creation Form -->
    <div v-if="showForm" class="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <form @submit.prevent="handleCreate" class="flex gap-4 items-end">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input v-model="form.email" type="email" required placeholder="example@uk-market.com"
            class="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        <button type="submit" :disabled="loading"
          class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50">
          {{ loading ? 'Saving...' : 'Save User' }}
        </button>
      </form>
      <p v-if="errorMessage" class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
    </div>

    <!-- User List Table -->
    <div class="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Created At</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 text-sm text-gray-900">{{ user.email }}</td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 uppercase">
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ new Date(user.created).toLocaleDateString('en-GB') }}
            </td>
            <td class="px-6 py-4 text-sm">
              <AppButton variant="danger" class="text-red-600 hover:text-red-800" :loading="isDeleting === user.id"
                @click="handleDelete(user.id)">
                Delete
              </AppButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { fetchUsers, createUser } = useUsers()
  const { data: users, refresh } = await fetchUsers()

  const showForm = ref(false)
  const loading = ref(false)
  const errorMessage = ref('')
  const form = reactive({ email: '', role: 'user' as const })

  const handleCreate = async () => {
    loading.value = true
    errorMessage.value = ''
    try {
      await createUser(form)
      form.email = ''
      showForm.value = false
      await refresh()
    } catch (e: any) {
      errorMessage.value = e.data?.message || 'Failed to create user'
    } finally {
      loading.value = false
    }
  }

  const isDeleting = ref < string | null > (null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    isDeleting.value = id

    try {
      const { deleteUser } = useUsers()
      await deleteUser(id)

      await refresh()

    } catch (e: any) {
      const message = e.data?.message || 'Failed to delete user'
      alert(message)
      console.error('Delete error:', e)
    } finally {
      isDeleting.value = null
    }
  }
</script>