<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  status: "VALID" | "INVALID" | "UNAUTHORIZED" | "PENDING" | "WARNING"
}>();

const badgeStyle = computed(() => {
  switch (props.status) {
    case 'VALID':
      return 'bg-brand-verification-green/10 text-brand-verification-green border-brand-verification-green';
    case 'INVALID':
    case 'UNAUTHORIZED':
      return 'bg-functional-alert/10 text-functional-alert border-functional-alert';
    case 'WARNING':
      return 'bg-functional-pending/10 text-functional-pending border-functional-pending';
    default:
      return 'bg-functional-neutral/10 text-functional-neutral border-functional-neutral';
  }
});
</script>

<template>
  <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill border text-sm font-medium" :class="badgeStyle">
    <svg v-if="status === 'VALID'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    <svg v-else-if="status === 'WARNING'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
    <svg v-else-if="status === 'INVALID' || status === 'UNAUTHORIZED'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
    <span>{{ status }}</span>
  </div>
</template>
