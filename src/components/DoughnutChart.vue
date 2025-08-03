<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Chart,
  ArcElement,
  DoughnutController,
  Tooltip,
  Legend
} from 'chart.js'

// Register Chart.js components
Chart.register(
  ArcElement,
  DoughnutController,
  Tooltip,
  Legend
)

interface Props {
  title: string
  data: number[]
  labels: string[]
  colors?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  colors: () => [
    '#3b82f6', // Blue
    '#10b981', // Green
    '#f59e0b', // Yellow
    '#ef4444', // Red
    '#8b5cf6', // Purple
  ]
})

const chartCanvas = ref<HTMLCanvasElement>()
let chartInstance: Chart | null = null

onMounted(() => {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d')
    if (ctx) {
      chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: props.labels,
          datasets: [
            {
              data: props.data,
              backgroundColor: props.colors,
              borderColor: '#ffffff',
              borderWidth: 3,
              hoverBorderWidth: 4,
              hoverOffset: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%', // Creates the doughnut hole
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle',
                font: {
                  size: 12,
                  weight: 500,
                },
                color: '#374151',
              },
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: true,
              callbacks: {
                label: function(context) {
                  const label = context.label || ''
                  const value = context.parsed
                  const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
                  const percentage = ((value / total) * 100).toFixed(1)
                  return `${label}: ${value} (${percentage}%)`
                },
              },
            },
          },
          elements: {
            arc: {
              borderRadius: 8,
            },
          },
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1000,
            easing: 'easeOutQuart',
          },
        },
      })
    }
  }
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>