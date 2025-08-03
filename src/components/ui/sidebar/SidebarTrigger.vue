<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { HugeiconsIcon } from '@hugeicons/vue'
import { SidebarLeft01Icon } from '@hugeicons/core-free-icons'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { useSidebar } from "./utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    :class="cn('h-7 w-7', props.class)"
    @click="toggleSidebar"
  >
    <HugeiconsIcon :icon="SidebarLeft01Icon" :size="16" color="currentColor" :stroke-width="1.5" />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
