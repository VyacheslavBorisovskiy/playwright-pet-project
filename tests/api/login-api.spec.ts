import { test, expect } from '@playwright/test';

test(
  'Verify login via API',
  {
    tag: '@smoke',
  },
  async ({ request }) => {
    const response = await request.post(`${process.env.API_URL}/verifyLogin`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
        Origin: 'https://automationexercise.com',
        Referer: 'https://automationexercise.com/login',
      },
      form: {
        email: process.env.TEST_EMAIL!,
        password: process.env.TEST_PASSWORD!,
      },
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.text();

    expect(responseBody).toContain('User exists!');
  },
);
