import { test, expect } from '../../fixtures/baseFixture';

test(
  'User can open the women dress sub-category',
  {
    tag: '@regression',
  },
  async ({ homePage }) => {
    await homePage.open();
    await homePage.openWomenCategory();
    await homePage.openWomenDressSubCat();

    await expect(homePage.womenDressSubCatText).toBeVisible();
  },
);
