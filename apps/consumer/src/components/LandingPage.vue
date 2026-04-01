<script setup lang="ts">
defineEmits<{
  (e: 'navigate', view: 'scanner'): void;
}>();
</script>

<template>
  <div class="w-full bg-surface-canvas text-brand-deep-charcoal">

    <!-- ═══════════════════════════════════════════════════════
         SECTION 1 — HERO
         Surface: surface-canvas. Asymmetric 8/4 grid.
         Matches code.html reference layout exactly.
    ════════════════════════════════════════════════════════════ -->
    <section class="w-full px-4 pt-28 pb-16 md:px-8 md:pt-36" style="border-bottom: 1px solid rgba(196,198,201,0.3);">
      <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-16">
        <!-- Left: Value prop + CTAs — lg:col-span-8 -->
        <div class="lg:col-span-8 space-y-8">

          <!-- Status chip — green tertiary-container tonal fill, square dot -->
          <div class="inline-flex items-center gap-3 px-3 py-1" style="background-color: #9bef9a;">
            <span class="w-2 h-2 bg-[--color-bp-success]" style="box-shadow: 0 0 8px rgba(40,122,51,0.5);"></span>
            <span class="font-mono text-[10px] uppercase tracking-widest font-bold" style="color: #002105;">
              Edge Node Latency: 12ms
            </span>
          </div>

          <!-- H1 — Space Grotesk, editorial weight -->
          <h1 class="font-['Space_Grotesk'] text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] uppercase italic" style="color: var(--color-bp-on-surface);">
            High-Performance <br/>
            <span style="color: var(--color-bp-primary);">ESG Product</span> <br/>
            Transparency.
          </h1>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              id="cta-launch-scanner"
              @click="$emit('navigate', 'scanner')"
              class="cta-primary w-full sm:w-auto px-8 py-4 font-['Space_Grotesk'] font-bold text-sm uppercase tracking-widest text-white flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all"
            >
              <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 7V5a2 2 0 012-2h2"/><path d="M17 3h2a2 2 0 012 2v2"/>
                <path d="M21 17v2a2 2 0 01-2 2h-2"/><path d="M7 21H5a2 2 0 01-2-2v-2"/>
                <rect x="7" y="7" width="10" height="10"/>
              </svg>
              Launch QR Scanner
            </button>
            <button
              class="w-full sm:w-auto px-8 py-4 font-['Space_Grotesk'] font-bold text-sm uppercase tracking-widest transition-colors"
              style="border: 1px solid var(--color-bp-primary); color: var(--color-bp-primary); background: transparent;"
              onmouseover="this.style.backgroundColor='rgba(0,72,141,0.08)'"
              onmouseout="this.style.backgroundColor='transparent'"
            >
              View Ledger
            </button>
          </div>
        </div>

        <!-- Right: Image panel — white, aspect-square, grayscale→color on hover -->
        <div class="lg:col-span-4 aspect-square bg-white overflow-hidden group" style="border: 1px solid rgba(196,198,201,0.3);">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcjp2OswkdUAjvl_uLAILrUDQAWm-lmyvtFSbtEZd4vRubV1vBx8EVUllI72DH7rOOMaBLVltEMJOzUuTb_jQPJ4vKpLoh5qGn4FnaAgTBxF_za3Cyjc9-hWqh-PUmY9mt0oKlJ9HMkV1r2UUaFj05EYAevzFv4v1YOUg3eyLW5GPfc0dJ1FyZQQNIYcbCUFQ3c6nGnM55x6Q3mmPdgHbmuklQiDSfKUd0xZa_i9eaakvMbujDRVVLJz1v2ibNGsYn8-VJb0v8pF4"
            alt="Technical Hardware — Close-up of high-end circuit board with glowing blue LED lights"
            class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          />
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         BENTO BOX GRID — Technical Showcase
         Matches code.html lines 137–201 exactly.
         Surface: surface-canvas. 6-col bento layout.
    ════════════════════════════════════════════════════════════ -->
    <section class="w-full px-4 py-16 md:px-8 md:py-20">
      <!-- Section header row -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
            style="color: var(--color-bp-outline);">
          Technical Specifications // v3.5
        </h2>
        <span class="font-mono text-[10px]" style="color: var(--color-bp-primary); opacity: 0.6;">
          [SYS_AUTH_VERIFIED]
        </span>
      </div>

      <!-- Bento grid — 6-col on lg, 4-col on md, 1-col on mobile -->
      <div class="bento-grid">

        <!-- Tile 1: Zero-Trust Scanner — lg:col-span-3 md:col-span-2 -->
        <div class="bento-tile bento-tile--wide group"
             style="background: var(--color-bp-surface-container-lowest); border: 1px solid rgba(196,198,201,0.2);">
          <div class="bento-tile__header">
            <!-- Shield / verified user icon (inline SVG, matches code.html verified_user material icon) -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                 class="w-8 h-8" style="color: var(--color-bp-primary);">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
            </svg>
            <span class="bento-chip">01</span>
          </div>
          <div class="bento-tile__body">
            <h3 class="font-['Space_Grotesk'] text-2xl font-bold tracking-tight uppercase mb-2"
                style="color: var(--color-bp-on-surface);">
              Zero-Trust Scanner
            </h3>
            <p class="text-sm leading-relaxed" style="color: var(--color-bp-on-surface-variant);">
              High-speed verification of product integrity at the Edge. Our proprietary scanning engine
              ensures that every interaction is cryptographically signed before data retrieval.
            </p>
          </div>
        </div>

        <!-- Tile 2: Eliminate ESG Fraud — lg:col-span-3 md:col-span-2 -->
        <div class="bento-tile bento-tile--wide group"
             style="background: var(--color-bp-surface-container-lowest); border: 1px solid rgba(196,198,201,0.2);">
          <div class="bento-tile__header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                 class="w-8 h-8" style="color: var(--color-bp-primary);">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
            </svg>
            <span class="bento-chip">02</span>
          </div>
          <div class="bento-tile__body">
            <h3 class="font-['Space_Grotesk'] text-2xl font-bold tracking-tight uppercase mb-2"
                style="color: var(--color-bp-on-surface);">
              Eliminate ESG Fraud
            </h3>
            <p class="text-sm leading-relaxed" style="color: var(--color-bp-on-surface-variant);">
              Transitioning from vague corporate "promises" to immutable
              <span style="color: var(--color-bp-primary);" class="italic font-bold">cryptographic proof</span>.
              Every carbon credit is traceable to its origin node.
            </p>
          </div>
        </div>

        <!-- Tile 3: Vue 3.5 Vapor + Go/Wasm — lg:col-span-4 md:col-span-4 (full row on md) -->
        <div class="bento-tile bento-tile--feature"
             style="background: var(--color-bp-surface-container-lowest); border: 1px solid rgba(196,198,201,0.3);">
          <div class="bento-tile__feature-content">
            <div class="space-y-4">
              <div class="font-mono text-[10px] font-bold" style="color: var(--color-bp-success);">
                [RUNTIME_OPTIMIZED]
              </div>
              <h3 class="font-['Space_Grotesk'] text-2xl font-bold tracking-tight uppercase"
                  style="color: var(--color-bp-on-surface);">
                Vue 3.5 Vapor + Go/Wasm
              </h3>
              <p class="text-sm leading-relaxed" style="color: var(--color-bp-on-surface-variant);">
                Zero-overhead rendering designed for mobile efficiency. Shared validation logic via WebAssembly
                ensures consistency across platforms.
              </p>
              <div class="flex gap-2">
                <span class="bento-metric-chip">MEM: 1.2MB</span>
                <span class="bento-metric-chip">INIT: 45ms</span>
              </div>
            </div>
            <div class="bento-tile__feature-img"
                 style="background-color: var(--color-bp-surface-container);">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPuaoLg6LZuQpsdOX4jjmfmD6HFkxzYAMI8lo5-0aNrTVT4tdlwRHVyOYX1cFprb8BSzc_spa_X-JmA8iED0BjmyKlJObw5nurq0l73C6U3cVl7MCKO4K6sfG9rCBT3rqL8TvQwXH1P9LyUB1Y0mqBY0NhrV1Dx-62SsMBkYrIt9qaiPl42iz1EfOm58dQVeQ1xaX99pYzqwVDMSB962IuWPDUiG46EYJfupFbm9QLG7Gm0awnhxC-BBNK4cLl86XYLvKsK1pKqT8"
                alt="Code on screen — macro photo of glowing lines of code on a dark screen"
                class="bento-tile__feature-img-inner"
              />
            </div>
          </div>
        </div>

        <!-- Tile 4: Sub-100ms / Edge Database — lg:col-span-2 md:col-span-2 -->
        <div class="bento-tile bento-tile--accent"
             style="background: var(--color-bp-primary);">
          <div class="font-mono text-4xl font-black italic tracking-tighter leading-none"
               style="color: var(--color-bp-on-primary);">
            &lt;100ms
          </div>
          <div class="space-y-4">
            <h3 class="font-['Space_Grotesk'] font-bold text-xl uppercase leading-tight"
                style="color: var(--color-bp-on-primary);">
              Edge Database (D1)
            </h3>
            <p class="text-xs font-medium" style="color: var(--color-bp-on-primary); opacity: 0.9;">
              Real-time carbon footprint calculations delivered via Cloudflare's global edge network.
            </p>
            <div class="bento-progress-bar">
              <div class="bento-progress-bar__fill"></div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 2 — THE TRUST GAP (Problem)
         Surface: bp-surface-container-low — tonal shift (matches
         code.html bento section aesthetic: light tonal layer,
         white card panels with ghost borders, hover effects).
    ════════════════════════════════════════════════════════════ -->
    <section class="w-full px-4 py-16 md:px-8 md:py-20" style="background-color: var(--color-bp-surface-container-low);">
      <!-- Section label — matches code.html "Technical Specifications // v3.5" label style -->
      <div class="flex items-center justify-between mb-8">
        <p class="font-mono text-[10px] uppercase tracking-widest font-bold" style="color: var(--color-bp-on-surface-variant);">
          01 / The Trust Gap
        </p>
        <span class="font-mono text-[10px]" style="color: var(--color-bp-primary); opacity: 0.6;">[CLAIM_UNVERIFIED]</span>
      </div>

      <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left: Problem statement — lg:col-span-7 -->
        <div class="lg:col-span-7 space-y-6">
          <h2 class="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold tracking-tight uppercase"
              style="color: var(--color-bp-on-surface);">
            ESG claims are<br/>unverifiable by design.
          </h2>
          <p class="text-sm md:text-base leading-relaxed max-w-lg"
             style="color: var(--color-bp-on-surface-variant);">
            Corporate carbon reports have no cryptographic anchor. Certifications are issued centrally and cannot be queried at the point of sale. A consumer scanning a product barcode today retrieves marketing copy — not a verifiable record.
          </p>
        </div>

        <!-- Right: CLAIM vs PROOF contrast block — lg:col-span-5
             Matches code.html tile structure: white bg, ghost border, hover state -->
        <div class="lg:col-span-5 grid grid-cols-2 gap-0 self-start" style="border: 1px solid rgba(196, 198, 201, 0.2);">
          <!-- CLAIM panel — white card, matches code.html tile surface -->
          <div class="p-6 space-y-3 flex flex-col justify-between hover:opacity-90 transition-opacity"
               style="background-color: var(--color-bp-surface-container-lowest); border-right: 1px solid rgba(196, 198, 201, 0.2);">
            <span class="font-mono text-[9px] uppercase tracking-widest font-bold"
                  style="color: var(--color-bp-on-surface-variant);">Before</span>
            <div class="font-['Space_Grotesk'] text-2xl font-bold uppercase tracking-tight"
                 style="color: var(--color-bp-on-surface-variant); opacity: 0.35;">CLAIM</div>
            <p class="font-mono text-[10px] leading-relaxed"
               style="color: var(--color-bp-on-surface-variant);">
              "Our products achieve net-zero by 2030."<br/>
              — Corporate Annual Report, p.14
            </p>
          </div>
          <!-- PROOF panel — on-surface dark fill, matches code.html primary tile with dark bg -->
          <div class="p-6 space-y-3 flex flex-col justify-between"
               style="background-color: var(--color-bp-on-surface);">
            <span class="font-mono text-[9px] uppercase tracking-widest font-bold"
                  style="color: var(--color-bp-success);">After</span>
            <div class="font-['Space_Grotesk'] text-2xl font-bold uppercase tracking-tight"
                 style="color: var(--color-bp-success);">PROOF</div>
            <p class="font-mono text-[10px] leading-relaxed" style="color: rgba(255,255,255,0.6);">
              Ed25519 sig verified.<br/>
              CF_TOTAL: 4.2 kgCO₂e.<br/>
              D1 ledger: 7 events.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 3 — THE VERIFICATION MODEL (Solution)
         Surface: surface-canvas
    ════════════════════════════════════════════════════════════ -->
    <section class="w-full px-4 py-16 md:px-8 md:py-20">
      <div class="w-full max-w-3xl space-y-6">
        <p class="font-mono text-[10px] uppercase tracking-widest text-functional-neutral font-bold">
          02 / The Verification Model
        </p>
        <h2 class="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold tracking-tight uppercase">
          Declarations replaced<br/>by deterministic proof.
        </h2>
        <p class="text-functional-neutral text-sm md:text-base leading-relaxed">
          Every product event is signed with Ed25519, appended to Cloudflare D1, and verifiable at any edge node in under 100ms. The validation engine runs as a Go/Wasm binary — the same binary shared between the consumer scanner and the auditor dashboard. There is no trusted intermediary. The math is the authority.
        </p>
        <div class="flex flex-wrap gap-3 pt-2">
          <span class="tech-chip">Ed25519 Signatures</span>
          <span class="tech-chip">Cloudflare D1 Ledger</span>
          <span class="tech-chip">Go/Wasm Engine</span>
          <span class="tech-chip">Edge-Native Query</span>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 4 — VERIFICATION FLOW
         Surface: surface-container-low (tonal shift)
    ════════════════════════════════════════════════════════════ -->
    <section class="w-full px-4 py-16 md:px-8 md:py-20 bg-surface-border/10">
      <p class="font-mono text-[10px] uppercase tracking-widest text-functional-neutral font-bold mb-12">
        03 / Verification Flow
      </p>
      <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        <!-- Step 1 -->
        <div class="flow-step bg-surface-card p-6 space-y-4">
          <div class="font-mono text-4xl font-black text-brand-deep-charcoal/10 leading-none">01</div>
          <div class="space-y-2">
            <h3 class="font-['Space_Grotesk'] text-base font-bold uppercase tracking-tight text-brand-deep-charcoal">SCAN</h3>
            <p class="font-mono text-[11px] text-functional-neutral leading-relaxed">
              Consumer scans product QR code at shelf. No app download required.
            </p>
          </div>
          <span class="font-mono text-[9px] text-brand-integrity-blue uppercase tracking-widest">getUserMedia API</span>
        </div>
        <!-- Step 2 -->
        <div class="flow-step bg-surface-canvas p-6 space-y-4">
          <div class="font-mono text-4xl font-black text-brand-deep-charcoal/10 leading-none">02</div>
          <div class="space-y-2">
            <h3 class="font-['Space_Grotesk'] text-base font-bold uppercase tracking-tight text-brand-deep-charcoal">VERIFY</h3>
            <p class="font-mono text-[11px] text-functional-neutral leading-relaxed">
              Go/Wasm binary verifies Ed25519 signature client-side. Zero network round-trip for cryptographic check.
            </p>
          </div>
          <span class="font-mono text-[9px] text-brand-integrity-blue uppercase tracking-widest">Go/Wasm · Ed25519</span>
        </div>
        <!-- Step 3 -->
        <div class="flow-step bg-surface-card p-6 space-y-4">
          <div class="font-mono text-4xl font-black text-brand-deep-charcoal/10 leading-none">03</div>
          <div class="space-y-2">
            <h3 class="font-['Space_Grotesk'] text-base font-bold uppercase tracking-tight text-brand-deep-charcoal">FETCH</h3>
            <p class="font-mono text-[11px] text-functional-neutral leading-relaxed">
              Cloudflare D1 edge query returns full cryptographic audit trail in &lt;100ms from nearest node.
            </p>
          </div>
          <span class="font-mono text-[9px] text-brand-integrity-blue uppercase tracking-widest">Cloudflare D1 · Edge</span>
        </div>
        <!-- Step 4 -->
        <div class="flow-step bg-brand-deep-charcoal p-6 space-y-4">
          <div class="font-mono text-4xl font-black text-white/10 leading-none">04</div>
          <div class="space-y-2">
            <h3 class="font-['Space_Grotesk'] text-base font-bold uppercase tracking-tight text-white">TRUST</h3>
            <p class="font-mono text-[11px] text-white/60 leading-relaxed">
              Real-time carbon footprint formula and origin timeline — cryptographically anchored, not self-reported.
            </p>
          </div>
          <span class="font-mono text-[9px] text-brand-verification-green uppercase tracking-widest">VERIFIED · IMMUTABLE</span>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 5 — DUAL-ENGINE ARCHITECTURE
         Surface: surface-canvas. Asymmetric layout + Command Strip.
    ════════════════════════════════════════════════════════════ -->
    <section class="w-full px-4 py-16 md:px-8 md:py-20">
      <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left: Narrative — 7 cols -->
        <div class="lg:col-span-7 space-y-6">
          <p class="font-mono text-[10px] uppercase tracking-widest text-functional-neutral font-bold">
            04 / Dual-Engine Architecture
          </p>
          <h2 class="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold tracking-tight uppercase">
            Same engine.<br/>Two surfaces.<br/>One source of truth.
          </h2>
          <p class="text-functional-neutral text-sm md:text-base leading-relaxed max-w-lg">
            React 19 powers the Auditor Dashboard — complex state, high data density, real-time tamper detection. Vue 3.5 Vapor powers the consumer surface — zero-overhead rendering, sub-50ms initialization, 1.2MB memory footprint.
          </p>
          <p class="text-functional-neutral text-sm md:text-base leading-relaxed max-w-lg">
            A shared Go/Wasm binary enforces identical Ed25519 cryptographic rules across both surfaces. The auditor and the consumer run the same validation logic. There is no separate "consumer version" of trust.
          </p>
        </div>

        <!-- Right: Command Strip — 5 cols -->
        <div class="lg:col-span-5 bg-surface-border/10 p-6 space-y-0">
          <p class="font-mono text-[9px] uppercase tracking-widest text-functional-neutral font-bold pb-4 border-b border-surface-border/15">
            [RUNTIME_SPECS]
          </p>
          <div class="command-row">
            <span class="font-mono text-[11px] text-functional-neutral uppercase">MEM</span>
            <span class="font-mono text-[11px] text-brand-deep-charcoal font-bold">1.2MB</span>
          </div>
          <div class="command-row">
            <span class="font-mono text-[11px] text-functional-neutral uppercase">INIT</span>
            <span class="font-mono text-[11px] text-brand-deep-charcoal font-bold">45ms</span>
          </div>
          <div class="command-row">
            <span class="font-mono text-[11px] text-functional-neutral uppercase">DOM_WRITES</span>
            <span class="font-mono text-[11px] text-brand-verification-green font-bold">ZERO_VDOM</span>
          </div>
          <div class="command-row">
            <span class="font-mono text-[11px] text-functional-neutral uppercase">ENGINE</span>
            <span class="font-mono text-[11px] text-brand-deep-charcoal font-bold">GO/WASM</span>
          </div>
          <div class="command-row">
            <span class="font-mono text-[11px] text-functional-neutral uppercase">CRYPTO</span>
            <span class="font-mono text-[11px] text-brand-deep-charcoal font-bold">ED25519</span>
          </div>
          <div class="command-row">
            <span class="font-mono text-[11px] text-functional-neutral uppercase">PERSISTENCE</span>
            <span class="font-mono text-[11px] text-brand-deep-charcoal font-bold">D1_EDGE</span>
          </div>
          <div class="command-row border-b-0">
            <span class="font-mono text-[11px] text-functional-neutral uppercase">ADMIN_STACK</span>
            <span class="font-mono text-[11px] text-brand-deep-charcoal font-bold">REACT_19</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 6 — TRUST SIGNALS (Platform Status)
         Surface: surface-container-low (tonal shift)
    ════════════════════════════════════════════════════════════ -->
    <section class="w-full px-4 py-16 md:px-8 md:py-20 bg-surface-border/10">
      <p class="font-mono text-[10px] uppercase tracking-widest text-functional-neutral font-bold mb-12">
        05 / Platform Status
      </p>
      <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
        <!-- Active Nodes -->
        <div class="space-y-4 md:pr-8">
          <p class="font-mono text-[9px] uppercase tracking-widest text-functional-neutral font-bold pb-3 border-b border-surface-border/15">
            Active Nodes
          </p>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="font-mono text-[11px] text-functional-neutral">us-east-1a</span>
              <span class="font-mono text-[10px] text-brand-verification-green font-bold">STABLE</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-mono text-[11px] text-functional-neutral">eu-central-1</span>
              <span class="font-mono text-[10px] text-brand-verification-green font-bold">STABLE</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-mono text-[11px] text-functional-neutral">ap-southeast-1</span>
              <span class="font-mono text-[10px] text-functional-alert font-bold">LATENCY_HIGH</span>
            </div>
          </div>
        </div>

        <!-- Global Ledger -->
        <div class="space-y-4 md:px-8 md:border-x md:border-surface-border/15">
          <p class="font-mono text-[9px] uppercase tracking-widest text-functional-neutral font-bold pb-3 border-b border-surface-border/15">
            Global Ledger
          </p>
          <div class="space-y-1">
            <div class="flex items-baseline gap-2">
              <span class="font-['Space_Grotesk'] text-4xl font-bold text-brand-integrity-blue tracking-tight">1.42B</span>
              <span class="font-mono text-[9px] text-functional-neutral uppercase tracking-widest">TXN_COUNT</span>
            </div>
            <p class="font-mono text-[10px] text-functional-neutral">Verified supply chain events on Cloudflare D1</p>
          </div>
        </div>

        <!-- Compliance -->
        <div class="space-y-4 md:pl-8">
          <p class="font-mono text-[9px] uppercase tracking-widest text-functional-neutral font-bold pb-3 border-b border-surface-border/15">
            Compliance Rating
          </p>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="compliance-chip">AAA+</span>
              <span class="font-mono text-[10px] text-functional-neutral">ISO-27001</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="compliance-chip">V4</span>
              <span class="font-mono text-[10px] text-functional-neutral">ISO-14064 ESG Reporting</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 7 — FINAL CTA
         Surface: brand-integrity-blue — full bleed editorial block
    ════════════════════════════════════════════════════════════ -->
    <section class="w-full px-4 py-20 md:px-8 md:py-28 bg-brand-integrity-blue">
      <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-8 space-y-4">
          <p class="font-mono text-[10px] uppercase tracking-widest text-white/50 font-bold">
            Eco-Trace · Trust Infrastructure Layer
          </p>
          <h2 class="font-['Space_Grotesk'] text-4xl md:text-6xl font-bold tracking-tighter uppercase italic text-white leading-[0.9]">
            Scan.<br/>Verify.<br/>Trust.
          </h2>
          <p class="font-mono text-[12px] text-white/70 leading-relaxed max-w-md">
            The audit trail starts when you point your camera. Every product. Every claim. Every carbon credit — cryptographically anchored at the Edge.
          </p>
        </div>
        <div class="lg:col-span-4 flex flex-col gap-4">
          <button
            @click="$emit('navigate', 'scanner')"
            class="w-full px-8 py-5 border-2 border-white font-['Space_Grotesk'] font-bold text-sm uppercase tracking-widest text-white flex items-center justify-center gap-3 hover:bg-white hover:text-brand-integrity-blue transition-all"
          >
            <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 7V5a2 2 0 012-2h2"/><path d="M17 3h2a2 2 0 012 2v2"/>
              <path d="M21 17v2a2 2 0 01-2 2h-2"/><path d="M7 21H5a2 2 0 01-2-2v-2"/>
              <rect x="7" y="7" width="10" height="10"/>
            </svg>
            Launch QR Scanner
          </button>
          <p class="font-mono text-[9px] text-white/40 text-center uppercase tracking-widest">
            No account required · Edge-native · Mobile-first
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 8 — FOOTER
         Surface: surface-card (white lift from canvas)
    ════════════════════════════════════════════════════════════ -->
    <footer class="w-full px-4 py-12 md:px-8 md:py-16 bg-surface-card border-t border-surface-border/15">
      <div class="w-full flex flex-col md:flex-row justify-between gap-10 md:gap-16">
        <!-- Left: Wordmark + Mission -->
        <div class="space-y-4 max-w-md">
          <div class="font-['Space_Grotesk'] text-sm font-bold text-brand-deep-charcoal uppercase tracking-tighter">
            ECO-TRACE
          </div>
          <blockquote>
            <p class="font-mono text-[11px] text-functional-neutral leading-relaxed uppercase">
              "We know how to collaborate, we know how to scale, and we know that technology must adapt to the business, not the other way around."
            </p>
          </blockquote>
          <p class="font-mono text-[10px] text-functional-neutral/50 uppercase tracking-wider">
            Vue 3.5 Vapor · Go/Wasm · Cloudflare D1 · Ed25519
          </p>
        </div>

        <!-- Right: Footer nav + copyright -->
        <div class="flex flex-col items-start md:items-end justify-between gap-6">
          <div class="flex gap-6">
            <a href="#" class="font-mono text-[10px] uppercase tracking-widest text-functional-neutral/60 hover:text-brand-integrity-blue transition-colors font-bold">Mission</a>
            <a href="#" class="font-mono text-[10px] uppercase tracking-widest text-functional-neutral/60 hover:text-brand-integrity-blue transition-colors font-bold">Specifications</a>
            <a href="#" class="font-mono text-[10px] uppercase tracking-widest text-functional-neutral/60 hover:text-brand-integrity-blue transition-colors font-bold">Compliance</a>
          </div>
          <p class="font-mono text-[10px] uppercase tracking-widest text-functional-neutral/30">
            © 2026 Eco-Trace · Industrial Editorial
          </p>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* Primary CTA — Integrity Gradient per DESIGN.md */
.cta-primary {
  background: linear-gradient(135deg, #005fb8 0%, #00468b 100%);
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

/* Tech chips — tonal, NO border radius (DESIGN.md: zero roundedness) */
.tech-chip {
  display: inline-block;
  background: var(--color-surface-border, #E0E0E0);
  opacity: 0.8;
  color: var(--color-brand-deep-charcoal, #1A1C1E);
  font-family: 'Geist Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 10px;
}

/* Compliance chip */
.compliance-chip {
  display: inline-block;
  background: #9bef9a;
  color: #002105;
  font-family: 'Geist Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 8px;
}

/* Command Strip rows — no horizontal dividers (DESIGN.md rule) */
.command-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(224, 224, 224, 0.15);
}

/* Flow steps — ensure consistent height */
.flow-step {
  display: flex;
  flex-direction: column;
  min-height: 200px;
}

/* ── Bento Box Grid ────────────────────────────────────────── */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto auto;
  gap: 1rem;
}

/* Tile 1 & 2: half-width on lg (3 cols each), full-width on mobile */
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
  border-color: rgba(0, 95, 184, 0.4) !important;
}

/* Tile 3: 4-col on lg, full on md */
.bento-tile--feature {
  grid-column: span 6;
  padding: 1.5rem;
}

/* Tile 4: 2-col on lg, 2-col on md */
.bento-tile--accent {
  grid-column: span 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  gap: 1.5rem;
  min-height: 200px;
}

/* Medium screens: 4-col grid */
@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .bento-tile--wide    { grid-column: span 2; }
  .bento-tile--feature { grid-column: span 4; }
  .bento-tile--accent  { grid-column: span 2; }
}

/* Large screens: 6-col grid */
@media (min-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(6, 1fr);
  }
  .bento-tile--wide    { grid-column: span 3; }
  .bento-tile--feature { grid-column: span 4; }
  .bento-tile--accent  { grid-column: span 2; }
}

/* Tile interior structure */
.bento-tile__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* Tile 3 two-column interior layout */
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

/* Small numbered chip (top-right of tile) */
.bento-chip {
  font-family: var(--font-bp-mono, 'Geist Mono', monospace);
  font-size: 10px;
  background-color: var(--color-bp-surface-container);
  color: var(--color-bp-on-surface-variant);
  padding: 3px 8px;
}

/* Performance metric chips (MEM / INIT) */
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

/* Progress bar inside accent tile */
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
