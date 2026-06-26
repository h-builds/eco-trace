import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import LandingPage from './LandingPage.vue'
import { ref } from 'vue'
import * as useEventHistoryModule from '@/composables/useEventHistory'
import * as useWasmModule from '@/composables/useWasm'

vi.spyOn(useWasmModule, 'useWasm').mockReturnValue({
  isLoading: ref(false),
  isReady: ref(true),
  error: ref(null),
  calculateFootprint: vi.fn(),
  verifyIntegrity: vi.fn(),
} as unknown as ReturnType<typeof useWasmModule.useWasm>)

describe('LandingPage.vue', () => {
  it('shows WARNING for Compliance Rating while loading', async () => {
    vi.spyOn(useEventHistoryModule, 'useEventHistory').mockReturnValue({
      events: ref([]),
      isLoading: ref(true),
      isEmpty: ref(false),
      isError: ref(false),
      isSuccess: ref(false),
      status: ref('loading'),
      error: ref(null),
      fetchHistory: vi.fn(),
    } as unknown as ReturnType<typeof useEventHistoryModule.useEventHistory>)

    const wrapper = mount(LandingPage)
    
    const text = wrapper.text()
    
    expect(text).toContain('Compliance Rating')
    expect(text).toContain('LOADING...')
    expect(text).toContain('Fetching status...')
  })
})
