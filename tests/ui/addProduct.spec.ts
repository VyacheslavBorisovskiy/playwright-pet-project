import { test, expect } from '../../fixtures/baseFixture';

test(
  'User can add a product to the cart',
  {
    tag: '@smoke',
  },
  async ({ homePage, productsPage, cartPage }) => {
    await homePage.open();
    await homePage.openProducts();
    await productsPage.viewProduct();
    await cartPage.addToCart();
    await cartPage.viewCart();

    await expect(cartPage.proceedToCheckoutButton).toBeVisible();
  },
);
