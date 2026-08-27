import { test, expect } from '@playwright/test';

const FORM_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/x-www-form-urlencoded',
  Origin: 'https://automationexercise.com',
  Referer: 'https://automationexercise.com/signup',
};

// A throwaway account is created and deleted inside this spec, so the run
// leaves no residue on the shared demo environment.
const uniqueEmail = `pw.api.${Date.now()}@example.com`;
const password = 'Str0ng!Pass';

const newUser = {
  name: 'PW Api',
  email: uniqueEmail,
  password,
  title: 'Mr',
  birth_date: '10',
  birth_month: '5',
  birth_year: '1990',
  firstname: 'PW',
  lastname: 'Api',
  company: 'Playwright',
  address1: '1 Test Street',
  address2: 'Suite 2',
  country: 'Canada',
  zipcode: 'A1A1A1',
  state: 'Ontario',
  city: 'Toronto',
  mobile_number: '5551234567',
};

test.describe.serial('User account lifecycle via API', () => {
  test('POST /createAccount registers a new user', { tag: '@smoke' }, async ({ request }) => {
    const response = await request.post(`${process.env.API_URL}/createAccount`, {
      headers: FORM_HEADERS,
      form: newUser,
    });

    const body = JSON.parse(await response.text());

    expect(body.responseCode).toBe(201);
    expect(body.message).toBe('User created!');
  });

  test(
    'GET /getUserDetailByEmail returns the persisted profile',
    { tag: '@smoke' },
    async ({ request }) => {
      const response = await request.get(`${process.env.API_URL}/getUserDetailByEmail`, {
        headers: FORM_HEADERS,
        params: { email: uniqueEmail },
      });

      const body = JSON.parse(await response.text());

      expect(body.responseCode).toBe(200);
      expect(body.user).toMatchObject({
        email: uniqueEmail,
        first_name: newUser.firstname,
        last_name: newUser.lastname,
        city: newUser.city,
      });
    },
  );

  test(
    'PUT /updateAccount changes an existing user',
    { tag: '@regression' },
    async ({ request }) => {
      const response = await request.put(`${process.env.API_URL}/updateAccount`, {
        headers: FORM_HEADERS,
        form: { ...newUser, city: 'Ottawa', firstname: 'Updated' },
      });

      const body = JSON.parse(await response.text());

      expect(body.responseCode).toBe(200);
      expect(body.message).toBe('User updated!');

      const check = await request.get(`${process.env.API_URL}/getUserDetailByEmail`, {
        headers: FORM_HEADERS,
        params: { email: uniqueEmail },
      });
      const checkBody = JSON.parse(await check.text());
      expect(checkBody.user).toMatchObject({
        first_name: 'Updated',
        city: 'Ottawa',
      });
    },
  );

  test('DELETE /deleteAccount removes the user', { tag: '@smoke' }, async ({ request }) => {
    const response = await request.delete(`${process.env.API_URL}/deleteAccount`, {
      headers: FORM_HEADERS,
      form: { email: uniqueEmail, password },
    });

    const body = JSON.parse(await response.text());

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('Account deleted!');
  });
});
