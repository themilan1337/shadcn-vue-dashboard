import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Billing from '@/views/Billing.vue'
import Settings from '@/views/Settings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/billing',
      name: 'billing',
      component: Billing
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})

export default router