<script setup lang="ts">
defineProps<{
  wasmInitLabel: string;
  complianceRatio: number;
}>();
</script>

<template>
  <section class="w-full">
    <div class="flex items-center justify-between mb-4">
      <h2
        class="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
        style="color: var(--color-bp-on-surface-variant);"
      >
        Technical Specifications // v3.5
      </h2>
      <span
        class="font-mono text-[10px]"
        style="color: var(--color-bp-primary); opacity: 1;"
      >
        [SYS_AUTH_VERIFIED]
      </span>
    </div>

    <div class="bento-grid">
      <div
        class="bento-tile bento-tile--wide group"
        style="background: var(--color-bp-surface-container-lowest); border: 1px solid var(--outline-bp-ghost);"
      >
        <div class="bento-tile__header">
          <svg
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            style="color: var(--color-bp-primary);"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
          <span class="bento-chip">01</span>
        </div>
        <div class="bento-tile__body">
          <h3
            class="font-['Space_Grotesk'] text-2xl font-bold tracking-tight uppercase mb-2"
            style="color: var(--color-bp-on-surface);"
          >
            Zero-Trust Scanner
          </h3>
          <p
            class="text-sm leading-relaxed"
            style="color: var(--color-bp-on-surface-variant);"
          >
            High-speed verification of product integrity at the Edge. Our edge-native scanning engine
            ensures that every interaction is cryptographically signed before data retrieval.
          </p>
        </div>
      </div>

      <div
        class="bento-tile bento-tile--wide group"
        style="background: var(--color-bp-surface-container-lowest); border: 1px solid var(--outline-bp-ghost);"
      >
        <div class="bento-tile__header">
          <svg
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            style="color: var(--color-bp-primary);"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <span class="bento-chip">02</span>
        </div>
        <div class="bento-tile__body">
          <h3
            class="font-['Space_Grotesk'] text-2xl font-bold tracking-tight uppercase mb-2"
            style="color: var(--color-bp-on-surface);"
          >
            Eliminate ESG Fraud
          </h3>
          <p
            class="text-sm leading-relaxed"
            style="color: var(--color-bp-on-surface-variant);"
          >
            Transitioning from vague corporate "promises" to immutable
            <span
              class="italic font-bold"
              style="color: var(--color-bp-primary);"
            >
              cryptographic proof
            </span>.
            Every carbon credit is traceable to its origin node.
          </p>
        </div>
      </div>

      <div
        class="bento-tile bento-tile--feature"
        style="background: var(--color-bp-surface-container-lowest); border: 1px solid var(--outline-bp-ghost);"
      >
        <div class="bento-tile__feature-content">
          <div class="space-y-4">
            <div
              class="font-mono text-[10px] font-bold"
              style="color: var(--color-bp-success);"
            >
              [RUNTIME_OPTIMIZED]
            </div>
            <h3
              class="font-['Space_Grotesk'] text-2xl font-bold tracking-tight uppercase"
              style="color: var(--color-bp-on-surface);"
            >
              Vue 3.5 Vapor + Go/Wasm
            </h3>
            <p
              class="text-sm leading-relaxed"
              style="color: var(--color-bp-on-surface-variant);"
            >
              Zero-overhead rendering designed for mobile efficiency. Shared validation logic via WebAssembly
              ensures consistency across platforms.
            </p>
            <div class="flex gap-2">
              <span class="bento-metric-chip">WASM: 2.6MB</span>
              <span class="bento-metric-chip">{{ wasmInitLabel }}</span>
            </div>
          </div>
          <div
            class="hidden md:block bento-tile__feature-img"
            style="background-color: var(--color-bp-surface-container);"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPuaoLg6LZuQpsdOX4jjmfmD6HFkxzYAMI8lo5-0aNrTVT4tdlwRHVyOYX1cFprb8BSzc_spa_X-JmA8iED0BjmyKlJObw5nurq0l73C6U3cVl7MCKO4K6sfG9rCBT3rqL8TvQwXH1P9LyUB1Y0mqBY0NhrV1Dx-62SsMBkYrIt9qaiPl42iz1EfOm58dQVeQ1xaX99pYzqwVDMSB962IuWPDUiG46EYJfupFbm9QLG7Gm0awnhxC-BBNK4cLl86XYLvKsK1pKqT8"
              alt="Code on screen — macro photo of glowing lines of code on a dark screen"
              class="bento-tile__feature-img-inner"
            />
          </div>
        </div>
      </div>

      <div
        class="bento-tile bento-tile--accent"
        style="background-color: var(--color-bp-primary-container);"
      >
        <div
          class="font-mono text-4xl font-black italic tracking-tighter leading-none"
          style="color: var(--color-bp-on-primary-container);"
        >
          &lt;100ms
        </div>
        <div class="space-y-4">
          <h3
            class="font-['Space_Grotesk'] font-bold text-xl uppercase leading-tight"
            style="color: var(--color-bp-on-primary-container);"
          >
            Edge Database (D1)
          </h3>
          <p
            class="text-xs font-medium"
            style="color: var(--color-bp-on-primary-container); opacity: 0.9;"
          >
            Real-time carbon footprint calculations delivered via Cloudflare's global edge network.
          </p>
          <div
            class="bento-progress-bar"
            style="background-color: var(--color-bp-surface-variant);"
            role="progressbar"
            :aria-valuenow="complianceRatio"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="`Compliance: ${complianceRatio}%`"
          >
            <div
              class="bento-progress-bar__fill"
              :style="{ backgroundColor: 'var(--color-bp-on-primary-container)', width: complianceRatio + '%' }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto auto;
  gap: 1rem;
}

.bento-tile--wide {
  grid-column: span 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  gap: 3rem;
  transition: border-color 0.2s;
}
.bento-tile--wide:hover {
  border-color: rgba(142, 213, 180, 0.4) !important;
}

.bento-tile--feature {
  grid-column: span 6;
  padding: 1.5rem;
}

.bento-tile--accent {
  grid-column: span 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  gap: 1.5rem;
  min-height: 200px;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .bento-tile--wide    { grid-column: span 2; }
  .bento-tile--feature { grid-column: span 4; }
  .bento-tile--accent  { grid-column: span 2; }
}

@media (min-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(6, 1fr);
  }
  .bento-tile--wide    { grid-column: span 3; }
  .bento-tile--feature { grid-column: span 4; }
  .bento-tile--accent  { grid-column: span 2; }
}

.bento-tile__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.bento-tile__feature-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  height: 100%;
}
@media (min-width: 640px) {
  .bento-tile__feature-content {
    grid-template-columns: 1fr 1fr;
  }
}

.bento-tile__feature-img {
  height: 100%;
  min-height: 160px;
  overflow: hidden;
}
.bento-tile__feature-img-inner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
  transition: opacity 1s ease;
}
.bento-tile__feature-img:hover .bento-tile__feature-img-inner {
  opacity: 1;
}

.bento-chip {
  font-family: var(--font-bp-mono, 'Geist Mono', monospace);
  font-size: 10px;
  background-color: var(--color-bp-surface-container);
  color: var(--color-bp-on-surface-variant);
  padding: 3px 8px;
}

.bento-metric-chip {
  display: inline-block;
  font-family: var(--font-bp-mono, 'Geist Mono', monospace);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 8px;
  background-color: var(--color-bp-primary-container);
  color: var(--color-bp-on-primary-container);
}

.bento-progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
}
.bento-progress-bar__fill {
  height: 100%;
  background: rgba(255, 255, 255, 1);
  transition: width 0.6s ease;
}
</style>
