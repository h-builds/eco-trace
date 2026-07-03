<script setup lang="ts">
import { UI_CONSTANTS } from '@/lib/demo/demoScenario';
</script>

<template>
  <div class="w-full py-2 px-4 flex items-center justify-center border-b border-[var(--color-surface-border)] bg-functional-alert">
    <div class="flex items-center gap-2">
      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="font-mono text-xs font-bold uppercase tracking-widest text-white text-center">
        {{ UI_CONSTANTS.BANNER_TEXT }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.font-mono {
  font-family: var(--font-family-base);
}
</style>
