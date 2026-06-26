import { computed, type Ref } from 'vue';
import type { SupplyChainEvent } from '@/lib/api/types';
import { useWasm, type WasmIntegrityResult } from '@/composables/useWasm';

export function useVerificationStatus(events: Ref<SupplyChainEvent[]>) {
  const { isReady, verifyIntegrity } = useWasm();

  const overallStatus = computed<WasmIntegrityResult['status']>(() => {
    if (!events.value.length || !isReady.value) return 'PENDING';
    let hasWarning = false;
    for (const event of events.value) {
      const { signature, public_key, integrity_status, ...payload } = event;
      const integrityResult = verifyIntegrity(payload, event.signature, event.public_key);
      if (integrityResult.status === 'INVALID') return 'INVALID';
      if (integrityResult.status === 'VALID' && event.integrity_status === 'UNAUTHORIZED') return 'UNAUTHORIZED';
      if (integrityResult.status === 'WARNING') hasWarning = true;
    }
    return hasWarning ? 'WARNING' : 'VALID';
  });

  return { overallStatus };
}
