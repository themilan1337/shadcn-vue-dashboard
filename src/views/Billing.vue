<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-3xl font-bold tracking-tight">{{ t('billing.title') }}</h1>
      <p class="text-muted-foreground">{{ t('billing.subtitle') }}</p>
    </div>

    <!-- Current Plan Overview -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle class="flex items-center gap-2">
              <CreditCard :size="20" />
              {{ t('billing.currentPlan') }}
            </CardTitle>
            <CardDescription>{{ t('billing.subscriptionDetails') }}</CardDescription>
          </div>
          <Badge :variant="getPlanVariant(billing.plan)" class="text-sm px-3 py-1">
            {{ billing.plan.toUpperCase() }}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-3">
          <div class="space-y-2">
            <p class="text-sm font-medium text-muted-foreground">{{ t('billing.monthlyCost') }}</p>
            <p class="text-2xl font-bold">${{ billing.amount }}</p>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium text-muted-foreground">{{ t('billing.nextBilling') }}</p>
            <p class="text-lg font-semibold">{{ formatDate(billing.nextBilling) }}</p>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium text-muted-foreground">{{ t('common.status') }}</p>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-500 rounded-full" />
              <span class="text-sm font-medium">{{ t('common.active') }}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Usage Statistics -->
    <div class="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base flex items-center gap-2">
            <Server :size="16" />
            {{ t('billing.servers') }}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span>{{ billing.usage.servers }} / {{ billing.limits.servers }}</span>
              <span>{{ Math.round((billing.usage.servers / billing.limits.servers) * 100) }}%</span>
            </div>
            <Progress :value="(billing.usage.servers / billing.limits.servers) * 100" class="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base flex items-center gap-2">
            <Bell :size="16" />
            {{ t('billing.alerts') }}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span>{{ billing.usage.alerts }} / {{ billing.limits.alerts }}</span>
              <span>{{ Math.round((billing.usage.alerts / billing.limits.alerts) * 100) }}%</span>
            </div>
            <Progress :value="(billing.usage.alerts / billing.limits.alerts) * 100" class="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base flex items-center gap-2">
            <Zap :size="16" />
            {{ t('billing.apiCalls') }}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span>{{ formatNumber(billing.usage.apiCalls) }} / {{ formatNumber(billing.limits.apiCalls) }}</span>
              <span>{{ Math.round((billing.usage.apiCalls / billing.limits.apiCalls) * 100) }}%</span>
            </div>
            <Progress :value="(billing.usage.apiCalls / billing.limits.apiCalls) * 100" class="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Subscription Plans -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Package :size="20" />
          Available Plans
        </CardTitle>
        <CardDescription>Choose the plan that fits your monitoring needs</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-6 lg:grid-cols-3">
          <div v-for="plan in plans" :key="plan.name" 
               :class="[
                 'relative rounded-lg border p-6 transition-all hover:shadow-md',
                 plan.name.toLowerCase() === billing.plan ? 'border-primary bg-primary/5' : 'border-border'
               ]">
            <div v-if="plan.name.toLowerCase() === billing.plan" 
                 class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge variant="default" class="px-3 py-1">Current Plan</Badge>
            </div>
            
            <div class="space-y-4">
              <div>
                <h3 class="text-xl font-semibold">{{ plan.name }}</h3>
                <p class="text-sm text-muted-foreground">{{ plan.description }}</p>
              </div>
              
              <div class="flex items-baseline gap-1">
                <span class="text-3xl font-bold">${{ plan.price }}</span>
                <span class="text-sm text-muted-foreground">/month</span>
              </div>
              
              <ul class="space-y-2 text-sm">
                <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-2">
                  <Check :size="16" class="text-green-500" />
                  {{ feature }}
                </li>
              </ul>
              
              <Button 
                :variant="plan.name.toLowerCase() === billing.plan ? 'outline' : 'default'"
                :disabled="plan.name.toLowerCase() === billing.plan"
                @click="upgradeSubscription(plan)"
                class="w-full">
                {{ plan.name.toLowerCase() === billing.plan ? 'Current Plan' : 'Upgrade' }}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Payment History -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle class="flex items-center gap-2">
              <Receipt :size="20" />
              Payment History
            </CardTitle>
            <CardDescription>Your recent billing transactions</CardDescription>
          </div>
          <Button variant="outline" @click="exportData" class="gap-2">
            <Download :size="16" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div v-for="payment in paymentHistory" :key="payment.id" 
               class="flex items-center justify-between p-4 border rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <CreditCard :size="16" class="text-primary" />
              </div>
              <div>
                <p class="font-medium">{{ payment.description }}</p>
                <p class="text-sm text-muted-foreground">{{ formatDate(payment.date) }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold">${{ payment.amount }}</p>
              <Badge :variant="payment.status === 'paid' ? 'default' : 'destructive'" class="text-xs">
                {{ payment.status.toUpperCase() }}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  CreditCard, 
  Server, 
  Bell, 
  Zap, 
  Package, 
  Check, 
  Receipt, 
  Download
} from 'lucide-vue-next'

const { t } = useI18n()

// Types
interface BillingData {
  plan: 'free' | 'pro' | 'enterprise'
  usage: {
    servers: number
    alerts: number
    apiCalls: number
  }
  limits: {
    servers: number
    alerts: number
    apiCalls: number
  }
  nextBilling: Date
  amount: number
}

interface PlanData {
  name: string
  description: string
  price: number
  features: string[]
}

interface PaymentData {
  id: string
  description: string
  amount: number
  date: Date
  status: 'paid' | 'pending' | 'failed'
}

// Mock data
const billing = ref<BillingData>({
  plan: 'pro',
  usage: {
    servers: 8,
    alerts: 1250,
    apiCalls: 45000
  },
  limits: {
    servers: 25,
    alerts: 5000,
    apiCalls: 100000
  },
  nextBilling: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
  amount: 29
})

const plans = ref<PlanData[]>([
  {
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    features: [
      'Up to 3 servers',
      '500 alerts/month',
      '10K API calls/month',
      'Basic Telegram integration',
      'Email support'
    ]
  },
  {
    name: 'Pro',
    description: 'Best for growing teams',
    price: 29,
    features: [
      'Up to 25 servers',
      '5K alerts/month',
      '100K API calls/month',
      'Advanced Telegram features',
      'Priority support',
      'Custom webhooks'
    ]
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    price: 99,
    features: [
      'Unlimited servers',
      'Unlimited alerts',
      'Unlimited API calls',
      'White-label solution',
      'Dedicated support',
      'SLA guarantee',
      'Custom integrations'
    ]
  }
])

const paymentHistory = ref<PaymentData[]>([
  {
    id: '1',
    description: 'Pro Plan - Monthly Subscription',
    amount: 29,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    status: 'paid'
  },
  {
    id: '2',
    description: 'Pro Plan - Monthly Subscription',
    amount: 29,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    status: 'paid'
  },
  {
    id: '3',
    description: 'Pro Plan - Monthly Subscription',
    amount: 29,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
    status: 'paid'
  }
])

// Methods
const upgradeSubscription = (plan: PlanData) => {
  console.log('Upgrading to:', plan.name)
  // Handle subscription upgrade
}

const exportData = () => {
  console.log('Exporting payment history')
  // Handle data export
}

const getPlanVariant = (plan: string) => {
  switch (plan) {
    case 'free': return 'outline'
    case 'pro': return 'default'
    case 'enterprise': return 'secondary'
    default: return 'outline'
  }
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}
</script>