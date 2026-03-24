import { describe, it, expect } from 'vitest';
import { useEventHistory } from '../src/composables/useEventHistory';
import { useScanner } from '../src/composables/useScanner';
import { isRef, isShallow } from 'vue';

describe('Vapor Mode Reactivity Safety Checks', () => {
  it('useEventHistory utilizes shallowRef exclusively for heavy collections', () => {
    const { events, status, error } = useEventHistory();
    
    expect(isRef(events)).toBe(true);
    expect(isShallow(events)).toBe(true);
    
    expect(isRef(status)).toBe(true);
  });

  it('useScanner implements state machine using references natively', () => {
    const { state, error, videoRef } = useScanner(() => {});
    
    expect(isRef(state)).toBe(true);
    expect(isRef(error)).toBe(true);
    expect(isRef(videoRef)).toBe(true);
    expect(isShallow(videoRef)).toBe(true);
  });
});
