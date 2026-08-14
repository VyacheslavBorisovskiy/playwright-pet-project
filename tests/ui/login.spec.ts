import { test, expect } from '../../fixtures/baseFixture';

test('User can login', {
  tag: '@regression',
}, async ({ homePage }) => {
  await homePage.getByRole('button', { name: 'Consent' }).click();
  await homePage.getByRole('link', { name: 'Signup / Login' }).click();
  await homePage.getByPlaceholder('Email Address').first().fill(process.env.TEST_EMAIL!);
  await homePage.getByPlaceholder('Password').fill(process.env.TEST_PASSWORD!);
  await homePage.getByRole('button', { name: 'Login' }).click();
  await expect(homePage.getByRole('link', { name: 'Logout' })).toBeVisible();
});