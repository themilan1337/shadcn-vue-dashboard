<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- Server OS Logo -->
        <div class="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><!-- Icon from SVG Logos by Gil Barbara - https://raw.githubusercontent.com/gilbarbara/logos/master/LICENSE.txt --><path fill="#DD4814" d="M255.637 127.683c0 70.514-57.165 127.68-127.683 127.68C57.434 255.363.27 198.197.27 127.683C.27 57.165 57.436 0 127.954 0c70.519 0 127.683 57.165 127.683 127.683"/><path fill="#FFF" d="M41.133 110.633c-9.419 0-17.05 7.631-17.05 17.05c0 9.414 7.631 17.046 17.05 17.046c9.415 0 17.046-7.632 17.046-17.046c0-9.419-7.631-17.05-17.046-17.05m121.715 77.478c-8.153 4.71-10.95 15.13-6.24 23.279c4.705 8.154 15.125 10.949 23.279 6.24c8.153-4.705 10.949-15.125 6.24-23.28c-4.705-8.148-15.131-10.943-23.279-6.239m-84.686-60.428c0-16.846 8.368-31.73 21.171-40.742L86.87 66.067c-14.914 9.97-26.012 25.204-30.624 43.047c5.382 4.39 8.826 11.075 8.826 18.568c0 7.489-3.444 14.174-8.826 18.565C60.852 164.094 71.95 179.33 86.87 189.3l12.463-20.88c-12.803-9.007-21.171-23.89-21.171-40.737m49.792-49.797c26.013 0 47.355 19.944 49.595 45.38l24.29-.358c-1.194-18.778-9.398-35.636-22.002-48.032c-6.482 2.449-13.97 2.074-20.44-1.656c-6.483-3.741-10.548-10.052-11.659-16.902a74.3 74.3 0 0 0-19.785-2.69a73.8 73.8 0 0 0-32.819 7.663l11.845 21.227a49.6 49.6 0 0 1 20.975-4.632m0 99.59a49.6 49.6 0 0 1-20.974-4.632l-11.845 21.225a73.7 73.7 0 0 0 32.82 7.671a74 74 0 0 0 19.784-2.697c1.111-6.85 5.177-13.155 11.658-16.902c6.476-3.737 13.959-4.105 20.44-1.656c12.605-12.396 20.808-29.254 22.004-48.032l-24.297-.358c-2.235 25.443-23.576 45.38-49.59 45.38m34.888-110.231c8.154 4.708 18.575 1.92 23.279-6.234c4.71-8.154 1.92-18.575-6.234-23.285c-8.154-4.704-18.574-1.91-23.285 6.244c-4.703 8.15-1.908 18.57 6.24 23.275"/></svg>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-3xl font-bold tracking-tight">moniq-server-01</h1>
            <!-- Server Status Indicator -->
            <span class="relative flex size-3 ml-4">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex size-3 rounded-full bg-green-500"></span>
            </span>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-muted-foreground">IP: 192.168.1.100 • Pro Activated: False.</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div class="p-6 border rounded-lg">
        <h3 class="text-lg font-semibold">{{ t('dashboard.activeAlerts') }}</h3>
        <p class="text-2xl font-bold text-red-500">3</p>
      </div>
      <div class="p-6 border rounded-lg">
        <h3 class="text-lg font-semibold">{{ t('dashboard.systemUptime') }}</h3>
        <p class="text-2xl font-bold">12h 52min</p>
      </div>
      <div class="p-6 border rounded-lg">
        <h3 class="text-lg font-semibold">{{ t('dashboard.telegramGroups') }}</h3>
        <p class="text-2xl font-bold">5</p>
      </div>
    </div>
    
    <!-- Charts Section -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div class="p-6 border rounded-lg bg-card">
        <h3 class="text-lg font-semibold mb-4">{{ t('dashboard.serverPerformance') }}</h3>
        <LineChart 
          :title="t('dashboard.cpuUsage')"
          :data="cpuData"
          :labels="timeLabels"
          color="#3b82f6"
          fill-color="rgba(59, 130, 246, 0.1)"
        />
      </div>
      
      <div class="p-6 border rounded-lg bg-card">
        <h3 class="text-lg font-semibold mb-4">{{ t('dashboard.memoryUsage') }}</h3>
        <LineChart 
          :title="t('dashboard.memoryUsage')"
          :data="memoryData"
          :labels="timeLabels"
          color="#10b981"
          fill-color="rgba(16, 185, 129, 0.1)"
        />
      </div>
      
      <div class="p-6 border rounded-lg bg-card">
        <h3 class="text-lg font-semibold mb-4">{{ t('dashboard.diskUsage') }}</h3>
        <DoughnutChart 
          :title="t('dashboard.diskSpace')"
          :data="diskData"
          :labels="diskLabels"
          :colors="diskColors"
        />
      </div>
    </div>
    
    <div class="grid gap-6 md:grid-cols-2">
      <div class="p-6 border rounded-lg">
        <h3 class="text-lg font-semibold mb-4">{{ t('dashboard.serverStatus') }}</h3>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span>{{ t('dashboard.webServer01') }}</span>
            <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">{{ t('common.online') }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span>{{ t('dashboard.databaseServer') }}</span>
            <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">{{ t('common.online') }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span>{{ t('dashboard.apiServer') }}</span>
            <span class="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">{{ t('common.offline') }}</span>
          </div>
        </div>
      </div>
      
      <div class="p-6 border rounded-lg">
        <h3 class="text-lg font-semibold mb-4">{{ t('dashboard.recentAlerts') }}</h3>
        <div class="space-y-2">
          <div class="p-3 bg-red-50 border border-red-200 rounded">
            <p class="text-sm font-medium text-red-800">{{ t('dashboard.highCpuUsage') }}</p>
            <p class="text-xs text-red-600">{{ t('dashboard.apiServer') }} - 2 {{ t('dashboard.minutesAgo') }}</p>
          </div>
          <div class="p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p class="text-sm font-medium text-yellow-800">{{ t('dashboard.memoryWarning') }}</p>
            <p class="text-xs text-yellow-600">{{ t('dashboard.webServer01') }} - 15 {{ t('dashboard.minutesAgo') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LineChart from '@/components/LineChart.vue'
import DoughnutChart from '@/components/DoughnutChart.vue'

const { t } = useI18n()

// Sample data for CPU usage over 24 hours
const cpuData = ref([45, 52, 48, 61, 55, 67, 73, 69, 58, 62, 71, 68, 75, 82, 78, 71, 65, 59, 63, 57, 51, 48, 44, 41])

// Sample data for Memory usage over 24 hours
const memoryData = ref([32, 38, 35, 42, 39, 45, 51, 48, 41, 44, 49, 46, 53, 58, 55, 50, 47, 43, 46, 42, 38, 35, 32, 29])

const timeLabels = ref([
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
])

// Sample data for disk usage
const diskData = ref([45.2, 28.8, 15.6, 8.4, 2.0])
const diskLabels = ref(['System Files', 'Applications', 'Documents', 'Media Files', 'Available Space'])
const diskColors = ref([
  '#ef4444', // Red for System Files
  '#3b82f6', // Blue for Applications
  '#10b981', // Green for Documents
  '#f59e0b', // Yellow for Media Files
  '#e5e7eb'  // Gray for Available Space
])
</script>