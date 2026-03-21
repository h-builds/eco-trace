<script setup lang="ts">
import { ref } from 'vue';
import { useWasm } from '@/composables/useWasm';
import ScannerView from './components/ScannerView.vue';
import TransparencyScreen from './components/TransparencyScreen.vue';

const { isReady, error } = useWasm();
const activeAssetId = ref<string | null>(null);

const handleScan = (assetId: string) => {
  try {
    const url = new URL(assetId);
    activeAssetId.value = url.searchParams.get('asset_id') || assetId;
  } catch {
    activeAssetId.value = assetId; 
  }
};

const handleReset = () => {
  activeAssetId.value = null;
};
</script>

<template>
  <div class="font-sans antialiased min-h-screen bg-brand-deep-charcoal">
    <div v-if="error" class="fixed bottom-4 left-4 right-4 z-50 text-functional-alert bg-surface-card p-4 border border-functional-alert rounded-md shadow-elevation-1">
      <p class="font-bold flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        Engine Error
      </p>
      <p class="text-sm mt-1 text-functional-neutral">{{ error }}</p>
    </div>
    
    <div v-if="!activeAssetId">
      <ScannerView @scan="handleScan" />
    </div>
    
    <div v-else>
      <TransparencyScreen :asset-id="activeAssetId" @reset="handleReset" />
    </div>
  </div>
</template>
