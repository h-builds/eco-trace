<script setup lang="ts">
defineEmits<{
  (e: 'navigate', view: 'landing'): void;
}>();

const AUDITOR_DASHBOARD_URL = '#';
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-surface-card border-b border-surface-border/15 backdrop-blur-sm">
    <div class="w-full flex items-center justify-between px-4 py-3 md:px-6">
      <!-- Wordmark + Live Status -->
      <button
        @click="$emit('navigate', 'landing')"
        class="flex items-center gap-3 hover:opacity-70 transition-opacity"
      >
        <span class="relative flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-verification-green animate-pulse"></span>
          <span class="font-mono text-[9px] text-brand-verification-green uppercase tracking-widest font-bold">LIVE</span>
        </span>
        <span class="font-['Space_Grotesk'] text-sm font-bold text-brand-deep-charcoal uppercase tracking-tighter">
          ECO-TRACE
        </span>
      </button>

      <!-- Auditor Link -->
      <a
        :href="AUDITOR_DASHBOARD_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-functional-neutral hover:text-brand-integrity-blue transition-colors font-bold"
      >
        <span>Auditor Dashboard (React 19)</span>
        <span class="text-[11px]">↗</span>
      </a>
    </div>
  </nav>
</template>
