<script setup lang="ts">
import { UI_CONSTANTS } from '@/lib/demo/demoScenario';
</script>

<template>
  <div class="w-full py-2 px-4 flex items-center justify-center border-b border-[var(--color-bp-outline-ghost)] bg-bp-error-container">
    <div class="flex items-center gap-2">
      <svg class="w-4 h-4 text-bp-error" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="bp-mono text-xs font-bold uppercase tracking-widest text-bp-on-error-container text-center">
        {{ UI_CONSTANTS.BANNER_TEXT }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.bp-mono {
  font-family: var(--font-bp-mono);
}
</style>
