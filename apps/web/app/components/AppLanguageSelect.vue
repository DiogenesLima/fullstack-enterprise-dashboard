<template>
  <div class="relative flex items-center">
    <Icon name="heroicons:language" class="absolute left-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
    <select :value="locale" @change="onLocaleChange"
      class="appearance-none bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg pl-8 pr-8 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none cursor-pointer transition-all hover:bg-slate-100">
      <option v-for="lang in locales" :key="lang.code" :value="lang.code">
        {{ lang.code.toUpperCase() }}
      </option>
    </select>
    <!-- Custom Arrow Icon -->
    <Icon name="heroicons:chevron-down" class="absolute right-2 w-3 h-3 text-slate-400 pointer-events-none" />
  </div>
</template>

<script setup lang="ts">
  const { locale, locales, setLocale } = useI18n()

  const onLocaleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    setLocale(target.value)
  }
</script>