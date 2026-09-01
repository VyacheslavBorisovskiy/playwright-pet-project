import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly viewProductLink: Locator;
  readonly brandsSidebar: Locator;
  readonly brandProductsTitle: Locator;

  constructor(public readonly page: Page) {
    this.viewProductLink = page.getByRole('link', { name: 'View Product' }).first();
    this.brandsSidebar = page.locator('.brands_products');
    this.brandProductsTitle = page.locator('.features_items .title');
  }

  async viewProduct() {
    await this.viewProductLink.click();
  }

  async openBrand(brand: string) {
    await this.brandsSidebar.getByRole('link', { name: brand }).click();
  }
}
