<script setup lang="ts">
import { useScanner } from '@/composables/useScanner';
import { SCENARIO_METADATA, UI_CONSTANTS } from '@/lib/demo/demoScenario';
import { getAdminUrl } from '@/lib/env';

const emit = defineEmits<{
  (e: 'scan', value: string): void;
}>();

const { state, error, videoRef, start } = useScanner((val) => {
  emit('scan', val);
});

const ADMIN_URL = getAdminUrl();
</script>

<template>
  <div class="min-h-screen bg-brand-deep-charcoal flex flex-col items-center justify-center p-4">
    <h1 class="text-xl font-bold text-brand-integrity-green mb-4 text-center">Zero-Knowledge Scanner</h1>

    <div class="w-full flex-1 min-h-[50vh] bg-surface-card/10 rounded-lg overflow-hidden relative border border-surface-border/20 shadow-elevation-1 flex items-center justify-center">
      <video
        ref="videoRef"
        class="w-full h-full object-cover"
        playsinline
        muted
      />

      <div
        v-if="state === 'idle'"
        class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-brand-deep-charcoal overflow-y-auto"
      >
        <svg
          class="w-12 h-12 text-brand-integrity-green mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        <p class="text-white font-medium mb-6">Scan an Eco-Trace QR code to verify product authenticity.</p>

        <div class="w-full px-8 space-y-6 max-w-sm">
          <button
            class="bg-brand-integrity-green text-white px-6 py-3 rounded-pill font-bold shadow-subtle hover:bg-opacity-90 transition active:scale-95 text-lg w-full"
            @click="start"
          >
            Start Scanner
          </button>

          <div class="pt-4 border-t border-white/10 flex flex-col items-center">
            <span class="text-white/60 text-xs block mb-1">
              {{ UI_CONSTANTS.NO_CAMERA_REQUIRED }}
            </span>
            <button
              class="text-brand-integrity-green hover:underline font-bold text-sm uppercase tracking-wider"
              @click="emit('scan', SCENARIO_METADATA.assetId)"
            >
              {{ UI_CONSTANTS.SCANNER_FALLBACK }}
            </button>
          </div>

          <div class="pt-4 border-t border-white/10 flex flex-col items-center">
            <span class="text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Demo QR Code</span>
            <img
              src="/qr-demo.png"
              alt="Demo QR Code for ASSET-COFFEE-2026-001"
              class="w-32 h-32 bg-white p-2 rounded shadow-md"
            />
            <p class="text-white/40 text-[10px] mt-2 mb-4">Scan this code from another device or use the demo button.</p>
            <a
              :href="ADMIN_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="text-white/60 hover:text-white transition text-xs font-medium underline underline-offset-2"
            >
              Open Auditor Workstation
            </a>
          </div>
        </div>
      </div>

      <div
        v-if="state === 'requesting'"
        class="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 bg-brand-deep-charcoal"
      >
        <svg
          class="w-8 h-8 animate-spin text-white mb-4"
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

        <p class="text-white text-sm">Requesting camera access...</p>
      </div>

      <div
        v-if="state === 'granted'"
        class="absolute inset-0 pointer-events-none z-10"
      >
        <div class="w-full h-full flex items-center justify-center">
          <div class="w-2/3 aspect-square border-2 border-brand-verification-green rounded-lg shadow-[0_0_0_9999px_rgba(26,28,30,0.6)]" />
        </div>
      </div>

      <div
        v-if="state === 'denied' || state === 'unavailable'"
        class="absolute inset-0 flex flex-col items-center justify-center p-6 bg-brand-deep-charcoal z-10 overflow-y-auto"
      >
        <svg
          class="w-12 h-12 text-functional-alert mb-4"
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

        <p class="text-functional-alert font-bold text-center mb-2">Camera Unavailable</p>
        <p class="text-white text-sm text-center mb-6 max-w-xs">{{ error }}</p>

        <div class="flex flex-col gap-4 w-full max-w-xs">
          <button
            class="border border-white text-white px-4 py-2 rounded-pill font-medium hover:bg-white/10 transition"
            @click="start"
          >
            Try Again
          </button>

          <button
            class="bg-brand-integrity-green text-white px-4 py-3 rounded-pill font-bold hover:bg-opacity-90 transition shadow-subtle"
            @click="emit('scan', SCENARIO_METADATA.assetId)"
          >
            {{ UI_CONSTANTS.SCANNER_FALLBACK }}
          </button>

          <div class="pt-2 text-center">
            <a
              :href="ADMIN_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="text-white/60 hover:text-white transition text-xs font-medium underline underline-offset-2"
            >
              Open Auditor Workstation
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
