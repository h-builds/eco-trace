import { ref, onMounted } from 'vue';
import { getWasmInit } from '@/lib/wasm/engine';

export interface ESGEntry {
  energy_kwh: number;
  emission_factor: number;
}

export interface WasmFootprintResult {
  result: number;
  error: string | null;
}

export interface WasmIntegrityResult {
  status: "VALID" | "WARNING" | "INVALID" | "UNAUTHORIZED" | "PENDING";
  error: string | null;
  signature?: string;
  publicKey?: string;
}

const NOOP_RESULT: WasmFootprintResult = { result: 0, error: "Engine not ready" };
const NOOP_INTEGRITY: WasmIntegrityResult = { status: "PENDING", error: "Engine registry initializing" };

export function useWasm() {
  const isLoading = ref(true);
  const isReady = ref(false);
  const error = ref<string | null>(null);

  onMounted(() => {
    // Defer Wasm instantiation slightly to unblock the main thread for LCP (Largest Contentful Paint)
    setTimeout(() => {
      getWasmInit()
        .then(() => {
          isReady.value = true;
          isLoading.value = false;
        })
        .catch((err: Error) => {
          error.value = err.message;
          isLoading.value = false;
        });
    }, 100);
  });

  const calculateFootprint = (entries: ESGEntry[]): WasmFootprintResult => {
    if (!isReady.value || typeof globalThis.calculateFootprint !== "function") {
      return NOOP_RESULT;
    }
    return globalThis.calculateFootprint(entries);
  };

  const verifyIntegrity = (event: Record<string, unknown>, signature: string, publicKey: string): WasmIntegrityResult => {
    if (!isReady.value || typeof globalThis.verifyIntegrity !== "function") {
      return NOOP_INTEGRITY;
    }
    return globalThis.verifyIntegrity(event, signature, publicKey);
  };

  return {
    isLoading,
    isReady,
    error,
    calculateFootprint,
    verifyIntegrity
  };
}
