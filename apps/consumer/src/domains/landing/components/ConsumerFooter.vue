<script setup lang="ts">
import { ref } from 'vue';
import { getAdminUrl } from '@/lib/env';

const currentYear = new Date().getFullYear();

const footerLinkHover = ref<string | null>(null);

const ADMIN_URL = getAdminUrl();
</script>

<template>
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
      <nav class="flex gap-8" aria-label="Footer navigation">
        <button
          class="footer-link"
          :style="{ color: footerLinkHover === 'mission' ? 'var(--color-bp-primary)' : 'rgba(68, 71, 74, 1)' }"
          @mouseover="footerLinkHover = 'mission'"
          @mouseleave="footerLinkHover = null"
          @focus="footerLinkHover = 'mission'"
          @blur="footerLinkHover = null"
        >
          MISSION
        </button>
        <button
          class="footer-link"
          :style="{ color: footerLinkHover === 'specs' ? 'var(--color-bp-primary)' : 'rgba(68, 71, 74, 1)' }"
          @mouseover="footerLinkHover = 'specs'"
          @mouseleave="footerLinkHover = null"
          @focus="footerLinkHover = 'specs'"
          @blur="footerLinkHover = null"
        >
          SPECIFICATIONS
        </button>
        <button
          class="footer-link"
          :style="{ color: footerLinkHover === 'compliance' ? 'var(--color-bp-primary)' : 'rgba(68, 71, 74, 1)' }"
          @mouseover="footerLinkHover = 'compliance'"
          @mouseleave="footerLinkHover = null"
          @focus="footerLinkHover = 'compliance'"
          @blur="footerLinkHover = null"
        >
          COMPLIANCE
        </button>
        <a
          :href="ADMIN_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
          style="text-decoration: none;"
          :style="{ color: footerLinkHover === 'admin' ? 'var(--color-bp-primary)' : 'rgba(68, 71, 74, 1)' }"
          @mouseover="footerLinkHover = 'admin'"
          @mouseleave="footerLinkHover = null"
          @focus="footerLinkHover = 'admin'"
          @blur="footerLinkHover = null"
        >
          OPEN AUDITOR WORKSTATION
        </a>
      </nav>
      <div
        class="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.05em]"
        style="color: rgba(68, 71, 74, 1);"
      >
        © {{ currentYear }} INDUSTRIAL EDITORIAL. ALL RIGHTS RESERVED.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  font-family: 'Geist Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
</style>
