import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HeroSection from './HeroSection.vue';

describe('HeroSection.vue', () => {
  it('renders correctly and has the demo and scanner CTAs', () => {
    const wrapper = mount(HeroSection);

    const useDemoBtn = wrapper.find('#cta-use-demo-product');
    expect(useDemoBtn.exists()).toBe(true);
    expect(useDemoBtn.text()).toContain('Use Demo Product');

    const openScannerBtn = wrapper.find('#cta-launch-scanner');
    expect(openScannerBtn.exists()).toBe(true);
    expect(openScannerBtn.text()).toContain('Open QR Scanner');
  });

  it('emits demoProduct event when Use Demo Product is clicked', async () => {
    const wrapper = mount(HeroSection);

    const useDemoBtn = wrapper.find('#cta-use-demo-product');
    await useDemoBtn.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('demoProduct');
    expect(wrapper.emitted('demoProduct')!.length).toBe(1);
  });

  it('emits navigate event with scanner argument when Open QR Scanner is clicked', async () => {
    const wrapper = mount(HeroSection);

    const openScannerBtn = wrapper.find('#cta-launch-scanner');
    await openScannerBtn.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('navigate');
    expect(wrapper.emitted('navigate')![0]).toEqual(['scanner']);
  });
});
