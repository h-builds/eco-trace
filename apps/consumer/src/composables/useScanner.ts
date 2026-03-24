import { ref, onUnmounted, shallowRef } from 'vue';
import QrScanner from 'qr-scanner';

if (typeof window !== 'undefined' && typeof HTMLCanvasElement !== 'undefined') {
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  // @ts-expect-error
  HTMLCanvasElement.prototype.getContext = function(
    this: HTMLCanvasElement,
    contextId: string,
    options?: Record<string, unknown>
  ) {
    if (contextId === '2d') {
      options = { ...(options || {}), willReadFrequently: true };
    }
    return originalGetContext.call(this, contextId, options);
  };
}

export type ScannerState = 'idle' | 'requesting' | 'granted' | 'denied' | 'unavailable';

export function useScanner(onScan: (value: string) => void) {
  const state = ref<ScannerState>('idle');
  const error = ref<string | null>(null);
  const videoRef = shallowRef<HTMLVideoElement | null>(null);
  let qrScanner: QrScanner | null = null;

  const start = async () => {
    if (typeof window === 'undefined') return;

    if (!videoRef.value) return;

    try {
      state.value = 'requesting';
      
      const hasCamera = await QrScanner.hasCamera();
      if (!hasCamera) {
        state.value = 'unavailable';
        error.value = 'Camera API not supported or no cameras found.';
        return;
      }

      qrScanner = new QrScanner(
          videoRef.value,
          (result: { data: string }) => {
              stop();
              onScan(result.data);
          },
          { returnDetailedScanResult: true }
      );

      await qrScanner.start();
      state.value = 'granted';
    } catch (err: unknown) {
      state.value = 'denied';
      error.value = err instanceof Error ? err.message : 'Camera permission denied.';
      if (qrScanner) {
        qrScanner.destroy();
        qrScanner = null;
      }
    }
  };

  const stop = () => {
    if (qrScanner) {
      qrScanner.destroy();
      qrScanner = null;
    }
    state.value = 'idle';
  };

  onUnmounted(() => {
    stop();
  });

  return { state, error, videoRef, start, stop };
}
