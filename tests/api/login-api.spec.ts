import { test, expect } from '@playwright/test';

test(
  'Verify user login via API',
  {
    tag: '@smoke',
  },
  async ({ request }) => {
    const response = await request.post(`${process.env.API_URL}/verifyLogin`, {
      form: {
        email: process.env.TEST_EMAIL!,
        password: process.env.TEST_PASSWORD!,
      },
    });

    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/plain');

    const responseBody = await response.text();

    expect(responseBody).toContain('User exists!');
  },
);
