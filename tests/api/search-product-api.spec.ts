import { test, expect } from '@playwright/test';

const FORM_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/x-www-form-urlencoded',
  Origin: 'https://automationexercise.com',
  Referer: 'https://automationexercise.com/products',
};

test(
  'POST /searchProduct returns only products matching the search term',
  { tag: '@smoke' },
  async ({ request }) => {
    const term = 'top';

    const response = await request.post(`${process.env.API_URL}/searchProduct`, {
      headers: FORM_HEADERS,
      form: { search_product: term },
    });

    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text());

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    for (const product of body.products) {
      const haystack = `${product.name} ${product.category?.category ?? ''}`.toLowerCase();
      expect(haystack).toContain(term);
    }
  },
);

test(
  'POST /searchProduct without the search_product parameter returns 400',
  { tag: '@regression' },
  async ({ request }) => {
    const response = await request.post(`${process.env.API_URL}/searchProduct`, {
      headers: FORM_HEADERS,
    });

    // HTTP is still 200 - the real status lives in the payload.
    const body = JSON.parse(await response.text());

    expect(body.responseCode).toBe(400);
    expect(body.message).toContain('search_product parameter is missing');
  },
);
