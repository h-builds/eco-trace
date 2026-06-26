<script setup lang="ts">
import { getAdminUrl } from '@/lib/env';
</script>

<template>
  <section class="w-full py-8 space-y-16">
    <!-- How to evaluate this demo -->
    <div class="space-y-6">
      <h2
        class="font-mono text-xs font-bold tracking-[0.3em] uppercase"
        style="color: var(--color-bp-primary);"
      >
        How to evaluate this demo
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 border border-[color:var(--outline-bp-ghost)] bg-[color:var(--color-bp-surface-container-lowest)] space-y-4">
          <div class="font-mono text-xl font-bold text-[color:var(--color-bp-primary)]">01</div>
          <p class="font-['Space_Grotesk'] font-bold text-[color:var(--color-bp-on-surface)]">Open the demo product.</p>
          <p class="text-sm text-[color:var(--color-bp-on-surface-variant)]">Scan the QR code or use the demo button to load the seeded product journey.</p>
        </div>
        <div class="p-6 border border-[color:var(--outline-bp-ghost)] bg-[color:var(--color-bp-surface-container-lowest)] space-y-4">
          <div class="font-mono text-xl font-bold text-[color:var(--color-bp-primary)]">02</div>
          <p class="font-['Space_Grotesk'] font-bold text-[color:var(--color-bp-on-surface)]">Review authenticity and carbon footprint.</p>
          <p class="text-sm text-[color:var(--color-bp-on-surface-variant)]">Inspect cryptographic signatures and the deterministic ESG calculations performed via WASM.</p>
        </div>
        <div class="p-6 border border-[color:var(--outline-bp-ghost)] bg-[color:var(--color-bp-surface-container-lowest)] space-y-4">
          <div class="font-mono text-xl font-bold text-[color:var(--color-bp-primary)]">03</div>
          <p class="font-['Space_Grotesk'] font-bold text-[color:var(--color-bp-on-surface)]">Compare in the Admin Workstation.</p>
          <p class="text-sm text-[color:var(--color-bp-on-surface-variant)]">See how the <a :href="getAdminUrl()" target="_blank" rel="noopener noreferrer" class="underline hover:text-[color:var(--color-bp-primary)]">Admin app</a> seeded these events before verification.</p>
        </div>
      </div>
    </div>

    <!-- Two-Surface Architecture -->
    <div class="space-y-6">
      <h2
        class="font-mono text-xs font-bold tracking-[0.3em] uppercase"
        style="color: var(--color-bp-primary);"
      >
        Two-Surface Architecture
      </h2>
      <div class="w-full border border-[color:var(--outline-bp-ghost)] bg-[color:var(--color-bp-surface-container-lowest)] p-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div class="space-y-3 relative">
            <h3 class="font-mono text-sm font-bold uppercase text-[color:var(--color-bp-primary)]">Consumer App</h3>
            <p class="text-sm text-[color:var(--color-bp-on-surface-variant)]">Public verification surface. Built with Vue 3.5 Vapor.</p>
          </div>
          <div class="space-y-3 relative lg:border-l lg:border-[color:var(--outline-bp-ghost)] lg:pl-8">
            <h3 class="font-mono text-sm font-bold uppercase text-[color:var(--color-bp-on-surface)]">Admin App</h3>
            <p class="text-sm text-[color:var(--color-bp-on-surface-variant)]">Auditor governance surface. Built with React 19.</p>
          </div>
          <div class="space-y-3 relative lg:border-l lg:border-[color:var(--outline-bp-ghost)] lg:pl-8">
            <h3 class="font-mono text-sm font-bold uppercase text-[color:var(--color-bp-on-surface)]">Go/Wasm</h3>
            <p class="text-sm text-[color:var(--color-bp-on-surface-variant)]">Shared trust engine & cryptographic validation logic.</p>
          </div>
          <div class="space-y-3 relative lg:border-l lg:border-[color:var(--outline-bp-ghost)] lg:pl-8">
            <h3 class="font-mono text-sm font-bold uppercase text-[color:var(--color-bp-on-surface)]">Cloudflare D1</h3>
            <p class="text-sm text-[color:var(--color-bp-on-surface-variant)]">Edge persistence and high-speed global data retrieval.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
