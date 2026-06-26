import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useVerificationStatus } from '../useVerificationStatus';
import * as useWasmModule from '@/composables/useWasm';
import type { SupplyChainEvent } from '@/lib/api/types';

vi.mock('@/composables/useWasm', () => ({
  useWasm: vi.fn(),
}));

describe('useVerificationStatus', () => {
  const mockVerifyIntegrity = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    (useWasmModule.useWasm as any).mockReturnValue({
      isReady: ref(true),
      verifyIntegrity: mockVerifyIntegrity,
    });
  });

  it('returns PENDING if not ready', () => {
    (useWasmModule.useWasm as any).mockReturnValue({
      isReady: ref(false),
      verifyIntegrity: mockVerifyIntegrity,
    });
    const events = ref<SupplyChainEvent[]>([{ id: '1' } as any]);
    const { overallStatus } = useVerificationStatus(events);
    expect(overallStatus.value).toBe('PENDING');
  });

  it('returns PENDING if no events', () => {
    const events = ref<SupplyChainEvent[]>([]);
    const { overallStatus } = useVerificationStatus(events);
    expect(overallStatus.value).toBe('PENDING');
  });

  it('returns VALID if all valid', () => {
    mockVerifyIntegrity.mockReturnValue({ status: 'VALID' });
    const events = ref<SupplyChainEvent[]>([{ id: '1', integrity_status: 'VALID' } as any]);
    const { overallStatus } = useVerificationStatus(events);
    expect(overallStatus.value).toBe('VALID');
  });

  it('returns INVALID if any invalid', () => {
    mockVerifyIntegrity.mockReturnValueOnce({ status: 'VALID' }).mockReturnValueOnce({ status: 'INVALID' });
    const events = ref<SupplyChainEvent[]>([
      { id: '1', integrity_status: 'VALID' } as any,
      { id: '2', integrity_status: 'VALID' } as any,
    ]);
    const { overallStatus } = useVerificationStatus(events);
    expect(overallStatus.value).toBe('INVALID');
  });
  
  it('returns UNAUTHORIZED if valid but integrity_status is UNAUTHORIZED', () => {
    mockVerifyIntegrity.mockReturnValue({ status: 'VALID' });
    const events = ref<SupplyChainEvent[]>([
      { id: '1', integrity_status: 'UNAUTHORIZED' } as any,
    ]);
    const { overallStatus } = useVerificationStatus(events);
    expect(overallStatus.value).toBe('UNAUTHORIZED');
  });
  
  it('returns WARNING if warning exists and no invalid/unauthorized', () => {
    mockVerifyIntegrity.mockReturnValue({ status: 'WARNING' });
    const events = ref<SupplyChainEvent[]>([
      { id: '1', integrity_status: 'VALID' } as any,
    ]);
    const { overallStatus } = useVerificationStatus(events);
    expect(overallStatus.value).toBe('WARNING');
  });
});
