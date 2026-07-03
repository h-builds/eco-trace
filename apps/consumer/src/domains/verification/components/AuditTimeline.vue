<script setup lang="ts">
import { computed } from 'vue';
import type { SupplyChainEvent } from '@/lib/api/types';
import AuthenticityBadge from './AuthenticityBadge.vue';
import { useWasm, type WasmIntegrityResult } from '@/composables/useWasm';
import { UI_CONSTANTS } from '@/lib/demo/demoScenario';

const props = defineProps<{
  events: SupplyChainEvent[]
}>();

const { verifyIntegrity, isReady } = useWasm();

const getIntegrity = (event: SupplyChainEvent): WasmIntegrityResult['status'] => {
  if (!isReady.value) return 'PENDING';
  
  const { signature, public_key, integrity_status, ...payload } = event;
  
  const integrityResult = verifyIntegrity(payload, event.signature, event.public_key);
  
  if (integrityResult.status === 'VALID' && event.integrity_status === 'UNAUTHORIZED') {
     return 'UNAUTHORIZED';
  }
  
  return integrityResult.status;
};

const sortedEvents = computed(() => {
  return [...props.events].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
});

const ACTION_LABELS: Record<string, string> = {
  'ORIGIN': 'Origin registered',
  'TRANSFORM': 'Processing verified',
  'TRANSPORT': 'Transport verified',
  'AUDIT': 'Auditor reviewed',
};

const getEventLabel = (type: string) => ACTION_LABELS[type] || type;
</script>

<template>
  <div class="mt-6 flex flex-col gap-4">
    <h3 class="text-xl font-bold text-brand-deep-charcoal">Audit Trail</h3>

    <div class="relative border-l-2 border-surface-border pl-4 flex flex-col gap-6 ml-2 pb-2">
      <div
        v-for="event in sortedEvents"
        :key="event.id"
        class="relative"
      >
        <span class="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-brand-integrity-green ring-4 ring-surface-canvas" />

        <div class="bg-surface-card rounded-md shadow-subtle border border-surface-border flex flex-col gap-2 p-3 relative overflow-hidden">
          <div
            v-if="getIntegrity(event) === 'INVALID' || getIntegrity(event) === 'UNAUTHORIZED'"
            class="absolute left-0 top-0 bottom-0 w-1 bg-functional-alert z-10"
          />
          <div
            v-else-if="getIntegrity(event) === 'WARNING'"
            class="absolute left-0 top-0 bottom-0 w-1 bg-functional-pending z-10"
          />

          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-brand-deep-charcoal">{{ getEventLabel(event.action_type) }}</span>
            <AuthenticityBadge :status="getIntegrity(event)" />
          </div>

          <div
            v-if="getIntegrity(event) === 'INVALID' || getIntegrity(event) === 'UNAUTHORIZED'"
            class="text-xs bg-functional-alert/10 text-functional-alert px-2 py-1 border border-functional-alert/20 font-medium rounded-md"
          >
            Auditor-only finding: Event failed integrity or authorization checks.
          </div>

          <div class="text-xs text-functional-neutral grid grid-cols-2 gap-2 mt-1">
            <div class="flex flex-col">
              <span class="font-medium mb-1">Actor <span class="text-[10px] text-functional-neutral font-normal">({{ UI_CONSTANTS.DEMO_DATA_ONLY }})</span></span>
              <span
                class="font-mono font-medium text-brand-deep-charcoal break-all line-clamp-1"
                :title="event.actor_id"
              >
                {{ event.actor_id }}
              </span>
            </div>
            <div class="flex flex-col text-right">
              <span class="font-medium mb-1">Time</span>
              <span class="font-mono font-medium text-brand-deep-charcoal">{{ new Date(event.timestamp).toLocaleString() }}</span>
            </div>
          </div>

          <div
            v-if="event.esg_metadata?.energy_kwh !== undefined && event.esg_metadata?.emission_factor !== undefined"
            class="text-xs bg-surface-canvas p-2 rounded-md border border-surface-border flex justify-between"
          >
            <span><span class="font-medium">Energy:</span> <span class="font-mono font-medium text-brand-deep-charcoal">{{ event.esg_metadata.energy_kwh }} kWh</span></span>
            <span><span class="font-medium">Intensity:</span> <span class="font-mono font-medium text-brand-deep-charcoal">{{ event.esg_metadata.emission_factor }} kgCO2e/kWh</span></span>
          </div>

          <details class="text-xs mt-2 group">
            <summary class="cursor-pointer text-brand-integrity-green font-medium select-none flex items-center gap-1 min-h-12 min-w-12">
              <svg class="w-3 h-3 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              Technical details
            </summary>
            <div class="mt-2 bg-surface-canvas p-2 rounded-md border border-surface-border flex flex-col gap-2 font-mono text-[10px] text-functional-neutral break-all">
              <div>
                <strong class="text-brand-deep-charcoal block mb-0.5">Event ID:</strong>
                {{ event.event_id || event.id }}
              </div>
              <div v-if="event.public_key">
                <strong class="text-brand-deep-charcoal block mb-0.5">Public Key (Ed25519):</strong>
                {{ event.public_key }}
              </div>
              <div v-if="event.signature">
                <strong class="text-brand-deep-charcoal block mb-0.5">Signature:</strong>
                {{ event.signature }}
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>
