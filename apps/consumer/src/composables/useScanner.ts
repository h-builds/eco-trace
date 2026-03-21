import { ref, onUnmounted, shallowRef } from 'vue';

export type ScannerState = 'idle' | 'requesting' | 'granted' | 'denied' | 'unavailable';

declare global {
  interface Window {
    BarcodeDetector: {
      new (options?: { formats: string[] }): {
        detect(video: HTMLVideoElement): Promise<Array<{ rawValue: string }>>;
      };
    };
  }
}

export function useScanner(onScan: (value: string) => void) {
  const state = ref<ScannerState>('idle');
  const error = ref<string | null>(null);
  const stream = shallowRef<MediaStream | null>(null);
  const videoRef = shallowRef<HTMLVideoElement | null>(null);
  let animationFrameId: number | null = null;

  const start = async () => {
    if (typeof window === 'undefined') return;
    if (!('mediaDevices' in navigator) || !navigator.mediaDevices.getUserMedia) {
      state.value = 'unavailable';
      error.value = 'Camera API not supported.';
      return;
    }

    if (!('BarcodeDetector' in window)) {
      state.value = 'unavailable';
      error.value = 'Native BarcodeDetector API not supported in this browser.';
      return;
    }

    try {
      state.value = 'requesting';
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      stream.value = s;
      if (videoRef.value) {
        videoRef.value.srcObject = s;
        videoRef.value.setAttribute('playsinline', 'true');
        await videoRef.value.play();
      }
      state.value = 'granted';
      startScanning();
    } catch (err: unknown) {
      state.value = 'denied';
      error.value = err instanceof Error ? err.message : 'Camera permission denied.';
    }
  };

  const stop = () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    if (stream.value) {
      stream.value.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      stream.value = null;
    }
    state.value = 'idle';
  };

  const startScanning = () => {
    if (typeof window === 'undefined') return;
    const scanner = new window.BarcodeDetector({ formats: ['qr_code'] });
    
    const scanFrame = async () => {
      if (!videoRef.value || videoRef.value.readyState !== videoRef.value.HAVE_ENOUGH_DATA) {
        animationFrameId = requestAnimationFrame(scanFrame);
        return;
      }
      try {
        const barcodes = await scanner.detect(videoRef.value);
        if (barcodes && barcodes.length > 0) {
          const rawValue = barcodes[0].rawValue;
          stop();
          onScan(rawValue);
          return;
        }
      } catch (err: unknown) {
        void err;
      }
      animationFrameId = requestAnimationFrame(scanFrame);
    };
    
    scanFrame();
  };

  onUnmounted(() => {
    stop();
  });

  return { state, error, videoRef, start, stop };
}
