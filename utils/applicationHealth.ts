import { chromium } from '@playwright/test';

export async function checkApplicationHealth() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    const response = await page.goto(
      process.env.BASE_URL!,
      {
        waitUntil: 'domcontentloaded',
        timeout: 30_000,
      }
    );

    if (!response?.ok()) {
      throw new Error(
        `Application health check failed: HTTP ${response?.status() ?? 'NO RESPONSE'
        }`
      );
    }
    console.log('Application is available');
  } finally {
    await browser.close();
  }
}