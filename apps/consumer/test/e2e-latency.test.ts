import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import puppeteer, { Browser, Page } from 'puppeteer';
import { spawn, ChildProcess } from 'child_process';
import waitOn from 'wait-on';

describe('E2E Latency Tests', () => {
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

  it('QR scan should render under 100ms with minimal DOM node updates', async () => {
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

    await page.waitForSelector('text/Traceability Report', { timeout: 2000 });
    
    const endTime = Date.now();
    const renderTime = endTime - startTime;

    const mutationCount = await page.evaluate(() => window.__mutationCount);

    expect(renderTime).toBeLessThan(100);
    expect(mutationCount).toBeLessThan(100);
  });
});
