import { test as base, expect, Page } from '@playwright/test';

type Fixtures = {
  homePage: Page;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    // Perform any setup or configuration for the page here
    await page.goto('/');

    const homeLink = page.getByRole('link', { name: 'Home' });
    await use(page);
  },
});

export { expect };