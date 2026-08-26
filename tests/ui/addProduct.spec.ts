import { test, expect } from '../../fixtures/baseFixture';

test(
  'User can add a product to the cart',
  {
    tag: '@smoke',
  },
  async ({ homePage, productsPage, productDetailsPage }) => {
    await homePage.open();
    await homePage.openProducts();
    await productsPage.viewProduct();
    await productDetailsPage.addToCart();
    await productDetailsPage.continueShopping();

    await expect(productDetailsPage.writeReviewLink).toBeVisible();
  },
);
