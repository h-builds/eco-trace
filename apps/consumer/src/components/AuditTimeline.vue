<script setup lang="ts">
import type { SupplyChainEvent } from '@/lib/api/types';
import AuthenticityBadge from './AuthenticityBadge.vue';
import { useWasm, type WasmIntegrityResult } from '@/composables/useWasm';

const props = defineProps<{
  events: SupplyChainEvent[]
}>();

const { verifyIntegrity, isReady } = useWasm();

const getIntegrity = (event: SupplyChainEvent): WasmIntegrityResult['status'] => {
  if (!isReady.value) return 'PENDING';
  
  const { signature, public_key, integrity_status, ...payload } = event as SupplyChainEvent & Record<string, unknown>;
  
  const res = verifyIntegrity(payload, event.signature, event.public_key);
  
  if (res.status === 'VALID' && event.integrity_status === 'UNAUTHORIZED') {
     return 'UNAUTHORIZED';
  }
  
  return res.status;
};
</script>

<template>
  <div class="mt-6 flex flex-col gap-4">
    <h3 class="text-md font-bold text-brand-deep-charcoal">Audit Trail</h3>
    <div class="relative border-l-2 border-surface-border pl-4 flex flex-col gap-6 ml-2 pb-2">
      <div v-for="event in events" :key="event.id" class="relative">
        <span class="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-brand-integrity-blue ring-4 ring-surface-canvas"></span>
        
        <div class="bg-surface-card p-3 rounded-md shadow-subtle border border-surface-border flex flex-col gap-2 relative overflow-hidden">
          <div v-if="getIntegrity(event) === 'INVALID' || getIntegrity(event) === 'UNAUTHORIZED'" class="absolute left-0 top-0 bottom-0 w-1 bg-functional-alert"></div>
          <div v-else-if="getIntegrity(event) === 'WARNING'" class="absolute left-0 top-0 bottom-0 w-1 bg-functional-pending"></div>
          
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-brand-deep-charcoal">{{ event.action_type }}</span>
            <AuthenticityBadge :status="getIntegrity(event)" />
          </div>
          
          <div class="text-xs text-functional-neutral grid grid-cols-2 gap-2 mt-1">
            <div class="flex flex-col">
              <span class="font-medium text-brand-deep-charcoal">Actor:</span> 
              <span class="font-mono break-all line-clamp-1" :title="event.actor_id">{{ event.actor_id }}</span>
            </div>
            <div class="flex flex-col text-right">
              <span class="font-medium text-brand-deep-charcoal">Time:</span> 
              <span>{{ new Date(event.timestamp).toLocaleString() }}</span>
            </div>
          </div>
          
          <div v-if="event.energy_kwh !== undefined && event.emission_factor !== undefined" class="text-xs bg-surface-canvas p-2 rounded-sm mt-1 border border-surface-border flex justify-between">
            <span>Energy: <span class="font-medium text-brand-deep-charcoal">{{ event.energy_kwh }} kWh</span></span>
            <span>Intensity: <span class="font-medium text-brand-deep-charcoal">{{ event.emission_factor }} kgCO2e/kWh</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
