interface CacheEntry<T> {
  data: T;
  timestamp: number;
  maxAgeMs: number;
}

const cacheStore = new Map<string, CacheEntry<unknown>>();
const inFlightRequests = new Map<string, Promise<unknown>>();

export interface FetchOptions {
  /** Force network refresh by bypassing the cache completely */
  forceRefresh?: boolean;
  /** Max age in milliseconds before the cache is considered stale */
  maxAgeMs?: number;
}

export async function swrFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: FetchOptions = {}
): Promise<T> {
  const { forceRefresh = false, maxAgeMs = 60000 } = options;

  if (!forceRefresh && cacheStore.has(key)) {
    const entry = cacheStore.get(key) as CacheEntry<T>;
    const isStale = Date.now() - entry.timestamp > entry.maxAgeMs;
    
    if (!isStale) {
      return entry.data;
    }
    revalidateInBackground(key, fetcher, maxAgeMs);
    return entry.data;
  }

  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key) as Promise<T>;
  }

  const requestPromise = fetcher().then((data) => {
    cacheStore.set(key, { data, timestamp: Date.now(), maxAgeMs });
    inFlightRequests.delete(key);
    return data;
  }).catch((err) => {
    inFlightRequests.delete(key);
    throw err;
  });

  inFlightRequests.set(key, requestPromise);
  return requestPromise;
}

function revalidateInBackground<T>(key: string, fetcher: () => Promise<T>, maxAgeMs: number) {
  if (inFlightRequests.has(key)) return;

  const requestPromise = fetcher().then((data) => {
    cacheStore.set(key, { data, timestamp: Date.now(), maxAgeMs });
    inFlightRequests.delete(key);
  }).catch((err) => {
    console.error(`SWR Background Revalidation failed for ${key}`, err);
    inFlightRequests.delete(key);
  });

  inFlightRequests.set(key, requestPromise);
}

export function clearCache() {
  cacheStore.clear();
}
