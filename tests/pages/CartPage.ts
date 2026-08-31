import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly addToCartButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly registerLoginLink: Locator;

  constructor(public readonly page: Page) {
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
    this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
    this.registerLoginLink = page.getByRole('link', { name: 'Register / Login' });
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async viewCart() {
    await this.viewCartLink.click();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async goToRegisterLogin() {
    await this.registerLoginLink.click();
  }
}
