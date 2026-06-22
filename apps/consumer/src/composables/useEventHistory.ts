import { ref, computed, shallowRef } from 'vue';
import { SupplyChainEvent, EventHistoryState } from '@/lib/api/types';
import { fetchEvents, API_BASE_URL, ApiError } from '@/lib/api/client';
import { swrFetch } from '@/lib/api/cache';

export function useEventHistory() {
  const status = ref<EventHistoryState>('idle');
  const events = shallowRef<SupplyChainEvent[]>([]); 
  const error = ref<string | null>(null);

  const isLoading = computed(() => status.value === 'loading' || status.value === 'idle');
  const isEmpty = computed(() => status.value === 'empty');
  const isError = computed(() => status.value === 'error');
  const isSuccess = computed(() => status.value === 'success');

  const fetchHistory = async (assetId?: string, forceRefresh = false) => {
    status.value = 'loading';
    error.value = null;

    const cacheKey = `${API_BASE_URL}/events${assetId ? `?asset_id=${assetId}` : ''}`;

    try {
      const data = await swrFetch<SupplyChainEvent[]>(
         cacheKey, 
        () => fetchEvents(assetId), 
        { forceRefresh, maxAgeMs: 5000 }
      );

      events.value = data;
      
      if (data.length === 0) {
        status.value = 'empty';
      } else {
        status.value = 'success';
      }
    } catch (err: unknown) {
      console.error("Backend fetch failed for event history:", err);
      if (err instanceof ApiError) {
        if (err.status === 404) {
          error.value = "Asset not found in the global ledger.";
        } else if (err.status >= 500) {
          error.value = "An internal system error occurred. Our engineers have been notified.";
        } else if (err.status === 0) {
          error.value = err.message || "Failed to load event timeline. Please check your connection.";
        } else {
          error.value = err.message || "An unexpected error occurred.";
        }
      } else {
        error.value = "Failed to load event timeline due to an unexpected error.";
      }
      status.value = 'error';
      events.value = [];
    }
  };

  return {
    status,
    events,
    error,
    isLoading,
    isEmpty,
    isError,
    isSuccess,
    fetchHistory
  };
}
