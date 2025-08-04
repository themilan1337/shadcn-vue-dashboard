<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  CheckmarkBadge01Icon,
  Notification01Icon,
  ArrowUpDownIcon,
  CreditCardIcon,
  Logout01Icon,
  SparklesIcon,
  GlobeIcon,
} from '@hugeicons/core-free-icons'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { availableLanguages, changeLanguage } from '@/i18n'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

defineProps<{
  user: {
    name: string
    email: string
    avatar: string
  }
}>()

const { isMobile } = useSidebar()
const mode = useColorMode()
const { t, locale } = useI18n()

const handleLanguageChange = (langCode: string) => {
  changeLanguage(langCode)
}

const getCurrentLanguage = () => {
  return availableLanguages.find(lang => lang.code === locale.value) || availableLanguages[0]
}
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
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="user.avatar" :alt="user.name" />
              <AvatarFallback class="rounded-lg">
                CN
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
            <HugeiconsIcon :icon="ArrowUpDownIcon" :size="16" color="currentColor" :stroke-width="1.5" class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.avatar" :alt="user.name" />
                <AvatarFallback class="rounded-lg">
                  CN
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <HugeiconsIcon :icon="SparklesIcon" :size="16" color="currentColor" :stroke-width="1.5" />
              {{ t('user.upgradeToPro') }}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="16" color="currentColor" :stroke-width="1.5" />
              {{ t('user.account') }}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon :icon="CreditCardIcon" :size="16" color="currentColor" :stroke-width="1.5" />
              {{ t('user.billing') }}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon :icon="Notification01Icon" :size="16" color="currentColor" :stroke-width="1.5" />
              {{ t('user.notifications') }}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel class="px-2 py-1.5 text-sm font-medium text-muted-foreground">
              <HugeiconsIcon :icon="GlobeIcon" :size="16" color="currentColor" :stroke-width="1.5" class="inline mr-2" />
              {{ t('user.language') }}
            </DropdownMenuLabel>
            <DropdownMenuItem 
              v-for="language in availableLanguages" 
              :key="language.code"
              @click="handleLanguageChange(language.code)"
              :class="{ 'bg-accent': locale === language.code }"
            >
              <img :src="language.flag" :alt="language.name" class="w-4 h-4 rounded-sm" />
              {{ language.name }}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem @click="mode = 'light'">
              <Icon icon="radix-icons:sun" class="h-4 w-4" />
              {{ t('user.theme.light') }}
            </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'dark'">
              <Icon icon="radix-icons:moon" class="h-4 w-4" />
              {{ t('user.theme.dark') }}
            </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'auto'">
              <Icon icon="radix-icons:desktop" class="h-4 w-4" />
              {{ t('user.theme.system') }}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <HugeiconsIcon :icon="Logout01Icon" :size="16" color="currentColor" :stroke-width="1.5" />
            {{ t('user.logOut') }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
