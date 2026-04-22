<template>
  <button :disabled="disabled || loading" :class="[
      'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses[variant]
    ]">
    <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
      </path>
    </svg>

    <slot />
  </button>
</template>

<script setup lang="ts">
  interface Props {
    variant?: 'primary' | 'danger' | 'success' | 'ghost';
    loading?: boolean;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps < Props > (), {
    variant: 'primary',
    loading: false,
    disabled: false
  })

  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-200'
  }
</script>