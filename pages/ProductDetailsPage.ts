import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
  readonly addToCartButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly writeReviewLink: Locator;

  constructor(public readonly page: Page) {
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.writeReviewLink = page.getByRole('link', { name: 'Write Your Review' });
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
