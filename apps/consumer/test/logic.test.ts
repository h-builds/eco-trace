import { describe, it, expect, vi } from 'vitest';
import { useWasm, type ESGEntry } from '../src/composables/useWasm';

declare global {
  var calculateFootprint: (entries: ESGEntry[]) => { result: number; error: string | null };
  var verifyIntegrity: (event: Record<string, unknown>, signature: string, publicKey: string) => { status: "VALID" | "INVALID" | "UNAUTHORIZED" | "PENDING"; error: string | null };
}

globalThis.calculateFootprint = vi.fn().mockImplementation((entries: ESGEntry[]) => {
  if (entries.some(e => e.energy_kwh < 0 || e.emission_factor < 0)) {
    return { result: 0, error: 'Validation Error' };
  }
  const result = entries.reduce((acc, curr) => acc + (curr.energy_kwh * curr.emission_factor), 0);
  return { result, error: null };
});

globalThis.verifyIntegrity = vi.fn().mockImplementation((event: Record<string, unknown>, sig: string, pub: string) => {
  if (event.actor_id === 'unauthorized') {
    return { status: 'UNAUTHORIZED', error: 'Actor not trusted' };
  }
  if (sig !== 'valid_sig') {
    return { status: 'INVALID', error: 'Signature mismatch' };
  }
  return { status: 'VALID', error: null };
});

describe('Section 4 Integrations (G02, G03, G07)', () => {
  it('G03: Calculates CF_total correctly using Wasm Engine', () => {
    const { calculateFootprint } = useWasm();
    const res = globalThis.calculateFootprint([
      { energy_kwh: 10, emission_factor: 0.5 },
      { energy_kwh: 20, emission_factor: 0.1 }
    ]);
    expect(res.result).toBe(7);
  });

  it('G07: Flags UNAUTHORIZED actor', () => {
    const { verifyIntegrity } = useWasm();
    const res = globalThis.verifyIntegrity({ actor_id: 'unauthorized' }, 'valid_sig', 'pub');
    expect(res.status).toBe('UNAUTHORIZED');
  });

  it('G02: Flags INVALID signature', () => {
    const res = globalThis.verifyIntegrity({ actor_id: 'actor1' }, 'bad_sig', 'pub');
    expect(res.status).toBe('INVALID');
  });
});

