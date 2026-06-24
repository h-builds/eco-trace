<script setup lang="ts">
import { ref } from 'vue';
import { getAdminUrl } from '@/lib/env';

defineEmits<{
  (e: 'navigate', view: 'scanner'): void;
  (e: 'demoProduct'): void;
}>();

const viewLedgerHover = ref(false);
</script>

<template>
  <section
    class="w-full"
    style="border-bottom: 1px solid var(--outline-bp-ghost);"
  >
    <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-16">
      <div class="lg:col-span-8 space-y-8">
        <div
          class="inline-flex items-center gap-3 px-3 py-1"
          style="background-color: var(--color-bp-tertiary-container);"
        >
          <span
            class="w-2 h-2 bg-[--color-bp-success]"
            style="box-shadow: 0 0 8px rgba(40,122,51,0.5);"
          />
          <span
            class="font-mono text-[10px] uppercase tracking-widest font-bold"
            style="color: var(--color-bp-on-tertiary-container);"
          >
            Edge Node: Connected
          </span>
        </div>

        <h1
          class="font-['Space_Grotesk'] text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] uppercase italic"
          style="color: var(--color-bp-on-surface);"
        >
          Product claims, <br />
          <span style="color: var(--color-bp-primary);">verified.</span>
        </h1>
        
        <p
          class="font-mono text-sm leading-relaxed"
          style="color: var(--color-bp-on-surface-variant); max-width: 480px;"
        >
          A public verification surface for a two-app enterprise trust architecture.
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
          <button
            id="cta-use-demo-product"
            class="cta-primary w-full sm:w-auto px-8 py-4 font-['Space_Grotesk'] font-bold text-sm uppercase tracking-widest text-[color:var(--color-bp-on-primary-container)] flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all"
            @click="$emit('demoProduct')"
          >
            <svg
              class="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Use Demo Product
          </button>

          <button
            id="cta-launch-scanner"
            class="w-full sm:w-auto px-8 py-4 font-['Space_Grotesk'] font-bold text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-3"
            :style="{
              border: '1px solid var(--color-bp-primary)',
              color: 'var(--color-bp-primary)',
              backgroundColor: viewLedgerHover ? 'rgba(142,213,180,0.1)' : 'transparent'
            }"
            @mouseover="viewLedgerHover = true"
            @mouseleave="viewLedgerHover = false"
            @focus="viewLedgerHover = true"
            @blur="viewLedgerHover = false"
            @click="$emit('navigate', 'scanner')"
          >
            <svg
              class="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 7V5a2 2 0 012-2h2" />
              <path d="M17 3h2a2 2 0 012 2v2" />
              <path d="M21 17v2a2 2 0 01-2 2h-2" />
              <path d="M7 21H5a2 2 0 01-2-2v-2" />
              <rect
                x="7"
                y="7"
                width="10"
                height="10"
              />
            </svg>
            Open QR Scanner
          </button>
        </div>

        <div class="pt-4">
          <a
            :href="getAdminUrl()"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:underline transition-all"
            style="color: var(--color-bp-primary);"
          >
            Open Auditor Workstation
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      <div
        class="hidden md:block lg:col-span-4 aspect-square bg-white overflow-hidden group"
        style="border: 1px solid var(--outline-bp-ghost);"
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcjp2OswkdUAjvl_uLAILrUDQAWm-lmyvtFSbtEZd4vRubV1vBx8EVUllI72DH7rOOMaBLVltEMJOzUuTb_jQPJ4vKpLoh5qGn4FnaAgTBxF_za3Cyjc9-hWqh-PUmY9mt0oKlJ9HMkV1r2UUaFj05EYAevzFv4v1YOUg3eyLW5GPfc0dJ1FyZQQNIYcbCUFQ3c6nGnM55x6Q3mmPdgHbmuklQiDSfKUd0xZa_i9eaakvMbujDRVVLJz1v2ibNGsYn8-VJb0v8pF4"
          alt="Technical Hardware — Close-up of high-end circuit board with glowing green LED lights"
          class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-primary {
  background: var(--gradient-bp-integrity);
  position: relative;
}
.cta-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: #ffffff;
  opacity: 0.06;
  pointer-events: none;
}
</style>
