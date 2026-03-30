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
    ════════════════════════════════════════════════════════════ -->
    <section class="w-full px-4 pt-28 pb-20 md:px-8 md:pt-36 md:pb-28">
      <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <!-- Left: Value prop + CTAs -->
        <div class="lg:col-span-8 space-y-8">
          <!-- Status chip — tonal, no border -->
          <div class="inline-flex items-center gap-3 bg-surface-border/30 px-3 py-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-verification-green animate-pulse"></span>
            <span class="font-mono text-[10px] uppercase tracking-widest text-functional-neutral font-bold">
              Edge Node · 12ms Latency
            </span>
          </div>

          <!-- H1 — Space Grotesk, editorial weight -->
          <div class="space-y-4">
            <h1 class="font-['Space_Grotesk'] text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] uppercase italic">
              Product claims,<br/>
              <span class="text-brand-integrity-blue">verified.</span>
            </h1>
            <p class="text-functional-neutral text-base md:text-lg leading-relaxed max-w-xl font-medium">
              Cryptographic proof for every supply chain event — from origin node to retail shelf. No declarations. No trust assumptions.
            </p>
          </div>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              id="cta-launch-scanner"
              @click="$emit('navigate', 'scanner')"
              class="cta-primary w-full sm:w-auto px-8 py-4 font-['Space_Grotesk'] font-bold text-sm uppercase tracking-widest text-white flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
            >
              <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 7V5a2 2 0 012-2h2"/><path d="M17 3h2a2 2 0 012 2v2"/>
                <path d="M21 17v2a2 2 0 01-2 2h-2"/><path d="M7 21H5a2 2 0 01-2-2v-2"/>
                <rect x="7" y="7" width="10" height="10"/>
              </svg>
              Launch QR Scanner
            </button>
            <button class="w-full sm:w-auto px-8 py-4 border border-brand-integrity-blue/20 font-['Space_Grotesk'] font-bold text-sm uppercase tracking-widest text-brand-integrity-blue hover:bg-brand-integrity-blue/5 transition-colors">
              View Ledger
            </button>
          </div>
        </div>

        <!-- Right: Accent metric panel — tonal lift -->
        <div class="lg:col-span-4 bg-brand-deep-charcoal p-8 flex flex-col justify-between min-h-[200px] lg:min-h-[260px]">
          <span class="font-mono text-[10px] text-white/40 uppercase tracking-widest">[EDGE_VERIFIED]</span>
          <div class="space-y-2">
            <div class="font-mono text-5xl md:text-6xl font-black text-white italic leading-none">&lt;100ms</div>
            <p class="font-mono text-[11px] text-white/60 uppercase tracking-wide">
              QR-to-verification latency<br/>via Cloudflare Edge
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 2 — THE TRUST GAP (Problem)
         Surface: surface-container-low — tonal shift, no border
    ════════════════════════════════════════════════════════════ -->
    <section class="w-full px-4 py-16 md:px-8 md:py-20 bg-surface-border/10">
      <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 space-y-6">
          <p class="font-mono text-[10px] uppercase tracking-widest text-functional-neutral font-bold">
            01 / The Trust Gap
          </p>
          <h2 class="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold tracking-tight uppercase">
            ESG claims are<br/>unverifiable by design.
          </h2>
          <p class="text-functional-neutral text-sm md:text-base leading-relaxed max-w-lg">
            Corporate carbon reports have no cryptographic anchor. Certifications are issued centrally and cannot be queried at the point of sale. A consumer scanning a product barcode today retrieves marketing copy — not a verifiable record.
          </p>
        </div>

        <!-- Contrast block: CLAIM vs PROOF -->
        <div class="lg:col-span-5 grid grid-cols-2 gap-0">
          <div class="bg-surface-card p-6 space-y-3 border-r border-surface-border/15">
            <span class="font-mono text-[9px] text-functional-neutral uppercase tracking-widest font-bold">Before</span>
            <div class="font-['Space_Grotesk'] text-2xl font-bold text-functional-neutral/40 uppercase tracking-tight">CLAIM</div>
            <p class="font-mono text-[10px] text-functional-neutral leading-relaxed">
              "Our products achieve net-zero by 2030."<br/>
              — Corporate Annual Report, p.14
            </p>
          </div>
          <div class="bg-brand-deep-charcoal p-6 space-y-3">
            <span class="font-mono text-[9px] text-brand-verification-green uppercase tracking-widest font-bold">After</span>
            <div class="font-['Space_Grotesk'] text-2xl font-bold text-brand-verification-green uppercase tracking-tight">PROOF</div>
            <p class="font-mono text-[10px] text-white/60 leading-relaxed">
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
</style>
