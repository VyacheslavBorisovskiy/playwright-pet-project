import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly productsLink: Locator;
  readonly womenCategoryLink: Locator;
  readonly womenDressSubCatLink: Locator;
  readonly womenDressSubCatText: Locator;

  constructor(public readonly page: Page) {
    this.loginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.womenCategoryLink = page.getByRole('link', { name: 'Women' });
    this.womenDressSubCatLink = page.getByRole('link', { name: 'Dress' });
    this.womenDressSubCatText = page.getByText('Women - Dress Products', { exact: true });
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
    await this.productsLink.click();
  }

  async openWomenCategory() {
    await this.womenCategoryLink.click();
  }

  async openWomenDressSubCat() {
    await this.womenDressSubCatLink.click();
  }
}
