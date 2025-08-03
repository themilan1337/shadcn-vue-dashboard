<script setup lang="ts">
import { h } from 'vue'
import type { SidebarProps } from '@/components/ui/sidebar'

import { HugeiconsIcon } from '@hugeicons/vue';
import { Settings02Icon } from '@hugeicons/core-free-icons';

// Custom Settings Icon Component
const SettingsIcon = {
  name: 'SettingsIcon',
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '32',
      height: '32',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '1.5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      class: 'lucide lucide-settings'
    }, [
      h('g', {
        fill: 'none',
        stroke: 'currentColor',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        color: 'currentColor'
      }, [
        h('path', {
          d: 'M15.5 12a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0'
        }),
        h('path', {
          d: 'M21.011 14.097c.522-.141.783-.212.886-.346c.103-.135.103-.351.103-.784v-1.934c0-.433 0-.65-.103-.784s-.364-.205-.886-.345c-1.95-.526-3.171-2.565-2.668-4.503c.139-.533.208-.8.142-.956s-.256-.264-.635-.479l-1.725-.98c-.372-.21-.558-.316-.725-.294s-.356.21-.733.587c-1.459 1.455-3.873 1.455-5.333 0c-.377-.376-.565-.564-.732-.587c-.167-.022-.353.083-.725.295l-1.725.979c-.38.215-.57.323-.635.48c-.066.155.003.422.141.955c.503 1.938-.718 3.977-2.669 4.503c-.522.14-.783.21-.886.345S2 10.6 2 11.033v1.934c0 .433 0 .65.103.784s.364.205.886.346c1.95.526 3.171 2.565 2.668 4.502c-.139.533-.208.8-.142.956s.256.264.635.48l1.725.978c.372.212.558.317.725.295s.356-.21.733-.587c1.46-1.457 3.876-1.457 5.336 0c.377.376.565.564.732.587c.167.022.353-.083.726-.295l1.724-.979c.38-.215.57-.323.635-.48s-.003-.422-.141-.955c-.504-1.937.716-3.976 2.666-4.502'
        })
      ])
    ])
  }
}


import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
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
      icon: {
        render() {
          return h(HugeiconsIcon, {
            icon: Settings02Icon,
            size: 24,
            color: "currentColor",
            strokeWidth: 1.5
          })
        }
      },
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
