import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  baseUrl: process.env.BASE_URL,
  apiUrl: process.env.API_URL,
  testEmail: process.env.TEST_EMAIL,
  testPassword: process.env.TEST_PASSWORD,
};

if (!env.apiUrl || !env.testEmail || !env.testPassword) {
  throw new Error(
    'API_URL, TEST_EMAIL and TEST_PASSWORD must be defined'
  );
}