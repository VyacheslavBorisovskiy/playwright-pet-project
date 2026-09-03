import { test, expect } from '../../fixtures/baseFixture';

test(
  'User can open brand on the products page',
  {
    tag: '@regression',
  },
  async ({ homePage, productsPage }) => {
    await homePage.open();
    await homePage.openProducts();
    await productsPage.openBrand('Polo');

    await expect(productsPage.brandProductsTitle).toHaveText('Brand - Polo Products');
  },
);
