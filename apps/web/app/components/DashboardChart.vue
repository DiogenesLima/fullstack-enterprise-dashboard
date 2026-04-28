<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
      {{ $t('charts.user_distribution') }}
    </h3>
    <div class="h-[300px]">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Doughnut } from 'vue-chartjs'

  const { t } = useI18n()

  ChartJS.register(ArcElement, Tooltip, Legend)

  const props = defineProps < {
    admins: number,
    users: number
  } > ()

  const chartData = computed(() => ({
    labels: [
      t('charts.labels.admins'),
      t('charts.labels.users')
    ],
    datasets: [{
      backgroundColor: ['#6366f1', '#e2e8f0'],
      hoverBackgroundColor: ['#4f46e5', '#cbd5e1'],
      data: [props.admins, props.users],
      borderWidth: 0,
      cutout: '75%'
    }]
  }))

  const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12, family: 'Inter' }
        }
      }
    }
  }))
</script>