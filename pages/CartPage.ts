import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly proceedToCheckoutButton: Locator;
  readonly registerLoginLink: Locator;

  constructor(public readonly page: Page) {
    this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
    this.registerLoginLink = page.getByRole('link', { name: 'Register / Login' });
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async goToRegisterLogin() {
    await this.registerLoginLink.click();
  }
}
