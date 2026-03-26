<script setup lang="ts">
defineEmits<{
  (e: 'navigate', view: 'scanner'): void;
}>();

interface TechCard {
  label: string;
  title: string;
  body: string;
}

const techCards: TechCard[] = [
  {
    label: 'WHAT',
    title: 'Zero-Trust Product Transparency Scanner',
    body: 'A cryptographically-verified product scanner that validates ESG claims directly on-device, requiring zero trust in any intermediary server or third-party API.'
  },
  {
    label: 'WHY',
    title: 'Eliminate ESG Fraud at Point of Sale',
    body: 'Greenwashing costs the global economy billions. We verify environmental claims at the Edge — where the consumer stands — not in a datacenter controlled by the claimant.'
  },
  {
    label: 'HOW',
    title: 'Vapor Mode + Go/Wasm Binary',
    body: 'Vue 3.5 Vapor Mode eliminates Virtual DOM overhead for zero-cost rendering. A shared Go/Wasm binary executes Ed25519 signature verification and carbon footprint calculations at native speed in the browser.'
  },
  {
    label: 'FOR WHAT',
    title: 'Sub-100ms Verification from Cloudflare D1',
    body: 'Consumers receive cryptographically-proven carbon footprint data in under 100 milliseconds, streamed from Cloudflare D1 at the Edge — no cold starts, no spinners, no trust assumptions.'
  }
];

const architectureNarrative = 'Eco-Trace is not just an app; it is a distributed system. We solved the Single Source of Truth problem by decoupling validation logic into a Go-Wasm binary. This allows us to use the best tool for each job: React 19 for the high-density data management required by Auditors, and Vue 3.5 Vapor for the ultra-lightweight experience required by Consumers. Same Engine, different Frameworks, one Business Goal.';

const missionQuote = 'We know how to collaborate, we know how to scale, and we know that technology must adapt to the business, not the other way around.';
</script>

<template>
  <div class="w-full">
    <section class="w-full bg-brand-deep-charcoal px-4 pt-24 pb-16 md:px-6 md:pt-32 md:pb-24">
      <div class="w-full">
        <p class="text-brand-verification-green font-bold text-xs tracking-widest uppercase mb-3">Edge-Native · Zero-Trust · Open Architecture</p>
        <h1 class="text-white font-bold text-3xl md:text-4xl leading-tight mb-4">
          Zero-Trust Product<br/>
          <span class="text-brand-integrity-blue">Transparency Scanner</span>
        </h1>
        <p class="text-functional-neutral text-sm md:text-base leading-relaxed mb-8">
          Verify environmental claims at the point of sale. Cryptographic proof, not corporate promises.
        </p>
        <button
          id="cta-launch-scanner"
          @click="$emit('navigate', 'scanner')"
          class="w-full md:w-auto bg-brand-integrity-blue text-white px-6 py-3.5 rounded-pill font-bold shadow-subtle hover:brightness-110 transition active:scale-[0.98] text-base"
        >
          <span class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 7V5a2 2 0 012-2h2"/>
              <path d="M17 3h2a2 2 0 012 2v2"/>
              <path d="M21 17v2a2 2 0 01-2 2h-2"/>
              <path d="M7 21H5a2 2 0 01-2-2v-2"/>
              <line x1="7" y1="12" x2="17" y2="12"/>
            </svg>
            Launch QR Scanner
          </span>
        </button>
      </div>
    </section>

    <section class="w-full bg-surface-canvas px-4 py-12 md:px-6 md:py-16">
      <p class="text-brand-integrity-blue font-bold text-xs tracking-widest uppercase mb-2">Technical Breakdown</p>
      <h2 class="text-brand-deep-charcoal font-bold text-xl md:text-2xl mb-8">How it works — and why it matters</h2>
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <article
          v-for="card in techCards"
          :key="card.label"
          class="bg-surface-card border border-surface-border rounded-md p-4 md:p-6 shadow-elevation-1"
        >
          <span class="inline-block bg-brand-deep-charcoal text-brand-integrity-blue text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-sm mb-3">{{ card.label }}</span>
          <h3 class="text-brand-deep-charcoal font-bold text-base mb-2">{{ card.title }}</h3>
          <p class="text-functional-neutral text-sm leading-relaxed">{{ card.body }}</p>
        </article>
      </div>
    </section>

    <section class="w-full bg-brand-deep-charcoal px-4 py-12 md:px-6 md:py-16">
      <p class="text-brand-integrity-blue font-bold text-xs tracking-widest uppercase mb-6">Collaborative Architecture</p>
      <blockquote class="border-l-4 border-brand-integrity-blue pl-4 md:pl-6">
        <p class="text-white text-sm md:text-base leading-relaxed font-medium italic">
          '{{ architectureNarrative }}'
        </p>
      </blockquote>
      <div class="mt-8 flex flex-wrap gap-2">
        <span class="bg-surface-card/10 text-functional-neutral text-xs font-medium px-3 py-1 rounded-pill border border-surface-border/20">Vue 3.5 Vapor</span>
        <span class="bg-surface-card/10 text-functional-neutral text-xs font-medium px-3 py-1 rounded-pill border border-surface-border/20">Go/Wasm</span>
        <span class="bg-surface-card/10 text-functional-neutral text-xs font-medium px-3 py-1 rounded-pill border border-surface-border/20">Cloudflare D1</span>
        <span class="bg-surface-card/10 text-functional-neutral text-xs font-medium px-3 py-1 rounded-pill border border-surface-border/20">React 19</span>
        <span class="bg-surface-card/10 text-functional-neutral text-xs font-medium px-3 py-1 rounded-pill border border-surface-border/20">Ed25519</span>
      </div>
    </section>

    <footer class="w-full bg-brand-deep-charcoal border-t border-surface-border/20 px-4 py-10 md:px-6 md:py-12">
      <blockquote class="mb-6">
        <p class="text-white text-sm md:text-base leading-relaxed font-medium">
          "{{ missionQuote }}"
        </p>
      </blockquote>
      <div class="flex flex-col gap-3">
        <p class="text-functional-neutral text-xs">
          Vue 3.5 Vapor · Go/Wasm · Cloudflare D1 · React 19
        </p>
        <p class="text-functional-neutral/60 text-xs">
          © 2026 Eco-Trace · Edge-Native ESG Verification Platform
        </p>
      </div>
    </footer>
  </div>
</template>
