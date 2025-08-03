<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface Props {
  title: string
  data: number[]
  labels: string[]
  color?: string
  fillColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: '#3b82f6',
  fillColor: 'rgba(59, 130, 246, 0.1)'
})

const chartCanvas = ref<HTMLCanvasElement>()
let chartInstance: Chart | null = null

onMounted(() => {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d')
    if (ctx) {
      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: props.labels,
          datasets: [
            {
              label: props.title,
              data: props.data,
              borderColor: props.color,
              backgroundColor: props.fillColor,
              borderWidth: 3,
              fill: true,
              tension: 0.4, // This creates the smooth curves
              pointBackgroundColor: props.color,
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: props.color,
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 12,
                },
              },
            },
            y: {
              grid: {
                color: 'rgba(107, 114, 128, 0.1)',
                drawBorder: false,
              },
              border: {
                display: false,
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 12,
                },
                callback: function(value) {
                  return value + '%'
                },
              },
            },
          },
          elements: {
            point: {
              hoverBackgroundColor: props.color,
            },
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