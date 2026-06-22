import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import puppeteer, { Browser, Page } from 'puppeteer';
import { spawn, ChildProcess } from 'child_process';
import waitOn from 'wait-on';

describe('Stress Latency Tests', () => {
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

  it('should maintain <100ms latency and correct DOM mutations under rapid execution', async () => {
    for (let i = 0; i < 5; i++) {
        await page.goto('https://localhost:4173/');
        await page.waitForFunction(() => (window as any).__simulateScan !== undefined);

        const result = await page.evaluate(async () => {
          let mutations = 0;
          const observer = new MutationObserver((records) => {
             mutations += records.length;
          });
          observer.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
          
          return new Promise((resolve) => {
             const start = performance.now();
             (window as any).__simulateScan('https://example.com?asset_id=123');
             
             requestAnimationFrame(() => {
                setTimeout(() => {
                   observer.disconnect();
                   const end = performance.now();
                   const textExists = document.body.innerText.includes('Traceability Report');
                   resolve({ time: end - start, mutations: mutations, textExists });
                }, 0);
             });
          });
        });
        
        expect(result.textExists).toBe(true);
        expect(result.time).toBeLessThan(100);
        expect(result.mutations).toBeLessThan(100);
    }
  });
});
