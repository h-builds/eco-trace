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
} as any)

describe('LandingPage.vue', () => {
  it('shows WARNING for Compliance Rating while loading', async () => {
    // Mock the composable to return isLoading=true and events=[]
    vi.spyOn(useEventHistoryModule, 'useEventHistory').mockReturnValue({
      events: ref([]),
      isLoading: ref(true),
      isEmpty: ref(false),
      isError: ref(false),
      isSuccess: ref(false),
      status: ref('loading'),
      error: ref(null),
      fetchHistory: vi.fn(),
    } as any)

    const wrapper = mount(LandingPage)
    
    // Check Compliance Rating text
    const text = wrapper.text()
    
    // Test that the page renders neutral loading state while loading
    expect(text).toContain('Compliance Rating')
    expect(text).toContain('LOADING...')
    expect(text).toContain('Fetching status...')

    console.log('BUG FIXED: Shows LOADING... when loading.')
  })
})
