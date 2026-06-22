import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import puppeteer, { Browser, Page } from 'puppeteer';
import { spawn, ChildProcess } from 'child_process';
import waitOn from 'wait-on';

describe('Vapor Mode Stress Test', () => {
  let browser: Browser;
  let page: Page;
  let serverProcess: ChildProcess;

  beforeAll(async () => {
    serverProcess = spawn('npm', ['run', 'preview'], {
      stdio: 'ignore',
      detached: true
    });
    
    await waitOn({
      resources: ['https-get://localhost:4173/'],
      timeout: 10000,
      validateStatus: (status) => status >= 200 && status < 400
    });

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
    });
    page = await browser.newPage();
    await page.goto('https://localhost:4173/');
  }, 20000);

  afterAll(async () => {
    await browser.close();
    if (serverProcess && serverProcess.pid) {
      process.kill(-serverProcess.pid);
    }
  });

  it('Should handle 10,000 timeline events gracefully under 500ms', async () => {
    await page.evaluate(() => {
      window.fetch = async (url) => {
        if (url.toString().includes('events')) {
          const events = Array.from({ length: 10000 }).map((_, i) => ({
            id: `evt-${i}`,
            event_id: `evt-${i}`,
            asset_id: '123',
            actor_id: `actor-${i}`,
            timestamp: new Date().toISOString(),
            action_type: 'TRANSFORM',
            energy_kwh: 100,
            emission_factor: 0.5,
            signature: `sig-${i}`,
            public_key: `pub-${i}`,
            integrity_status: 'VALID'
          }));
          return new Response(JSON.stringify(events));
        }
        return fetch(url);
      };
    });

    await page.evaluate(() => {
      window.__mutationCount = 0;
      const observer = new MutationObserver((mutations) => {
        let nodeChanges = 0;
        for (const m of mutations) {
          nodeChanges += m.addedNodes.length;
          nodeChanges += m.removedNodes.length;
          if (m.type === 'attributes' || m.type === 'characterData') {
            nodeChanges += 1;
          }
        }
        window.__mutationCount += nodeChanges;
      });
      observer.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
    });

    const startTime = Date.now();
    
    await page.evaluate(() => {
      if ((window as any).__simulateScan) {
        (window as any).__simulateScan('https://example.com?asset_id=123');
      } else {
        throw new Error('__simulateScan not found');
      }
    });

    await page.waitForSelector('.border-l-2', { timeout: 5000 });
    
    const endTime = Date.now();
    const renderTime = endTime - startTime;

    const mutationCount = await page.evaluate(() => window.__mutationCount);

    // Standard VDOM would typically struggle or trigger mass reflows.
    // Vapor should handle this with minimal node overhead directly rendering.
    expect(renderTime).toBeLessThan(500); 
  });
});
