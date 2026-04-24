<template>
  <div class="mt-6 flex items-center justify-between border-t border-slate-200 pt-6">
    <div class="hidden sm:block">
      <p class="text-sm text-slate-500 italic">
        Showing page <span class="font-semibold text-slate-700">{{ currentPage }}</span>
        of <span class="font-semibold text-slate-700">{{ totalPages }}</span>
        ({{ totalItems }} total {{ type }})
      </p>
    </div>

    <div class="flex flex-1 justify-between sm:justify-end gap-3">
      <AppButton variant="ghost" :disabled="currentPage <= 1 || loading"
        @click="$emit('change', currentPage - 1)">
        <Icon name="heroicons:chevron-left" class="w-4 h-4 mr-1" />
        Previous
      </AppButton>

      <AppButton variant="ghost" :disabled="currentPage >= totalPages || loading"
        @click="$emit('change', currentPage + 1)">
        Next
        <Icon name="heroicons:chevron-right" class="w-4 h-4 ml-1" />
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps < {
    type: string,
    currentPage: number,
    totalPages: number,
    totalItems: number,
    loading?: boolean
  } > ()

  defineEmits < {
  (e: 'change', page: number): void
}> ()
</script>