<script setup lang="ts">
defineEmits<{
  (e: 'navigate', view: 'scanner'): void;
}>();
</script>

<template>
  <div class="w-full bg-surface-canvas text-brand-deep-charcoal">
    <section
      class="w-full px-4 pt-28 pb-16 md:px-8 md:pt-36"
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
            High-Performance <br />
            <span style="color: var(--color-bp-primary);">ESG Product</span> <br />
            Transparency.
          </h1>

          <div class="flex flex-col sm:flex-row gap-4">
            <button
              id="cta-launch-scanner"
              class="cta-primary w-full sm:w-auto px-8 py-4 font-['Space_Grotesk'] font-bold text-sm uppercase tracking-widest text-white flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all"
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
              Launch QR Scanner
            </button>

            <button
              class="w-full sm:w-auto px-8 py-4 font-['Space_Grotesk'] font-bold text-sm uppercase tracking-widest transition-colors"
              style="border: 1px solid var(--color-bp-primary); color: var(--color-bp-primary); background: transparent;"
              onmouseover="this.style.backgroundColor='rgba(142,213,180,0.1)'"
              onmouseout="this.style.backgroundColor='transparent'"
            >
              View Ledger
            </button>
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

    <section class="w-full px-4 py-16 md:px-8 md:py-20">
      <div class="flex items-center justify-between mb-4">
        <h2
          class="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
          style="color: var(--color-bp-outline);"
        >
          Technical Specifications // v3.5
        </h2>
        <span
          class="font-mono text-[10px]"
          style="color: var(--color-bp-primary); opacity: 0.6;"
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
                <span class="bento-metric-chip">INIT: &lt;50ms</span>
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
          style="background: var(--color-bp-primary);"
        >
          <div
            class="font-mono text-4xl font-black italic tracking-tighter leading-none"
            style="color: var(--color-bp-on-primary);"
          >
            &lt;100ms
          </div>
          <div class="space-y-4">
            <h3
              class="font-['Space_Grotesk'] font-bold text-xl uppercase leading-tight"
              style="color: var(--color-bp-on-primary);"
            >
              Edge Database (D1)
            </h3>
            <p
              class="text-xs font-medium"
              style="color: var(--color-bp-on-primary); opacity: 0.9;"
            >
              Real-time carbon footprint calculations delivered via Cloudflare's global edge network.
            </p>
            <div class="bento-progress-bar">
              <div class="bento-progress-bar__fill" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full px-4 md:px-8 pb-16 md:pb-20">
      <div class="w-full collab-bridge">
        <div class="w-full sm:w-3/4 space-y-6">
          <h2
            class="font-mono text-xs font-bold tracking-[0.3em] uppercase"
            style="color: var(--color-bp-primary);"
          >
            Framework Interoperability
          </h2>

          <p
            class="font-['Space_Grotesk'] text-2xl md:text-3xl font-light leading-snug"
            style="color: var(--color-bp-on-surface);"
          >
            This ecosystem demonstrates a dual-engine strategy. While the
            <span
              class="font-bold"
              style="color: var(--color-bp-primary);"
            >
              Admin Dashboard
            </span>
            leverages React 19 for complex auditing, this
            <span
              class="font-bold"
              style="color: var(--color-bp-primary);"
            >
              Consumer App
            </span>
            utilizes Vue 3.5 Vapor for extreme mobile performance.
          </p>

          <div class="flex items-center gap-4 py-4">
            <div
              class="h-px flex-grow"
              style="background-color: var(--outline-bp-ghost);"
            />
            <span
              class="font-mono text-[10px] uppercase tracking-widest"
              style="color: var(--color-bp-outline);"
            >
              Unified Validation Core [Go/Wasm]
            </span>
            <div
              class="h-px flex-grow"
              style="background-color: var(--outline-bp-ghost);"
            />
          </div>
        </div>
      </div>
    </section>

    <section
      class="w-full px-4 py-16 md:px-8 md:py-20"
      style="padding-top: 2rem;"
    >
      <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="space-y-4">
          <div
            class="font-mono text-[10px] uppercase tracking-widest font-bold pb-2"
            style="color: var(--color-bp-outline); border-bottom: 1px solid var(--outline-bp-ghost);"
          >
            Active Nodes
          </div>
          <div class="space-y-2">
            <div class="flex justify-between font-mono text-sm">
              <span style="color: var(--color-bp-on-surface-variant);">IAD</span>
              <span
                class="font-bold"
                style="color: var(--color-bp-tertiary);"
              >
                ACTIVE
              </span>
            </div>
            <div class="flex justify-between font-mono text-sm">
              <span style="color: var(--color-bp-on-surface-variant);">LHR</span>
              <span
                class="font-bold"
                style="color: var(--color-bp-tertiary);"
              >
                ACTIVE
              </span>
            </div>
            <div class="flex justify-between font-mono text-sm">
              <span style="color: var(--color-bp-on-surface-variant);">SIN</span>
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
            style="color: var(--color-bp-outline); border-bottom: 1px solid var(--outline-bp-ghost);"
          >
            Global Ledger
          </div>
          <div class="flex items-baseline gap-2">
            <span
              class="font-['Space_Grotesk'] text-3xl font-bold"
              style="color: var(--color-bp-primary);"
            >
              D1
            </span>
            <span
              class="font-mono text-xs"
              style="color: var(--color-bp-outline);"
            >
              EDGE_DB
            </span>
          </div>
        </div>

        <div class="space-y-4">
          <div
            class="font-mono text-[10px] uppercase tracking-widest font-bold pb-2"
            style="color: var(--color-bp-outline); border-bottom: 1px solid var(--outline-bp-ghost);"
          >
            Compliance Rating
          </div>
          <div class="flex items-center gap-4">
            <span class="trust-chip">VERIFIED</span>
            <span
              class="text-xs font-medium"
              style="color: var(--color-bp-on-surface-variant);"
            >
              ISO-14064 Ready
            </span>
          </div>
        </div>
      </div>
    </section>

    <footer
      class="w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8 mt-16"
      style="background-color: var(--color-bp-surface-container-lowest); border-top: 1px solid var(--outline-bp-ghost);"
    >
      <div class="space-y-4 max-w-lg">
        <div
          class="font-['Space_Grotesk'] text-lg font-black uppercase tracking-tighter"
          style="color: var(--color-bp-primary);"
        >
          INDUSTRIAL EDITORIAL
        </div>
        <p
          class="font-['Geist_Mono'] text-[12px] leading-relaxed uppercase"
          style="color: var(--color-bp-on-surface-variant);"
        >
          "We know how to collaborate, we know how to scale, and we know that technology must adapt to the business, not the other way around."
        </p>
      </div>

      <div class="flex flex-col items-center md:items-end gap-6">
        <div class="flex gap-8">
          <a
            href="#"
            class="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.05em] font-bold transition-colors"
            style="color: rgba(68, 71, 74, 0.6);"
            onmouseover="this.style.color='var(--color-bp-primary)'"
            onmouseout="this.style.color='rgba(68, 71, 74, 0.6)'"
          >
            MISSION
          </a>
          <a
            href="#"
            class="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.05em] font-bold transition-colors"
            style="color: rgba(68, 71, 74, 0.6);"
            onmouseover="this.style.color='var(--color-bp-primary)'"
            onmouseout="this.style.color='rgba(68, 71, 74, 0.6)'"
          >
            SPECIFICATIONS
          </a>
          <a
            href="#"
            class="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.05em] font-bold transition-colors"
            style="color: rgba(68, 71, 74, 0.6);"
            onmouseover="this.style.color='var(--color-bp-primary)'"
            onmouseout="this.style.color='rgba(68, 71, 74, 0.6)'"
          >
            COMPLIANCE
          </a>
        </div>
        <div
          class="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.05em]"
          style="color: rgba(196, 198, 201, 0.4);"
        >
          © 2024 INDUSTRIAL EDITORIAL. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.collab-bridge {
  background-color: var(--color-bp-surface-container-lowest) !important;
  border-left: 4px solid var(--color-bp-primary) !important;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.07) !important;
}
@media (min-width: 768px) {
  .collab-bridge {
    padding: 3rem;
  }
}

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
  width: 75%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
}
</style>
