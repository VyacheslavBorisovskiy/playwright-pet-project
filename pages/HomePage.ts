import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly productsLink: Locator;

  constructor(public readonly page: Page) {
    this.loginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.productsLink = page.getByRole('link', { name: 'Products' });
  }

  async open() {
    await this.page.goto('/');
  }

  async goToLogin() {
    await this.loginLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async openProducts() {
    this.productsLink.click();
  }
}
