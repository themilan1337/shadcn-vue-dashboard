<script lang="ts">
export const description = 'A two column login page with a cover image.'
</script>

<script setup lang="ts">
import RegisterForm from '../../components/auth/RegisterForm.vue'
</script>

<template>
  <div class="grid min-h-svh lg:grid-cols-2">
    <div class="flex flex-col gap-4 p-6 md:p-10">
      <div class="flex justify-center gap-2 md:justify-start">
        <a href="#" class="flex items-center gap-2 font-medium">
          <img src="/logo.png" alt="Logo" class="h-6 w-6" />
          moniq.sh
        </a>
      </div>
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-xs">
          <RegisterForm />
        </div>
      </div>
    </div>
    <div class="relative hidden bg-muted lg:block">
      <img
        src="/bg.avif"
        alt="Image"
        class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      >
    </div>
  </div>
</template>
