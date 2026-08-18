import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly loginLink: Locator;
  readonly logoutLink: Locator;

  constructor(public readonly page: Page) {
    this.loginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  async acceptConsent() {
    await this.page
      .getByRole('button', { name: 'Consent' })
      .click();
  }

  async goToLogin() {
    this.loginLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }
}