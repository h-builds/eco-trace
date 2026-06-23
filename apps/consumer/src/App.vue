<script setup lang="ts">
import { ref } from 'vue';
import { useWasm } from '@/composables/useWasm';
import NavBar from './components/NavBar.vue';
import LandingPage from './components/LandingPage.vue';
import ScannerView from './components/ScannerView.vue';
import TransparencyScreen from './components/TransparencyScreen.vue';

type ViewState = 'landing' | 'scanner' | 'transparency';

const { error } = useWasm();
const currentView = ref<ViewState>('landing');
const activeAssetId = ref<string | null>(null);

const navigate = (view: ViewState) => {
  currentView.value = view;
  if (view === 'landing') activeAssetId.value = null;
};

const handleScan = (assetId: string) => {
  try {
    const url = new URL(assetId);
    activeAssetId.value = url.searchParams.get('asset_id') || assetId;
  } catch (err: unknown) {
    console.debug('Scanned text is not a valid URL, using raw string:', err);
    activeAssetId.value = assetId;
  }
  currentView.value = 'transparency';
};

declare global {
  interface Window {
    __simulateScan?: (assetId: string) => void;
  }
}

if (typeof window !== 'undefined') {
  window.__simulateScan = handleScan;
}

const handleReset = () => {
  activeAssetId.value = null;
  currentView.value = 'landing';
};
</script>

<template>
  <div class="font-sans antialiased min-h-screen bg-surface-canvas">
    <NavBar @navigate="navigate" />

    <div
      v-if="error"
      class="fixed bottom-4 left-4 right-4 z-50 text-functional-alert bg-surface-card p-4 border border-functional-alert rounded-md shadow-elevation-1"
    >
      <p class="font-bold flex items-center gap-2">
        <svg
          class="w-5 h-5"
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
        Engine Error
      </p>

      <p class="text-sm mt-1 text-functional-neutral">
        {{ error }}
      </p>
    </div>

    <main class="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-16">
      <LandingPage
        v-if="currentView === 'landing'"
        @navigate="navigate"
      />
      <ScannerView
        v-else-if="currentView === 'scanner'"
        @scan="handleScan"
      />
      <TransparencyScreen
        v-else-if="currentView === 'transparency' && activeAssetId"
        :asset-id="activeAssetId"
        @reset="handleReset"
      />
    </main>
  </div>
</template>
