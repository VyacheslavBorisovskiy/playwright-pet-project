// import { test, expect } from '@playwright/test';

// test.describe('Login Page', () => {
//   test.beforeEach(async ({ page }) => {
//     // Navigate to login page before each test
//     await page.goto('/login');

//     // Dismiss consent dialog if present
//     const consentButton = page.getByRole('button', { name: 'Consent' });
//     if (await consentButton.isVisible()) {
//       await consentButton.click();
//     }
//   });

//   test.describe('Page Elements', () => {
//     test('should display login form with email and password fields', async ({ page }) => {
//       // Verify login form heading
//       await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

//       // Verify email field exists
//       const emailField = page.getByPlaceholder('Email Address').first();
//       await expect(emailField).toBeVisible();
//       await expect(emailField).toHaveAttribute('type', 'email');
//       await expect(emailField).toHaveAttribute('required');

//       // Verify password field exists
//       const passwordField = page.getByPlaceholder('Password');
//       await expect(passwordField).toBeVisible();
//       await expect(passwordField).toHaveAttribute('type', 'password');
//       await expect(passwordField).toHaveAttribute('required');
//     });

//     test('should display Login button', async ({ page }) => {
//       const loginButton = page.getByRole('button', { name: 'Login' }).first();
//       await expect(loginButton).toBeVisible();
//       await expect(loginButton).toBeEnabled();
//     });

//     test('should have signup panel on the right', async ({ page }) => {
//       // Verify signup heading
//       await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();

//       // Verify signup form fields
//       const nameField = page.getByPlaceholder('Name');
//       await expect(nameField).toBeVisible();

//       const signupEmailField = page.getByPlaceholder('Email Address').last();
//       await expect(signupEmailField).toBeVisible();

//       const signupButton = page.getByRole('button', { name: 'Signup' });
//       await expect(signupButton).toBeVisible();
//     });
//   });

//   test.describe('Form Validation - Empty Fields', () => {
//     test('should not submit when both email and password are empty', async ({ page }) => {
//       const emailField = page.getByPlaceholder('Email Address').first();
//       const passwordField = page.getByPlaceholder('Password');
//       const loginButton = page.getByRole('button', { name: 'Login' }).first();

//       // Verify fields are empty
//       await expect(emailField).toHaveValue('');
//       await expect(passwordField).toHaveValue('');

//       // Attempt to click login
//       await loginButton.click();

//       // Page should still be on login page
//       await expect(page).toHaveURL(/\/login/);

//       // Email field should still be empty (form didn't submit)
//       await expect(emailField).toHaveValue('');
//     });

//     test('should show validation error for empty email with password', async ({ page }) => {
//       const emailField = page.getByPlaceholder('Email Address').first();
//       const passwordField = page.getByPlaceholder('Password');
//       const loginButton = page.getByRole('button', { name: 'Login' }).first();

//       // Leave email empty and enter password
//       await emailField.clear();
//       await passwordField.fill('testpassword');

//       // Click login
//       await loginButton.click();

//       // HTML5 validation should prevent submission (email field required and invalid)
//       // Email field should be focused/invalid due to browser validation
//       await expect(emailField).toBeFocused();

//       // Should remain on login page
//       await expect(page).toHaveURL(/\/login/);
//     });

//     test('should show validation error for valid email with empty password', async ({ page }) => {
//       const emailField = page.getByPlaceholder('Email Address').first();
//       const passwordField = page.getByPlaceholder('Password');
//       const loginButton = page.getByRole('button', { name: 'Login' }).first();

//       // Enter email but leave password empty
//       await emailField.fill('testemail@example.com');
//       await passwordField.clear();

//       // Click login
//       await loginButton.click();

//       // HTML5 validation should prevent submission (password field required)
//       // Password field should be focused due to browser validation
//       await expect(passwordField).toBeFocused();

//       // Should remain on login page
//       await expect(page).toHaveURL(/\/login/);
//     });
//   });

//   test.describe('Invalid Credentials', () => {
//     test('should show error message for invalid email and password', async ({ page }) => {
//       const emailField = page.getByPlaceholder('Email Address').first();
//       const passwordField = page.getByPlaceholder('Password');
//       const loginButton = page.getByRole('button', { name: 'Login' }).first();

//       // Enter invalid credentials
//       await emailField.fill('wronguser@example.com');
//       await passwordField.fill('wrongpassword123');

//       // Click login
//       await loginButton.click();

//       // Should show error message
//       const errorMessage = page.locator('text=Your email or password is incorrect!');
//       await expect(errorMessage).toBeVisible();

//       // Error message should be red (text color)
//       await expect(errorMessage).toHaveCSS('color', /rgb\(255,\s*0,\s*0\)|rgb\(204,\s*0,\s*0\)/);

//       // Should remain on login page
//       await expect(page).toHaveURL(/\/login/);
//     });

//     test('should retain email field value after failed login', async ({ page }) => {
//       const emailField = page.getByPlaceholder('Email Address').first();
//       const passwordField = page.getByPlaceholder('Password');
//       const loginButton = page.getByRole('button', { name: 'Login' }).first();

//       const testEmail = 'testuser@example.com';

//       // Enter invalid credentials
//       await emailField.fill(testEmail);
//       await passwordField.fill('invalidpass');

//       // Click login
//       await loginButton.click();

//       // Wait for error message to appear
//       await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();

//       // Email field should retain the value
//       await expect(emailField).toHaveValue(testEmail);
//     });

//     test('should allow retry after invalid login attempt', async ({ page }) => {
//       const emailField = page.getByPlaceholder('Email Address').first();
//       const passwordField = page.getByPlaceholder('Password');
//       const loginButton = page.getByRole('button', { name: 'Login' }).first();

//       // First attempt with wrong credentials
//       await emailField.fill('wrong1@example.com');
//       await passwordField.fill('wrongpass1');
//       await loginButton.click();

//       // Verify error appears
//       await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();

//       // Second attempt with different wrong credentials
//       await emailField.clear();
//       await passwordField.clear();
//       await emailField.fill('wrong2@example.com');
//       await passwordField.fill('wrongpass2');
//       await loginButton.click();

//       // Error should still be visible (user can retry)
//       await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();

//       // Page should still be on login
//       await expect(page).toHaveURL(/\/login/);
//     });
//   });

//   test.describe('Access Control', () => {
//     test('should redirect unauthenticated user accessing dashboard to homepage', async ({ page }) => {
//       // Attempt to navigate to dashboard without authentication
//       await page.goto('/dashboard');

//       // Should be redirected away from dashboard
//       // The URL should either be homepage or login page
//       const currentUrl = page.url();
//       const isRedirected =
//         currentUrl.includes('/') ||
//         (currentUrl.includes('/login') && !currentUrl.includes('/dashboard'));

//       expect(isRedirected).toBeTruthy();

//       // Verify we're not still on dashboard
//       expect(currentUrl).not.toMatch(/\/dashboard/);
//     });

//     test('should not be logged in initially', async ({ page }) => {
//       // Verify no "Logged in as" message is visible
//       const loggedInMessage = page.locator('text=/Logged in as/');
//       await expect(loggedInMessage).not.toBeVisible();

//       // Verify signup/login link is available (indicating not logged in)
//       const signupLoginLink = page.getByRole('link', { name: /Signup.*Login/ });
//       await expect(signupLoginLink).toBeVisible();
//     });
//   });

//   test.describe('Form Security', () => {
//     test('should use password input type for password field', async ({ page }) => {
//       const passwordField = page.getByPlaceholder('Password');

//       // Verify password field is type="password"
//       await expect(passwordField).toHaveAttribute('type', 'password');

//       // Password should be masked (not visible as plain text)
//       const inputType = await passwordField.getAttribute('type');
//       expect(inputType).toBe('password');
//     });

//     test('should use email input type for email field', async ({ page }) => {
//       const emailField = page.getByPlaceholder('Email Address').first();

//       // Verify email field is type="email"
//       await expect(emailField).toHaveAttribute('type', 'email');

//       const inputType = await emailField.getAttribute('type');
//       expect(inputType).toBe('email');
//     });

//     test('should require both email and password fields', async ({ page }) => {
//       const emailField = page.getByPlaceholder('Email Address').first();
//       const passwordField = page.getByPlaceholder('Password');

//       // Verify required attribute is set
//       await expect(emailField).toHaveAttribute('required');
//       await expect(passwordField).toHaveAttribute('required');
//     });

//     test('should have CSRF token in login form', async ({ page }) => {
//       // Check for CSRF token in form (it's a hidden input)
//       const csrfToken = page.locator('input[name="csrfmiddlewaretoken"]').first();

//       // CSRF token should exist in the DOM
//       const count = await csrfToken.count();
//       expect(count).toBeGreaterThan(0);

//       // Token should have a value
//       const tokenValue = await csrfToken.getAttribute('value');
//       expect(tokenValue).toBeTruthy();
//       expect(tokenValue?.length).toBeGreaterThan(0);
//     });
//   });

//   test.describe('Error Message Styling', () => {
//     test('should display error message in red color', async ({ page }) => {
//       const emailField = page.getByPlaceholder('Email Address').first();
//       const passwordField = page.getByPlaceholder('Password');
//       const loginButton = page.getByRole('button', { name: 'Login' }).first();

//       // Enter invalid credentials
//       await emailField.fill('invalid@example.com');
//       await passwordField.fill('invalid');
//       await loginButton.click();

//       // Get the error message
//       const errorMessage = page.locator('text=Your email or password is incorrect!');
//       await expect(errorMessage).toBeVisible();

//       // Verify it has red color styling
//       const color = await errorMessage.evaluate((el) => window.getComputedStyle(el).color);

//       // Check if color contains red (various formats possible)
//       const isRed =
//         color.includes('255, 0, 0') || // rgb(255, 0, 0)
//         color.includes('rgb(255, 0, 0)') || // rgb format
//         color.includes('red') || // color name
//         color.includes('204, 0, 0') || // alternative red
//         color.includes('rgb(204, 0, 0)');

//       expect(isRed).toBeTruthy();
//     });

//     test('should position error message near password field', async ({ page }) => {
//       const emailField = page.getByPlaceholder('Email Address').first();
//       const passwordField = page.getByPlaceholder('Password');
//       const loginButton = page.getByRole('button', { name: 'Login' }).first();

//       // Enter invalid credentials
//       await emailField.fill('invalid@example.com');
//       await passwordField.fill('invalid');
//       await loginButton.click();

//       // Get the error message
//       const errorMessage = page.locator('text=Your email or password is incorrect!');
//       await expect(errorMessage).toBeVisible();

//       // Get bounding boxes
//       const errorBox = await errorMessage.boundingBox();
//       const passwordBox = await passwordField.boundingBox();

//       // Error should appear below password field (y position should be greater)
//       if (errorBox && passwordBox) {
//         expect(errorBox.y).toBeGreaterThan(passwordBox.y);
//       }
//     });
//   });

//   test.describe('Form Layout and Navigation', () => {
//     test('should display form with proper layout structure', async ({ page }) => {
//       // Check for main layout dividers
//       const orHeading = page.getByRole('heading', { name: 'OR' });
//       await expect(orHeading).toBeVisible();

//       // Login section on left, signup on right (indicated by separate elements)
//       const loginHeading = page.getByRole('heading', { name: 'Login to your account' });
//       const signupHeading = page.getByRole('heading', { name: 'New User Signup!' });

//       await expect(loginHeading).toBeVisible();
//       await expect(signupHeading).toBeVisible();
//     });

//     test('should have navigation menu with all expected links', async ({ page }) => {
//       // Verify key navigation links
//       const homeLink = page.getByRole('link', { name: /Home/i });
//       const productsLink = page.getByRole('link', { name: /Products/i });
//       const cartLink = page.getByRole('link', { name: /Cart/i });
//       const testCasesLink = page.getByRole('link', { name: /Test Cases/i });

//       await expect(homeLink).toBeVisible();
//       await expect(productsLink).toBeVisible();
//       await expect(cartLink).toBeVisible();
//       await expect(testCasesLink).toBeVisible();
//     });
//   });

//   test.describe('Page Title and Meta', () => {
//     test('should have correct page title', async ({ page }) => {
//       await expect(page).toHaveTitle(/Automation Exercise.*Signup.*Login/i);
//     });

//     test('should be on correct URL', async ({ page }) => {
//       await expect(page).toHaveURL(/\/login/);
//     });
//   });
// });
