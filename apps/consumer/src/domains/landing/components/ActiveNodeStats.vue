<script setup lang="ts">
defineProps<{
  activeNodes: string[];
  globalLedgerTotal: number;
  isLoading: boolean;
  isError: boolean;
  isFullyCompliant: boolean;
  complianceRatio: number;
  hasEvents: boolean;
}>();
</script>

<template>
  <section
    class="w-full pt-8"
  >
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="space-y-4">
        <div
          class="font-mono text-[10px] uppercase tracking-widest font-bold pb-2"
          style="color: var(--color-functional-neutral); border-bottom: 1px solid var(--color-surface-border);"
        >
          Active Nodes
        </div>
        <div class="space-y-2">
          <div v-if="isLoading" class="font-mono text-sm" style="color: var(--color-functional-neutral);">
            LOADING...
          </div>
          <div
            v-else
            v-for="node in activeNodes"
            :key="node"
            class="flex justify-between font-mono text-sm"
          >
            <span style="color: var(--color-functional-neutral);">{{ node }}</span>
            <span
              class="font-bold"
              style="color: var(--color-brand-integrity-green);"
            >
              ACTIVE
            </span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div
          class="font-mono text-[10px] uppercase tracking-widest font-bold pb-2"
          style="color: var(--color-functional-neutral); border-bottom: 1px solid var(--color-surface-border);"
        >
          Global Ledger
        </div>
        <div class="flex items-baseline gap-2">
          <span
            class="font-['Space_Grotesk'] text-3xl font-bold"
            style="color: var(--color-brand-deep-charcoal);"
          >
            {{ isLoading ? '...' : globalLedgerTotal }}
          </span>
          <span
            class="font-mono text-xs"
            style="color: var(--color-functional-neutral);"
          >
            EVENTS
          </span>
        </div>
      </div>

      <div class="space-y-4">
        <div
          class="font-mono text-[10px] uppercase tracking-widest font-bold pb-2"
          style="color: var(--color-functional-neutral); border-bottom: 1px solid var(--color-surface-border);"
        >
          Compliance Rating
        </div>
        <div class="flex items-center gap-4">
          <span
            class="trust-chip"
            :style="isError ? 'background-color: var(--color-functional-alert); color: #ffffff' : (isLoading ? 'background-color: var(--color-surface-border); color: var(--color-brand-deep-charcoal)' : (!hasEvents ? 'background-color: var(--color-surface-border); color: var(--color-functional-neutral)' : (!isFullyCompliant ? 'background-color: var(--color-functional-alert); color: #ffffff' : 'background-color: var(--color-brand-verification-green); color: #ffffff')))"
          >
            {{ isError ? 'ERROR' : (isLoading ? 'LOADING...' : (!hasEvents ? 'NO DATA' : (isFullyCompliant ? 'VERIFIED' : 'WARNING'))) }}
          </span>
          <span
            class="text-xs font-medium"
            style="color: var(--color-functional-neutral);"
          >
            {{ isError ? 'Failed to load data' : (isLoading ? 'Fetching status...' : (!hasEvents ? 'No events recorded' : (isFullyCompliant ? 'Scenario Verified' : 'Audit Required'))) }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-chip {
  display: inline-block;
  background-color: var(--color-brand-integrity-green);
  color: #ffffff;
  font-family: 'Geist Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 12px;
}
</style>
