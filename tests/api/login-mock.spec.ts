import { test, expect } from '@playwright/test';

test('should mock successful login response', async ({ page }) => {
  await page.route(`${process.env.API_URL}/verifyLogin`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/plain',
      body: 'User exists!',
    });
  });

  // Example application request
  const response = await page.evaluate(async (apiUrl) => {
    const formData = new URLSearchParams();

    formData.append('email', 'test@example.com');
    formData.append('password', 'password123');

    const response = await fetch(`${apiUrl}/verifyLogin`, {
      method: 'POST',
      body: formData,
    });

    return {
      status: response.status,
      body: await response.text(),
    };
  }, process.env.API_URL);

  expect(response.status).toBe(200);
  expect(response.body).toBe('User exists!');
});
