import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

export const test = base.extend<{
  homePage: HomePage;
  loginPage: LoginPage;
}>({
  homePage: async ({ page }, use) => {
    // Perform any setup or configuration for the page here
    await page.goto('/');

    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };