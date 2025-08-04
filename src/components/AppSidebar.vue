<script setup lang="ts">
import { h, computed } from 'vue'
import type { SidebarProps } from '@/components/ui/sidebar'

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


import { HugeiconsIcon } from '@hugeicons/vue'
import { 
  DashboardSquare01Icon, 
  Analytics01Icon, 
  TouchInteraction01Icon, 
  Settings02Icon,
  KeyframeIcon,
  CarouselHorizontalIcon,
  MapsIcon,
  PieChartIcon
} from '@hugeicons/core-free-icons'
import NavMain from '@/components/NavMain.vue'
import NavProjects from '@/components/NavProjects.vue'
import NavUser from '@/components/NavUser.vue'
import TeamSwitcher from '@/components/TeamSwitcher.vue'
import { useI18n } from 'vue-i18n'

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

const { t } = useI18n()

// Navigation data for Moniq dashboard
const data = computed(() => ({
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/40?u=john.doe@example.com",
  },
  servers: [
    {
      name: "Ubuntu Server 01",
      logo: {
        render() {
          return h('svg', {
            viewBox: '0 0 24 24',
            fill: 'currentColor',
            class: 'w-4 h-4'
          }, [
            h('path', {
              d: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 14.794a5.57 5.57 0 01-1.423 1.423l-.904-.904a4.686 4.686 0 001.327-3.313c0-1.287-.518-2.456-1.357-3.313l.904-.904a5.57 5.57 0 011.453 3.313c0 1.287-.518 2.456-1.357 3.313l.357.385z'
            })
          ])
        }
      },
      ip: "192.168.1.100",
      status: "up" as const,
      os: "Ubuntu 22.04",
    },
    {
      name: "CentOS Server 02",
      logo: {
        render() {
          return h('svg', {
            viewBox: '0 0 24 24',
            fill: 'currentColor',
            class: 'w-4 h-4'
          }, [
            h('path', {
              d: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2a10 10 0 110 20 10 10 0 010-20z'
            })
          ])
        }
      },
      ip: "192.168.1.101",
      status: "down" as const,
      os: "CentOS 8",
    },
    {
      name: "Windows Server 03",
      logo: {
        render() {
          return h('svg', {
            viewBox: '0 0 24 24',
            fill: 'currentColor',
            class: 'w-4 h-4'
          }, [
            h('path', {
              d: 'M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.351'
            })
          ])
        }
      },
      ip: "192.168.1.102",
      status: "up" as const,
      os: "Windows Server 2022",
    },
  ],
  navMain: [
    {
      title: t('sidebar.dashboard'),
      url: "/",
      icon: {
        render() {
          return h(HugeiconsIcon, {
            icon: DashboardSquare01Icon,
            size: 16,
            color: "currentColor",
            strokeWidth: 1.5
          })
        }
      },
      isActive: true,
      items: [
        {
          title: t('sidebar.overview'),
          url: "/",
        },
        {
          title: t('sidebar.serverStatus'),
          url: "/",
        },
        {
          title: t('sidebar.alerts'),
          url: "/",
        },
      ],
    },
    {
      title: t('sidebar.monitoring'),
      url: "/",
      icon: {
        render() {
          return h(HugeiconsIcon, {
            icon: Analytics01Icon,
            size: 16,
            color: "currentColor",
            strokeWidth: 1.5
          })
        }
      },
      items: [
        {
          title: t('sidebar.realTimeStats'),
          url: "/",
        },
        {
          title: t('sidebar.performance'),
          url: "/",
        },
        {
          title: t('sidebar.uptime'),
          url: "/",
        },
      ],
    },
    {
      title: t('sidebar.integrations'),
      url: "/",
      icon: {
        render() {
          return h(HugeiconsIcon, {
            icon: TouchInteraction01Icon,
            size: 16,
            color: "currentColor",
            strokeWidth: 1.5
          })
        }
      },
      items: [
        {
          title: t('sidebar.telegramSetup'),
          url: "/",
        },
        {
          title: t('sidebar.apiDocumentation'),
          url: "/",
        },
        {
          title: t('sidebar.webhooks'),
          url: "/",
        },
        {
          title: t('sidebar.support'),
          url: "/",
        },
      ],
    },
    {
      title: t('sidebar.account'),
      url: "/settings",
      icon: {
        render() {
          return h(HugeiconsIcon, {
            icon: Settings02Icon,
            size: 16,
            color: "currentColor",
            strokeWidth: 1.5
          })
        }
      },
      items: [
        {
          title: t('sidebar.profile'),
          url: "/settings",
        },
        {
          title: t('sidebar.notifications'),
          url: "/settings",
        },
        {
          title: t('sidebar.billing'),
          url: "/billing",
        },
        {
          title: t('sidebar.apiKeys'),
          url: "/settings",
        },
      ],
    },
  ],
  projects: [
    {
      name: t('sidebar.serverMonitoring'),
      url: "/",
      icon: {
        render() {
          return h(HugeiconsIcon, {
            icon: KeyframeIcon,
            size: 16,
            color: "currentColor",
            strokeWidth: 1.5
          })
        }
      },
    },
    {
      name: t('sidebar.alertManagement'),
      url: "/",
      icon: {
        render() {
          return h(HugeiconsIcon, {
            icon: PieChartIcon,
            size: 16,
            color: "currentColor",
            strokeWidth: 1.5
          })
        }
      },
    },
    {
      name: t('sidebar.telegramBots'),
      url: "/",
      icon: {
        render() {
          return h(HugeiconsIcon, {
            icon: MapsIcon,
            size: 16,
            color: "currentColor",
            strokeWidth: 1.5
          })
        }
      },
    },
  ],
}))
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :servers="data.servers" />
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
