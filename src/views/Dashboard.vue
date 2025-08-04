<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t('dashboard.title') }}</h1>
        <p class="text-muted-foreground">{{ t('dashboard.subtitle') }}</p>
      </div>
    </div>
    
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div class="p-6 border rounded-lg">
        <h3 class="text-lg font-semibold">{{ t('dashboard.totalServers') }}</h3>
        <p class="text-2xl font-bold">12</p>
      </div>
      <div class="p-6 border rounded-lg">
        <h3 class="text-lg font-semibold">{{ t('dashboard.activeAlerts') }}</h3>
        <p class="text-2xl font-bold text-red-500">3</p>
      </div>
      <div class="p-6 border rounded-lg">
        <h3 class="text-lg font-semibold">{{ t('dashboard.systemUptime') }}</h3>
        <p class="text-2xl font-bold">99.9%</p>
      </div>
      <div class="p-6 border rounded-lg">
        <h3 class="text-lg font-semibold">{{ t('dashboard.telegramGroups') }}</h3>
        <p class="text-2xl font-bold">5</p>
      </div>
    </div>
    
    <!-- Charts Section -->
    <div class="grid gap-6 md:grid-cols-2">
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
        <h3 class="text-lg font-semibold mb-4">{{ t('dashboard.resourceDistribution') }}</h3>
        <DoughnutChart 
          :title="t('dashboard.systemResources')"
          :data="resourceData"
          :labels="resourceLabels"
          :colors="resourceColors"
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
const timeLabels = ref([
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
])

// Sample data for resource distribution
const resourceData = ref([45, 25, 15, 10, 5])
const resourceLabels = ref(['CPU', 'Memory', 'Storage', 'Network', 'Other'])
const resourceColors = ref([
  '#3b82f6', // Blue for CPU
  '#10b981', // Green for Memory
  '#f59e0b', // Yellow for Storage
  '#ef4444', // Red for Network
  '#8b5cf6'  // Purple for Other
])
</script>