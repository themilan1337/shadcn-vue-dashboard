<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Account Settings</h1>
      <p class="text-muted-foreground">Manage your profile, notifications, and API access</p>
    </div>

    <Tabs default-value="profile" class="space-y-6">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="api">API & Security</TabsTrigger>
      </TabsList>

      <!-- Profile Tab -->
      <TabsContent value="profile" class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <User :size="20" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information and preferences</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center gap-6">
              <div class="relative">
                <img 
                  :src="user.avatar || `https://i.pravatar.cc/80?u=${user.email}`" 
                  :alt="user.name"
                  class="w-20 h-20 rounded-full object-cover"
                />
                <Button size="sm" variant="outline" class="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                  <Camera :size="14" />
                </Button>
              </div>
              <div class="space-y-1">
                <h3 class="text-lg font-semibold">{{ user.name }}</h3>
                <p class="text-sm text-muted-foreground">{{ user.email }}</p>
                <Badge :variant="user.telegramConnected ? 'default' : 'outline'" class="text-xs">
                  {{ user.telegramConnected ? 'Telegram Connected' : 'Telegram Not Connected' }}
                </Badge>
              </div>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <Label for="name">Full Name</Label>
                <Input id="name" v-model="profileForm.name" placeholder="Enter your full name" />
              </div>
              <div class="space-y-2">
                <Label for="email">Email Address</Label>
                <Input id="email" v-model="profileForm.email" type="email" placeholder="Enter your email" />
              </div>
              <div class="space-y-2">
                <Label for="company">Company</Label>
                <Input id="company" v-model="profileForm.company" placeholder="Enter your company" />
              </div>
              <div class="space-y-2">
                <Label for="timezone">Timezone</Label>
                <Select v-model="profileForm.timezone">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time</SelectItem>
                    <SelectItem value="PST">Pacific Time</SelectItem>
                    <SelectItem value="CET">Central European Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div class="flex gap-3">
              <Button @click="updateProfile" :disabled="isUpdating" class="gap-2">
                <Save :size="16" />
                {{ isUpdating ? 'Saving...' : 'Save Changes' }}
              </Button>
              <Button variant="outline" @click="resetProfile">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Notifications Tab -->
      <TabsContent value="notifications" class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Bell :size="20" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Configure how you want to receive alerts and updates</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Email Notifications -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="space-y-1">
                  <Label class="text-base font-medium">Email Notifications</Label>
                  <p class="text-sm text-muted-foreground">Receive alerts and updates via email</p>
                </div>
                <Switch v-model:checked="notificationSettings.email" />
              </div>

              <div v-if="notificationSettings.email" class="ml-6 space-y-3 border-l-2 border-muted pl-4">
                <div class="flex items-center justify-between">
                  <Label class="text-sm">Critical alerts</Label>
                  <Switch v-model:checked="notificationSettings.emailTypes.critical" />
                </div>
                <div class="flex items-center justify-between">
                  <Label class="text-sm">Server status changes</Label>
                  <Switch v-model:checked="notificationSettings.emailTypes.status" />
                </div>
                <div class="flex items-center justify-between">
                  <Label class="text-sm">Weekly reports</Label>
                  <Switch v-model:checked="notificationSettings.emailTypes.reports" />
                </div>
              </div>
            </div>

            <!-- Telegram Notifications -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="space-y-1">
                  <Label class="text-base font-medium">Telegram Notifications</Label>
                  <p class="text-sm text-muted-foreground">Real-time alerts sent to your Telegram</p>
                </div>
                <div class="flex items-center gap-2">
                  <Switch v-model:checked="notificationSettings.telegram" :disabled="!user.telegramConnected" />
                  <Button v-if="!user.telegramConnected" @click="connectTelegram" size="sm" variant="outline" class="gap-2">
                    <MessageSquare :size="14" />
                    Connect
                  </Button>
                </div>
              </div>

              <div v-if="notificationSettings.telegram && user.telegramConnected" class="ml-6 space-y-3 border-l-2 border-muted pl-4">
                <div class="flex items-center justify-between">
                  <Label class="text-sm">All alerts</Label>
                  <Switch v-model:checked="notificationSettings.telegramTypes.all" />
                </div>
                <div class="flex items-center justify-between">
                  <Label class="text-sm">Critical only</Label>
                  <Switch v-model:checked="notificationSettings.telegramTypes.critical" />
                </div>
                <div class="flex items-center justify-between">
                  <Label class="text-sm">Server downtime</Label>
                  <Switch v-model:checked="notificationSettings.telegramTypes.downtime" />
                </div>
              </div>
            </div>

            <!-- Webhook Notifications -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="space-y-1">
                  <Label class="text-base font-medium">Webhook Notifications</Label>
                  <p class="text-sm text-muted-foreground">Send alerts to custom endpoints</p>
                </div>
                <Switch v-model:checked="notificationSettings.webhook" />
              </div>

              <div v-if="notificationSettings.webhook" class="ml-6 space-y-3 border-l-2 border-muted pl-4">
                <div class="space-y-2">
                  <Label for="webhook-url" class="text-sm">Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    v-model="notificationSettings.webhookUrl" 
                    placeholder="https://your-webhook-endpoint.com/alerts"
                    type="url"
                  />
                </div>
                <Button size="sm" variant="outline" @click="testWebhook" class="gap-2">
                  <Zap :size="14" />
                  Test Webhook
                </Button>
              </div>
            </div>

            <div class="flex gap-3">
              <Button @click="updateNotifications" :disabled="isUpdating" class="gap-2">
                <Save :size="16" />
                {{ isUpdating ? 'Saving...' : 'Save Preferences' }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- API & Security Tab -->
      <TabsContent value="api" class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Key :size="20" />
              API Access
            </CardTitle>
            <CardDescription>Manage your API keys and security settings</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="space-y-4">
              <div class="space-y-2">
                <Label>API Key</Label>
                <div class="flex gap-2">
                  <Input 
                    :value="showApiKey ? user.apiKey : '••••••••••••••••••••••••••••••••'"
                    readonly
                    class="font-mono text-sm"
                  />
                  <Button @click="toggleApiKeyVisibility" variant="outline" size="icon">
                    <Eye v-if="!showApiKey" :size="16" />
                    <EyeOff v-else :size="16" />
                  </Button>
                  <Button @click="copyApiKey" variant="outline" size="icon">
                    <Copy :size="16" />
                  </Button>
                </div>
                <p class="text-xs text-muted-foreground">Use this key to authenticate API requests</p>
              </div>

              <div class="flex gap-3">
                <Button @click="regenerateApiKey" variant="destructive" class="gap-2">
                  <RefreshCw :size="16" />
                  Regenerate Key
                </Button>
                <Button variant="outline" @click="downloadApiDocs" class="gap-2">
                  <FileText :size="16" />
                  API Documentation
                </Button>
              </div>
            </div>

            <div class="space-y-4">
              <h4 class="text-sm font-medium">API Usage Statistics</h4>
              <div class="grid gap-4 md:grid-cols-2">
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Requests this month</span>
                    <span class="font-medium">45,231</span>
                  </div>
                  <Progress value={75} class="h-2" />
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Rate limit</span>
                    <span class="font-medium">1000/hour</span>
                  </div>
                  <Progress value={25} class="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Shield :size="20" />
              Security Settings
            </CardTitle>
            <CardDescription>Manage your account security and access</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="space-y-1">
                  <Label class="text-base font-medium">Two-Factor Authentication</Label>
                  <p class="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch v-model:checked="securitySettings.twoFactor" />
              </div>

              <div class="flex items-center justify-between">
                <div class="space-y-1">
                  <Label class="text-base font-medium">Login Notifications</Label>
                  <p class="text-sm text-muted-foreground">Get notified of new login attempts</p>
                </div>
                <Switch v-model:checked="securitySettings.loginNotifications" />
              </div>

              <div class="flex items-center justify-between">
                <div class="space-y-1">
                  <Label class="text-base font-medium">API Rate Limiting</Label>
                  <p class="text-sm text-muted-foreground">Enable stricter rate limits for API access</p>
                </div>
                <Switch v-model:checked="securitySettings.rateLimiting" />
              </div>
            </div>

            <div class="space-y-4">
              <h4 class="text-sm font-medium">Recent Activity</h4>
              <div class="space-y-3">
                <div v-for="activity in recentActivity" :key="activity.id" 
                     class="flex items-center justify-between p-3 border rounded-lg">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <activity.icon :size="14" class="text-primary" />
                    </div>
                    <div>
                      <p class="text-sm font-medium">{{ activity.action }}</p>
                      <p class="text-xs text-muted-foreground">{{ formatTime(activity.timestamp) }}</p>
                    </div>
                  </div>
                  <Badge variant="outline" class="text-xs">{{ activity.location }}</Badge>
                </div>
              </div>
            </div>

            <div class="flex gap-3">
              <Button @click="updateSecurity" :disabled="isUpdating" class="gap-2">
                <Save :size="16" />
                {{ isUpdating ? 'Saving...' : 'Save Security Settings' }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { 
  User, 
  Bell, 
  Key, 
  Shield, 
  Camera, 
  Save, 
  Eye, 
  EyeOff, 
  Copy, 
  RefreshCw, 
  FileText, 
  MessageSquare, 
  Zap,
  LogIn,
  Settings,
  Globe
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

// Types
interface UserData {
  name: string
  email: string
  avatar?: string
  telegramConnected: boolean
  apiKey: string
}

interface ActivityData {
  id: string
  action: string
  timestamp: Date
  location: string
  icon: any
}

// Reactive state
const isUpdating = ref(false)
const showApiKey = ref(false)

// User data
const user = ref<UserData>({
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '',
  telegramConnected: true,
  apiKey: 'mk_live_51234567890abcdef1234567890abcdef'
})

// Form data
const profileForm = reactive({
  name: user.value.name,
  email: user.value.email,
  company: 'Acme Inc',
  timezone: 'UTC'
})

const notificationSettings = reactive({
  email: true,
  emailTypes: {
    critical: true,
    status: true,
    reports: false
  },
  telegram: true,
  telegramTypes: {
    all: false,
    critical: true,
    downtime: true
  },
  webhook: false,
  webhookUrl: ''
})

const securitySettings = reactive({
  twoFactor: false,
  loginNotifications: true,
  rateLimiting: true
})

const recentActivity = ref<ActivityData[]>([
  {
    id: '1',
    action: 'Logged in from new device',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    location: 'New York, US',
    icon: LogIn
  },
  {
    id: '2',
    action: 'API key regenerated',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    location: 'San Francisco, US',
    icon: Key
  },
  {
    id: '3',
    action: 'Settings updated',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    location: 'London, UK',
    icon: Settings
  }
])

// Methods
const updateProfile = async () => {
  isUpdating.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  user.value.name = profileForm.name
  user.value.email = profileForm.email
  isUpdating.value = false
}

const resetProfile = () => {
  profileForm.name = user.value.name
  profileForm.email = user.value.email
}

const updateNotifications = async () => {
  isUpdating.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  isUpdating.value = false
  console.log('Notification settings updated')
}

const updateSecurity = async () => {
  isUpdating.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  isUpdating.value = false
  console.log('Security settings updated')
}

const connectTelegram = () => {
  console.log('Connecting to Telegram...')
  // Handle Telegram OAuth flow
}

const testWebhook = () => {
  console.log('Testing webhook:', notificationSettings.webhookUrl)
}

const toggleApiKeyVisibility = () => {
  showApiKey.value = !showApiKey.value
}

const copyApiKey = async () => {
  try {
    await navigator.clipboard.writeText(user.value.apiKey)
    console.log('API key copied to clipboard')
  } catch (err) {
    console.error('Failed to copy API key')
  }
}

const regenerateApiKey = () => {
  if (confirm('Are you sure you want to regenerate your API key? This will invalidate the current key.')) {
    user.value.apiKey = 'mk_live_' + Math.random().toString(36).substring(2, 34)
    console.log('API key regenerated')
  }
}

const downloadApiDocs = () => {
  console.log('Downloading API documentation')
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  return `${minutes}m ago`
}
</script>