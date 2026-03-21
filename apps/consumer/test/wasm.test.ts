import { describe, it, expect } from 'vitest';
import { useWasm } from '../src/composables/useWasm';

describe('Wasm Cryptographic Bridge', () => {
  it('exposes verifyIntegrity and calculateFootprint', () => {
    const { verifyIntegrity, calculateFootprint } = useWasm();
    expect(typeof verifyIntegrity).toBe('function');
    expect(typeof calculateFootprint).toBe('function');
  });

  it('enforces read-only boundary (does not expose GenerateUntrustedSignature or SignEvent)', () => {
    const wasm = useWasm() as Record<string, unknown>;
    expect(wasm.generateUntrustedSignature).toBeUndefined();
    expect(wasm.signEvent).toBeUndefined();
  });
});
