<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">User Management</h1>
      <button @click="showForm = !showForm"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
        {{ showForm ? 'Close' : 'Add New User' }}
      </button>

      <!-- Search Bar -->
      <div class="relative w-64">
        <Icon :name="pending ? 'heroicons:arrow-path' : 'heroicons:magnifying-glass'"
          :class="['absolute left-3 top-2.5 w-5 h-5', pending ? 'text-indigo-600 animate-spin' : 'text-slate-400']" />
        <input v-model="searchTerm" type="text" placeholder="Search by email..."
          class="pl-10 pr-4 py-2 w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
      </div>
    </header>

    <!-- Creation Form -->
    <div v-if="showForm" class="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <form @submit.prevent="handleCreate" class="flex gap-4 items-end">
        <!-- Email -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input v-model="form.email" type="email" required placeholder="example@uk-market.com"
            class="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        <!-- Password -->
        <div class="flex-1 w-full">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="form.password" type="password" required
            class="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Min. 8 characters" />
        </div>
        <!-- Role -->
        <div class="w-full lg:w-40">
          <label class="block text-sm font-medium text-slate-700 mb-1">Role</label>
          <select v-model="form.role"
            class="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" :disabled="loading"
          class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50">
          {{ loading ? 'Saving...' : 'Save User' }}
        </button>
      </form>
      <p v-if="errorMessage" class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
    </div>

    <!-- Pagination -->
    <AppPagination v-if="data?.items.length" :type="'users'" :current-page="page" :total-pages="data.pages" :total-items="data.total"
      :loading="pending" @change="(newPage) => page = newPage" />

    <!-- User List Table -->
    <div class="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
      <table :class="{ 'opacity-50': pending }" class="w-full text-left">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Created At</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <template v-if="data?.items.length > 0">
            <tr v-for="user in data?.items" :key="user.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 text-sm text-gray-900">{{ user.email }}</td>
              <td class="px-6 py-4">
                <span
                  :class="['inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border', user.role === 'admin' ? roleStyles.admin : roleStyles.user]">
                  <span :class="['h-1.5 w-1.5 rounded-full', user.role === 'admin' ? 'bg-indigo-500' : 'bg-slate-400']"></span>
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ new Date(user.created).toLocaleDateString('en-GB') }}
              </td>
              <td class="px-6 py-4 text-sm">
                <AppButton variant="danger" class="text-red-600 hover:text-red-800" :loading="isDeleting === user.id"
                  @click="openDeleteModal(user.id)">
                  Delete
                </AppButton>
              </td>
            </tr>
          </template>
          <tr v-else-if="!pending">
            <td colspan="4" class="px-6 py-12 text-center">
              <div class="flex flex-col items-center justify-center">
                <div class="p-3 bg-slate-100 rounded-full mb-4">
                  <Icon name="heroicons:magnifying-glass" class="w-8 h-8 text-slate-400" />
                </div>
                <h3 class="text-sm font-semibold text-slate-900">No users found</h3>
                <p class="text-sm text-slate-500 mt-1">
                  We couldn't find any users matching "{{ searchTerm }}".
                </p>
                <AppButton variant="ghost" class="mt-4 text-indigo-600" @click="searchTerm = ''">
                  Clear search
                </AppButton>
              </div>
            </td>
          </tr>
          <template v-else>
            <tr v-for="i in 5" :key="i" class="animate-pulse">
              <td class="px-6 py-4">
                <div class="h-4 bg-slate-200 rounded w-3/4"></div>
              </td>
              <td class="px-6 py-4">
                <div class="h-4 bg-slate-200 rounded w-1/2"></div>
              </td>
              <td class="px-6 py-4">
                <div class="h-4 bg-slate-200 rounded w-2/3"></div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="h-4 bg-slate-200 rounded w-1/4 ml-auto"></div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <AppPagination v-if="data?.items.length" :type="'users'" :current-page="page" :total-pages="data.pages"
      :total-items="data.total" :loading="pending" @change="(newPage) => page = newPage" />

    <!-- Deletion Confirmation Modal -->
    <AppModal v-model="isModalOpen">
      <template #icon>
        <div
          class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <span class="text-red-600 font-bold">!</span>
        </div>
      </template>
    
      <template #title>Confirm Deletion</template>
    
      <template #description>
        Are you sure you want to delete this user? This action cannot be undone and will permanently remove the data from
        our servers.
      </template>
    
      <template #actions>
        <AppButton variant="danger" :loading="isDeleting === userIdToDelete" @click="confirmDelete">
          Delete User
        </AppButton>
        <AppButton variant="ghost" @click="isModalOpen = false">
          Cancel
        </AppButton>
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
  const searchTerm = ref('')
  const page = ref(1)

  const roleStyles = {
    admin: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    user: 'bg-slate-100 text-slate-700 border-slate-200'
  }
  
  const { addToast } = useToast()
  const { fetchUsers, createUser } = useUsers()
  
  const { data, refresh, pending } = await fetchUsers(() => searchTerm.value, page)

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  watch(searchTerm, (newValue) => {
    page.value = 1
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      const result = await refresh()
    }, 300) // 300ms delay for debouncing
  })

  const showForm = ref(false)
  const loading = ref(false)
  const errorMessage = ref('')
  const form = reactive({
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user'
  })

  const handleCreate = async () => {
    loading.value = true
    errorMessage.value = ''
    try {
      await createUser(form)
      form.email = ''
      form.password = ''
      form.role = 'user'
      showForm.value = false
      addToast('User created successfully!', 'success')
      await refresh()
    } catch (e: any) {
      addToast(e.data?.message || 'Error creating user', 'error')
    } finally {
      loading.value = false
    }
  }

  const isDeleting = ref < string | null > (null)
  const isModalOpen = ref(false)
  const userIdToDelete = ref < string | null > (null)

  const openDeleteModal = (id: string) => {
    userIdToDelete.value = id
    isModalOpen.value = true
  }

  const confirmDelete  = async () => {
    if (!userIdToDelete.value) return

    const id = userIdToDelete.value
    isDeleting.value = id

    try {
      const { deleteUser } = useUsers()
      await deleteUser(id)
      addToast('User deleted forever.', 'success')

      await refresh()
      isModalOpen.value = false

    } catch (e: any) {
      const message = e.data?.message || 'Failed to delete user'
      addToast(message, 'error')
      console.error('Delete error:', e)
    } finally {
      isDeleting.value = null
      userIdToDelete.value = null
    }
  }
</script>