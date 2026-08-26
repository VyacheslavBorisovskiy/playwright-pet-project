import { test, expect } from '../../fixtures/baseFixture';

test(
  'User can login',
  {
    tag: '@regression',
  },
  async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.goToLogin();

    await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);
    await expect(homePage.logoutLink).toBeVisible();
  },
);
