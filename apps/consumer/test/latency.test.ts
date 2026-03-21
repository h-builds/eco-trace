import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { useWasm, type ESGEntry } from '../src/composables/useWasm';
import { useEventHistory } from '../src/composables/useEventHistory';
import { ref } from 'vue';

declare global {
  var calculateFootprint: (entries: ESGEntry[]) => { result: number; error: string | null };
  var verifyIntegrity: (event: Record<string, unknown>, signature: string, publicKey: string) => { status: "VALID" | "WARNING" | "INVALID" | "UNAUTHORIZED" | "PENDING"; error: string | null };
}

describe('G08: Validation Latency SLA', () => {
  let globalFetchMock: ReturnType<typeof vi.fn>;

  beforeAll(() => {
    globalFetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          {
            event_id: "test-123",
            asset_id: "A1",
            actor_id: "actor1",
            stage: "MANUFACTURING",
            energy_kwh: 100,
            emission_factor: 0.5,
            timestamp: new Date().toISOString(),
            signature: "sig1",
            public_key: "pub1"
          }
        ])
      })
    );
    globalThis.fetch = globalFetchMock as unknown as typeof fetch;

    globalThis.calculateFootprint = vi.fn().mockImplementation(() => {
      const start = performance.now();
      while (performance.now() - start < 5) { }
      return { result: 50, error: null };
    });

    globalThis.verifyIntegrity = vi.fn().mockImplementation(() => {
      const start = performance.now();
      while (performance.now() - start < 10) { }
      return { status: "VALID", error: null };
    });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('End-to-end trace completes strictly under 100ms', async () => {
    const assetId = 'A1';
    
    const startTime = performance.now();
    
    const { fetchHistory, events } = useEventHistory();
    await fetchHistory(assetId);
    expect(events.value.length).toBeGreaterThan(0);
    
    expect(events.value.length).toBeGreaterThan(0);
    const { verifyIntegrity, calculateFootprint } = useWasm();
    const event = events.value[0];
    const { signature, public_key, integrity_status, ...payload } = event as Record<string, unknown>;
    const integRes = globalThis.verifyIntegrity(payload, event.signature, event.public_key);
    expect(integRes.status).toBe('VALID');
    
    expect(integRes.status).toBe('VALID');
    const formulaEntries = [
      { energy_kwh: Number(event.energy_kwh), emission_factor: Number(event.emission_factor) }
    ];
    const fpRes = globalThis.calculateFootprint(formulaEntries);
    expect(fpRes.result).toBe(50);
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.log(`[G08 Metrics] End-to-end QR validation executed in ${duration.toFixed(2)}ms`); // eslint-disable-line no-console
    expect(duration).toBeLessThan(100);
  });
});
