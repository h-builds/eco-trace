<script setup lang="ts">
import { useWasm } from '@/composables/useWasm'

const { isReady, error } = useWasm()
</script>

<template>
  <main class="min-h-screen bg-brand-deep-charcoal text-white p-4">
    <h1 class="text-xl font-bold text-brand-integrity-blue">Eco-Trace Scanner</h1>
    <div v-if="error" class="text-functional-alert bg-functional-alert/20 p-4 border border-functional-alert rounded-md mt-4">
      {{ error }}
    </div>
    <div v-else-if="!isReady" class="text-functional-pending mt-4">
      Initializing Cryptographic Engine...
    </div>
    <div v-else class="text-brand-verification-green mt-4 flex items-center gap-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
      Engine Ready
    </div>
  </main>
</template>
