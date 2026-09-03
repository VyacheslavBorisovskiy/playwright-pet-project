import { test, expect } from '@playwright/test';

const JSON_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  Origin: 'https://automationexercise.com',
  Referer: 'https://automationexercise.com/',
};

test(
  'GET /brandsList returns the full list of brands with a valid schema',
  { tag: '@regression' },
  async ({ request }) => {
    const response = await request.get(`${process.env.API_URL}/brandsList`, {
      headers: JSON_HEADERS,
    });

    expect(response.status()).toBe(200);

    // The API answers with HTTP 200 even on failure, so trust the body.
    const body = JSON.parse(await response.text());

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.brands)).toBe(true);
    expect(body.brands.length).toBeGreaterThan(0);

    const brand = body.brands[0];
    expect(brand).toMatchObject({
      id: expect.any(Number),
      brand: expect.any(String),
    });

    // Every product must be uniquely identifiable.
    const ids = body.brands.map((p: { id: number }) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  },
);

test('POST /brandsList is not allowed (405)', { tag: '@regression' }, async ({ request }) => {
  const response = await request.post(`${process.env.API_URL}/brandsList`, {
    headers: JSON_HEADERS,
  });

  const body = JSON.parse(await response.text());

  expect(body.responseCode).toBe(405);
  expect(body.message).toContain('not supported');
});
