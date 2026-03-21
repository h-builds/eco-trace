import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchEvents, ApiError, API_BASE_URL } from '../src/lib/api/client';
import { swrFetch, clearCache } from '../src/lib/api/cache';
import { useEventHistory } from '../src/composables/useEventHistory';

const mockEvents = [
  {
    id: "1",
    event_id: "e1",
    asset_id: "a1",
    actor_id: "actor1",
    timestamp: "2026-03-20T10:00:00Z",
    action_type: "ORIGIN",
    energy_kwh: 10,
    emission_factor: 0.5,
    signature: "sig1",
    public_key: "pub1",
    integrity_status: "VALID"
  }
];

describe('API Client', () => {
  let globalFetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    globalFetchMock = vi.fn();
    globalThis.fetch = globalFetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchEvents builds correct URL and returns data', async () => {
    globalFetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockEvents,
    });

    const data = await fetchEvents('asset-123');
    expect(globalFetchMock).toHaveBeenCalledTimes(1);
    
    const callUrl = globalFetchMock.mock.calls[0][0];
    expect(callUrl).toContain(`${API_BASE_URL}/events`);
    expect(callUrl).toContain('asset_id=asset-123');
    
    expect(data).toEqual(mockEvents);
  });

  it('fetchEvents throws ApiError on failure', async () => {
    globalFetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Asset not found' }),
    });

    await expect(fetchEvents('asset-000')).rejects.toThrow(ApiError);
    await expect(fetchEvents('asset-000')).rejects.toThrow('Asset not found');
  });
});

describe('SWR Cache & Deduplication', () => {
  beforeEach(() => {
    clearCache();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('deduplicates concurrent requests', async () => {
    let callCount = 0;
    const fetcher = async () => {
      callCount++;
      return new Promise((resolve) => setTimeout(() => resolve('data'), 100));
    };

    const p1 = swrFetch('key1', fetcher);
    const p2 = swrFetch('key1', fetcher);
    const p3 = swrFetch('key1', fetcher);

    vi.advanceTimersByTime(150);

    const results = await Promise.all([p1, p2, p3]);
    
    expect(results).toEqual(['data', 'data', 'data']);
    expect(callCount).toBe(1);
  });

  it('returns stale cache immediately and revalidates in background', async () => {
    let callCount = 0;
    const fetcher = async () => {
      callCount++;
      return `data-v${callCount}`;
    };

    const p1 = swrFetch('key2', fetcher, { maxAgeMs: 1000 });
    expect(await p1).toBe('data-v1');
    expect(callCount).toBe(1);

    vi.advanceTimersByTime(1500);

    const p2 = swrFetch('key2', fetcher, { maxAgeMs: 1000 });
    
    expect(await p2).toBe('data-v1'); 
    
    expect(callCount).toBe(2);

    await Promise.resolve();

    const p3 = swrFetch('key2', fetcher, { maxAgeMs: 1000 });
    expect(await p3).toBe('data-v2');
  });
});

describe('useEventHistory Composable', () => {
  let globalFetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    clearCache();
    globalFetchMock = vi.fn();
    globalThis.fetch = globalFetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('transitions from loading to empty correctly', async () => {
    globalFetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const { status, isEmpty, isLoading, isSuccess, fetchHistory, events } = useEventHistory();
    
    expect(status.value).toBe('idle');
    expect(events.value).toEqual([]);

    const fetchPromise = fetchHistory('asset-1');
    expect(isLoading.value).toBe(true);
    expect(status.value).toBe('loading');

    await fetchPromise;

    expect(isEmpty.value).toBe(true);
    expect(isLoading.value).toBe(false);
    expect(isSuccess.value).toBe(false);
    expect(events.value).toEqual([]);
  });

  it('transitions from loading to success correctly', async () => {
    globalFetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockEvents,
    });

    const { status, isSuccess, fetchHistory, events } = useEventHistory();
    
    await fetchHistory('asset-1');

    expect(isSuccess.value).toBe(true);
    expect(status.value).toBe('success');
    expect(events.value).toEqual(mockEvents);
  });

  it('transitions from loading to error correctly', async () => {
    globalFetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });

    const { status, isError, error, fetchHistory, events } = useEventHistory();
    
    await fetchHistory('asset-error');

    expect(isError.value).toBe(true);
    expect(status.value).toBe('error');
    expect(error.value).toBe('Internal Server Error');
    expect(events.value).toEqual([]);
  });
});
