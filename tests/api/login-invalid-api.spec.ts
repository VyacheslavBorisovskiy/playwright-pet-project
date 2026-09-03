import { test, expect } from '@playwright/test';

const FORM_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/x-www-form-urlencoded',
  Origin: 'https://automationexercise.com',
  Referer: 'https://automationexercise.com',
};

test('POST /verifyLogin without email returns 400', { tag: '@regression' }, async ({ request }) => {
  const response = await request.post(`${process.env.API_URL}/verifyLogin`, {
    headers: FORM_HEADERS,
    form: {
      password: process.env.TEST_PASSWORD!,
    },
  });

  // HTTP is still 200 - the real status lives in the payload.
  const body = JSON.parse(await response.text());

  expect(body.responseCode).toBe(400);
  expect(body.message).toContain(
    'Bad request, email or password parameter is missing in POST request',
  );
});

test(
  'POST /verifyLogin with invalid email and password returns 400',
  { tag: '@regression' },
  async ({ request }) => {
    const response = await request.post(`${process.env.API_URL}/verifyLogin`, {
      headers: FORM_HEADERS,
      form: {
        email: 'abc',
        password: 'abc',
      },
    });

    // HTTP is still 200 - the real status lives in the payload.
    const body = JSON.parse(await response.text());

    expect(body.responseCode).toBe(404);
    expect(body.message).toContain('User not found!');
  },
);
