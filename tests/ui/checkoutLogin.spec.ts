import { test, expect } from '../../fixtures/baseFixture';

test(
  'User is prompted to login when proceeding to checkout',
  {
    tag: '@regression',
  },
  async ({ homePage, productsPage, productDetailsPage, cartPage, loginPage }) => {
    await homePage.open();
    await homePage.openProducts();
    // await page.pause();
    await productsPage.viewProduct();
    await productDetailsPage.addToCart();
    await productDetailsPage.viewCart();
    await cartPage.proceedToCheckout();
    await cartPage.goToRegisterLogin();

    await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);
    await expect(homePage.logoutLink).toBeVisible();
  },
);
