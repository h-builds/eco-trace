<script setup lang="ts">
import { computed } from 'vue';
import type { SupplyChainEvent } from '@/lib/api/types';
import { useWasm } from '@/composables/useWasm';

const props = defineProps<{
  events: SupplyChainEvent[]
}>();

const { isReady, calculateFootprint } = useWasm();

const calculationResult = computed(() => {
  if (!isReady.value) return { result: 0, error: 'Engine not ready' };
  
  const entries = props.events
    .filter(e => e.energy_kwh != null && e.emission_factor != null)
    .map(e => ({
      energy_kwh: Number(e.energy_kwh),
      emission_factor: Number(e.emission_factor)
    }));
    
  return calculateFootprint(entries);
});
</script>

<template>
  <div class="bg-surface-card p-4 rounded-md shadow-subtle border border-surface-border">
    <h3 class="text-md font-medium text-brand-deep-charcoal mb-2">Carbon Footprint</h3>
    <div class="font-mono text-xs text-functional-neutral mb-3 bg-surface-canvas p-3 border border-surface-border rounded-sm overflow-x-auto whitespace-nowrap">
      <span class="block mb-1 font-bold">CF_{total} = Σ(E_i × EF_i)</span>
      <div v-for="(event, idx) in events" :key="idx">
         <span v-if="event.energy_kwh !== undefined && event.emission_factor !== undefined">
           + ({{ event.energy_kwh }} × {{ event.emission_factor }})
         </span>
      </div>
    </div>
    <div class="flex items-center justify-between mt-4 border-t border-surface-border pt-3">
      <span class="text-sm font-medium text-brand-deep-charcoal">Total Impact</span>
      <div class="text-xl font-bold" :class="calculationResult.error ? 'text-functional-alert' : 'text-brand-verification-green'">
         <span v-if="!isReady" class="text-sm text-functional-neutral font-normal animate-pulse">Calculating...</span>
         <span v-else-if="calculationResult.error" class="text-sm">{{ calculationResult.error }}</span>
         <span v-else>{{ calculationResult.result.toFixed(2) }} <span class="text-sm text-functional-neutral font-normal">kgCO2e</span></span>
      </div>
    </div>
  </div>
</template>
