import { test, expect } from '../../fixtures/baseFixture';

test(
  'User can log out',
  {
    tag: '@regression',
  },
  async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.goToLogin();
    await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);
    await expect(homePage.logoutLink).toBeVisible();
    await homePage.logout();
    await expect(loginPage.page).toHaveURL(`${process.env.BASE_URL}/login`);
  },
);
