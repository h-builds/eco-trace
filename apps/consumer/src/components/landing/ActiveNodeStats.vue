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
          style="color: var(--color-bp-on-surface-variant); border-bottom: 1px solid var(--outline-bp-ghost);"
        >
          Active Nodes
        </div>
        <div class="space-y-2">
          <div v-if="isLoading" class="font-mono text-sm" style="color: var(--color-bp-on-surface-variant);">
            LOADING...
          </div>
          <div
            v-else
            v-for="node in activeNodes"
            :key="node"
            class="flex justify-between font-mono text-sm"
          >
            <span style="color: var(--color-bp-on-surface-variant);">{{ node }}</span>
            <span
              class="font-bold"
              style="color: var(--color-bp-tertiary);"
            >
              ACTIVE
            </span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div
          class="font-mono text-[10px] uppercase tracking-widest font-bold pb-2"
          style="color: var(--color-bp-on-surface-variant); border-bottom: 1px solid var(--outline-bp-ghost);"
        >
          Global Ledger
        </div>
        <div class="flex items-baseline gap-2">
          <span
            class="font-['Space_Grotesk'] text-3xl font-bold"
            style="color: var(--color-bp-primary);"
          >
            {{ isLoading ? '...' : globalLedgerTotal }}
          </span>
          <span
            class="font-mono text-xs"
            style="color: var(--color-bp-on-surface-variant);"
          >
            EVENTS
          </span>
        </div>
      </div>

      <div class="space-y-4">
        <div
          class="font-mono text-[10px] uppercase tracking-widest font-bold pb-2"
          style="color: var(--color-bp-on-surface-variant); border-bottom: 1px solid var(--outline-bp-ghost);"
        >
          Compliance Rating
        </div>
        <div class="flex items-center gap-4">
          <span
            class="trust-chip"
            :style="isError ? 'background-color: var(--color-bp-error-container); color: var(--color-bp-on-error-container)' : (isLoading ? 'background-color: var(--color-bp-surface-container-high); color: var(--color-bp-on-surface)' : (!hasEvents ? 'background-color: var(--color-bp-surface-variant); color: var(--color-bp-on-surface-variant)' : (!isFullyCompliant ? 'background-color: var(--color-bp-error-container); color: var(--color-bp-on-error-container)' : 'background-color: var(--color-bp-success-container); color: var(--color-bp-on-success-container)')))"
          >
            {{ isError ? 'ERROR' : (isLoading ? 'LOADING...' : (!hasEvents ? 'NO DATA' : (isFullyCompliant ? 'VERIFIED' : 'WARNING'))) }}
          </span>
          <span
            class="text-xs font-medium"
            style="color: var(--color-bp-on-surface-variant);"
          >
            {{ isError ? 'Failed to load data' : (isLoading ? 'Fetching status...' : (!hasEvents ? 'No events recorded' : (isFullyCompliant ? 'ISO-14064 Ready' : 'Audit Required'))) }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-chip {
  display: inline-block;
  background-color: var(--color-bp-tertiary-container);
  color: var(--color-bp-on-tertiary-container);
  font-family: 'Geist Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 12px;
}
</style>
