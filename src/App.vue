<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import AppSidebar from "@/components/AppSidebar.vue"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const route = useRoute()

const breadcrumbItems = computed(() => {
  const routeName = route.name as string
  switch (routeName) {
    case 'dashboard':
      return {
        parent: 'Moniq Dashboard',
        current: 'Overview'
      }
    case 'billing':
      return {
        parent: 'Moniq Dashboard',
        current: 'Billing & Usage'
      }
    case 'settings':
      return {
        parent: 'Moniq Dashboard',
        current: 'Account Settings'
      }
    default:
      return {
        parent: 'Moniq Dashboard',
        current: 'Dashboard'
      }
  }
})
</script>

<template>
  <div>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2">
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink href="#">
                    {{ breadcrumbItems.parent }}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{{ breadcrumbItems.current }}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div class="flex flex-1 flex-col p-4 pt-0 relative overflow-hidden">
          <Transition 
            name="page" 
            mode="out-in"
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <RouterView />
          </Transition>
        </div>
      </SidebarInset>
    </SidebarProvider>
    <Toaster />
  </div>
</template>
