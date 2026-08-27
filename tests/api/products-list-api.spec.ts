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
  'GET /productsList returns the full product catalogue with a valid schema',
  { tag: '@smoke' },
  async ({ request }) => {
    const response = await request.get(`${process.env.API_URL}/productsList`, {
      headers: JSON_HEADERS,
    });

    expect(response.status()).toBe(200);

    // The API answers with HTTP 200 even on failure, so trust the body.
    const body = JSON.parse(await response.text());

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    const product = body.products[0];
    expect(product).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(String),
      brand: expect.any(String),
    });
    expect(product.category).toMatchObject({
      usertype: { usertype: expect.any(String) },
      category: expect.any(String),
    });

    // Every product must be uniquely identifiable.
    const ids = body.products.map((p: { id: number }) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  },
);

test('POST /productsList is not allowed (405)', { tag: '@regression' }, async ({ request }) => {
  const response = await request.post(`${process.env.API_URL}/productsList`, {
    headers: JSON_HEADERS,
  });

  const body = JSON.parse(await response.text());

  expect(body.responseCode).toBe(405);
  expect(body.message).toContain('not supported');
});
