<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useEventHistory } from '@/composables/useEventHistory';
import { useWasm } from '@/composables/useWasm';
import HeroSection from '@/components/landing/HeroSection.vue';
import BentoDashboard from '@/components/landing/BentoDashboard.vue';
import InteropCallout from '@/components/landing/InteropCallout.vue';
import ActiveNodeStats from '@/components/landing/ActiveNodeStats.vue';
import ConsumerFooter from '@/components/landing/ConsumerFooter.vue';

defineEmits<{
  (e: 'navigate', view: 'scanner'): void;
  (e: 'demoProduct'): void;
}>();

const { events, isLoading, isError, fetchHistory } = useEventHistory();
const { isReady: wasmReady } = useWasm();

const wasmInitMs = ref<number | null>(null);
const wasmLoadStart = performance.now();

onMounted(async () => {
  fetchHistory();
  const checkReady = () => {
    if (wasmReady.value) {
      wasmInitMs.value = Math.round(performance.now() - wasmLoadStart);
    } else {
      setTimeout(checkReady, 5);
    }
  };
  checkReady();
});

const activeNodes = computed(() => {
  const uniqueNodes = new Set<string>();
  for (const event of events.value) {
    if (event.actor_id) {
      uniqueNodes.add(event.actor_id);
    }
  }
  return Array.from(uniqueNodes).slice(0, 3);
});

const globalLedgerTotal = computed(() => events.value.length);

const isFullyCompliant = computed(() => {
  if (events.value.length === 0) return false;
  return events.value.every(e => e.integrity_status === 'VALID');
});

const complianceRatio = computed(() => {
  if (events.value.length === 0) return 0;
  const validCount = events.value.filter(e => e.integrity_status === 'VALID').length;
  return Math.round((validCount / events.value.length) * 100);
});

const wasmInitLabel = computed(() => {
  if (wasmInitMs.value === null) return 'INIT: …';
  return `INIT: ${wasmInitMs.value}ms`;
});

const hasEvents = computed(() => events.value.length > 0);
</script>

<template>
  <div class="w-full bg-surface-canvas text-brand-deep-charcoal">
    <div class="space-y-16">
      <HeroSection
        @navigate="$emit('navigate', $event)"
        @demo-product="$emit('demoProduct')"
      />
      <BentoDashboard
        :wasm-init-label="wasmInitLabel"
        :compliance-ratio="complianceRatio"
      />
      <InteropCallout />
      <ActiveNodeStats
        :active-nodes="activeNodes"
        :global-ledger-total="globalLedgerTotal"
        :is-loading="isLoading"
        :is-error="isError"
        :is-fully-compliant="isFullyCompliant"
        :compliance-ratio="complianceRatio"
        :has-events="hasEvents"
      />
    </div>
    <ConsumerFooter />
  </div>
</template>
