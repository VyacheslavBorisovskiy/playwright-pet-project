import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly viewProductLink: Locator;

  constructor(public readonly page: Page) {
    this.viewProductLink = page.getByRole('link', { name: 'View Product' }).first();
  }

  async viewProduct() {
    await this.viewProductLink.click();
  }
}
