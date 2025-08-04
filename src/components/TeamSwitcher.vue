<script setup lang="ts">
import type { Component } from "vue"

import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowUpDownIcon, Add01Icon } from '@hugeicons/core-free-icons'
import { ref } from "vue"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

const props = defineProps<{
  servers: {
    name: string
    logo: Component
    ip: string
    status: 'up' | 'down'
    os: string
  }[]
}>()

const { isMobile } = useSidebar()
const activeServer = ref(props.servers[0])
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <component :is="activeServer.logo" class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <div class="flex items-center gap-2">
                <span class="truncate font-medium">
                  {{ activeServer.name }}
                </span>
                <div :class="['w-2 h-2 rounded-full', activeServer.status === 'up' ? 'bg-green-500' : 'bg-red-500']"></div>
              </div>
              <span class="truncate text-xs">{{ activeServer.ip }} • {{ activeServer.os }}</span>
            </div>
            <HugeiconsIcon :icon="ArrowUpDownIcon" :size="16" color="currentColor" :stroke-width="1.5" class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
        >
          <DropdownMenuLabel class="text-xs text-muted-foreground">
            Servers
          </DropdownMenuLabel>
          <DropdownMenuItem
            v-for="(server, index) in servers"
            :key="server.name"
            class="gap-2 p-2"
            @click="activeServer = server"
          >
            <div class="flex size-6 items-center justify-center rounded-sm border">
              <component :is="server.logo" class="size-3.5 shrink-0" />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-medium">{{ server.name }}</span>
                <div :class="['w-2 h-2 rounded-full', server.status === 'up' ? 'bg-green-500' : 'bg-red-500']"></div>
              </div>
              <div class="text-xs text-muted-foreground">{{ server.ip }} • {{ server.os }}</div>
            </div>
            <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="gap-2 p-2">
            <div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
              <HugeiconsIcon :icon="Add01Icon" :size="16" color="currentColor" :stroke-width="1.5" />
            </div>
            <div class="font-medium text-muted-foreground">
              Add server
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
