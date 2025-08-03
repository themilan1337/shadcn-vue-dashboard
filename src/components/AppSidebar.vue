<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-vue-next"
import NavMain from '@/components/NavMain.vue'
import NavProjects from '@/components/NavProjects.vue'
import NavUser from '@/components/NavUser.vue'
import TeamSwitcher from '@/components/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
})

// Navigation data for Moniq dashboard
const data = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/40?u=john.doe@example.com",
  },
  teams: [
    {
      name: "Moniq",
      logo: GalleryVerticalEnd,
      plan: "Pro",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/",
        },
        {
          title: "Server Status",
          url: "/",
        },
        {
          title: "Alerts",
          url: "/",
        },
      ],
    },
    {
      title: "Monitoring",
      url: "/",
      icon: Bot,
      items: [
        {
          title: "Real-time Stats",
          url: "/",
        },
        {
          title: "Performance",
          url: "/",
        },
        {
          title: "Uptime",
          url: "/",
        },
      ],
    },
    {
      title: "Integrations",
      url: "/",
      icon: BookOpen,
      items: [
        {
          title: "Telegram Setup",
          url: "/",
        },
        {
          title: "API Documentation",
          url: "/",
        },
        {
          title: "Webhooks",
          url: "/",
        },
        {
          title: "Support",
          url: "/",
        },
      ],
    },
    {
      title: "Account",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/settings",
        },
        {
          title: "Notifications",
          url: "/settings",
        },
        {
          title: "Billing",
          url: "/billing",
        },
        {
          title: "API Keys",
          url: "/settings",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Server Monitoring",
      url: "/",
      icon: Frame,
    },
    {
      name: "Alert Management",
      url: "/",
      icon: PieChart,
    },
    {
      name: "Telegram Bots",
      url: "/",
      icon: Map,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
