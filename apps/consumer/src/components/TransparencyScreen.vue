<script setup lang="ts">
import { onMounted } from 'vue';
import { useEventHistory } from '@/composables/useEventHistory';
import FormulaRenderer from './FormulaRenderer.vue';
import AuditTimeline from './AuditTimeline.vue';

const props = defineProps<{
  assetId: string;
}>();

const emit = defineEmits<{
  (e: 'reset'): void;
}>();

const { events, isLoading, isError, error, fetchHistory } = useEventHistory();

onMounted(() => {
  if (props.assetId) {
    fetchHistory(props.assetId);
  }
});
</script>

<template>
  <div class="min-h-screen bg-surface-canvas text-brand-deep-charcoal pb-8">
    <header aria-label="Eco-Trace Scanner Navigation" class="bg-brand-deep-charcoal text-white p-4 sticky top-0 z-20 shadow-elevation-1 flex items-center justify-between">
      <h1 class="text-lg font-bold flex items-center gap-2">
        <svg class="w-5 h-5 text-brand-integrity-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
        Traceability Report
      </h1>
      <button @click="emit('reset')" class="text-sm border border-white/30 px-3 py-1 rounded-pill hover:bg-white/10 transition active:scale-95 font-medium">Scan Again</button>
    </header>
    
    <main class="w-full px-4 pt-6">
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-16 gap-4" role="status" aria-live="polite">
        <svg class="w-8 h-8 animate-spin text-brand-integrity-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        <p class="text-functional-neutral font-medium">Fetching secure history...</p>
      </div>
      
      <div v-else-if="isError" class="bg-functional-alert/10 border border-functional-alert p-4 rounded-md mt-4 shadow-subtle" role="alert">
        <h2 class="text-functional-alert font-bold flex items-center gap-1.5">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          Verification Failed
        </h2>
        <p class="text-sm text-brand-deep-charcoal mt-2">{{ error }}</p>
      </div>

      <div v-else-if="events.length === 0" class="text-center py-16 text-functional-neutral bg-surface-card rounded-md border border-surface-border mt-2 shadow-subtle">
        <svg class="w-12 h-12 mx-auto text-surface-border mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        <p class="font-medium text-brand-deep-charcoal">No history found</p>
        <p class="text-sm mt-1">This asset ID has no verified events.</p>
      </div>
      
      <div v-else class="flex flex-col gap-6">
        <div class="bg-surface-card p-4 rounded-md shadow-subtle border border-surface-border">
          <div class="bg-surface-canvas px-3 py-2 rounded text-center border border-surface-border/50">
             <p class="text-xs text-functional-neutral font-bold uppercase tracking-wider mb-1">Verified Asset ID</p>
             <p class="font-mono text-sm break-all font-medium text-brand-integrity-blue">{{ assetId }}</p>
          </div>
        </div>

        <FormulaRenderer :events="events" />
        <AuditTimeline :events="events" />
      </div>
    </main>
  </div>
</template>
