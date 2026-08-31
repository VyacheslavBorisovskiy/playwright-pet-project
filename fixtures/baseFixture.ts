import { test as base, expect } from '@playwright/test';
import { HomePage } from '../tests/pages/HomePage';
import { LoginPage } from '../tests/pages/LoginPage';
import { ProductsPage } from '../tests/pages/ProductsPage';
import { CartPage } from '../tests/pages/CartPage';

type Fixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    await page.route('**/*', async (route) => {
      const url = route.request().url();

      if (url.includes('googlesyndication') || url.includes('doubleclick')) {
        await route.abort();
        return;
      }

      await route.continue();
    });

    await use(page);
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect };
