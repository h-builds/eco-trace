<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  status: "VALID" | "INVALID" | "UNAUTHORIZED" | "PENDING" | "WARNING",
  showExplanation?: boolean
}>(), {
  showExplanation: false
});

const badgeStyle = computed(() => {
  switch (props.status) {
    case 'VALID':
      return 'bg-brand-verification-green text-white border-brand-verification-green';
    case 'INVALID':
    case 'UNAUTHORIZED':
      return 'bg-functional-alert text-white border-functional-alert';
    case 'WARNING':
      return 'bg-functional-pending text-white border-functional-pending';
    default:
      return 'bg-functional-neutral text-white border-functional-neutral';
  }
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <div
      class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold"
      :class="badgeStyle"
    >
      <svg
      v-if="status === 'VALID'"
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
    <svg
      v-else-if="status === 'WARNING'"
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
    <svg
      v-else-if="status === 'INVALID' || status === 'UNAUTHORIZED'"
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
    <svg
      v-else
      class="w-4 h-4 animate-spin"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>

    <span class="font-mono uppercase tracking-widest">{{ status }}</span>
    </div>
    
    <p
      v-if="showExplanation && status !== 'PENDING'"
      class="text-xs text-functional-neutral max-w-sm leading-snug"
    >
      <template v-if="status === 'VALID'">The product history matches trusted actor signatures.</template>
      <template v-else-if="status === 'WARNING'">The product data is readable, but one validation check needs review.</template>
      <template v-else-if="status === 'INVALID'">The payload appears modified or failed integrity checks.</template>
      <template v-else-if="status === 'UNAUTHORIZED'">The signature may be valid, but the actor is not trusted.</template>
    </p>
  </div>
</template>
