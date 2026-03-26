<script setup lang="ts">
defineEmits<{
  (e: 'navigate', view: 'landing'): void;
}>();

const AUDITOR_DASHBOARD_URL = '#';
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-brand-deep-charcoal/95 backdrop-blur border-b border-surface-border/20">
    <div class="w-full flex items-center justify-between px-4 py-3 md:px-6">
      <button
        @click="$emit('navigate', 'landing')"
        class="flex items-center gap-2 text-white font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
      >
        <svg class="w-6 h-6 text-brand-verification-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
          <path d="M8 12l3 3 5-5"/>
        </svg>
        Eco-Trace
      </button>

      <a
        :href="AUDITOR_DASHBOARD_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-1.5 text-sm font-medium text-functional-neutral hover:text-brand-integrity-blue transition-colors"
      >
        Auditor Dashboard
        <span class="hidden md:inline text-xs opacity-70">(React)</span>
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>
    </div>
  </nav>
</template>
