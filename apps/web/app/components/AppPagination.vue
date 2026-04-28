<template>
  <div class="mt-6 flex items-center justify-between border-t border-slate-200 pt-6">
    <div class="hidden sm:block">
      <p class="text-sm text-slate-500 italic">
        {{ $t('pagination.showing', {
        current: currentPage,
        total: totalPages,
        count: totalItems,
        subject: type
        }) }}
      </p>
    </div>

    <div class="flex flex-1 justify-between sm:justify-end gap-3">
      <AppButton variant="ghost" :disabled="currentPage <= 1 || loading"
        @click="$emit('change', currentPage - 1)">
        <Icon name="heroicons:chevron-left" class="w-4 h-4 mr-1" />
        {{ $t('pagination.previous') }}
      </AppButton>

      <AppButton variant="ghost" :disabled="currentPage >= totalPages || loading"
        @click="$emit('change', currentPage + 1)">
        {{ $t('pagination.next') }}
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