import { chromium } from '@playwright/test';
import { checkApplicationHealth } from './tests/utils/applicationHealth';

async function globalSetup() {
  await checkApplicationHealth();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://automationexercise.com/');

  const consentButton = page.getByRole('button', { name: 'Consent' });

  if (await consentButton.isVisible({ timeout: 3000 })) {
    await consentButton.click();
  }

  await page.context().storageState({
    path: 'playwright/.auth/consent.json',
  });

  await browser.close();
}

export default globalSetup;
