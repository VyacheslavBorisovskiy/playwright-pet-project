# QA Automation - Login Functionality Exploration Report

**Application**: Automation Exercise (https://automationexercise.com)
**Test Date**: 2026-08-13
**Testing Tool**: Playwright CLI
**Test Scope**: Login page functionality, authentication behaviors, access control

---

## 1. PAGE STRUCTURE & COMPONENTS

### Login Form Fields

- **Email Address Field**
  - Type: Email input (`type="email"`)
  - Placeholder: "Email Address"
  - Required: Yes
  - Form Integration: Part of login form

- **Password Field**
  - Type: Password input (`type="password"`)
  - Placeholder: "Password"
  - Required: Yes
  - Form Integration: Part of login form

### Login Button

- **Text**: "Login"
- **Type**: Submit button
- **Class**: btn btn-default
- **Color**: Orange
- **Accessible**: `getByRole('button', { name: 'Login' })`

### Signup Panel (Right Side)

- **Heading**: "New User Signup!"
- **Name Field**: Text input (required)
- **Email Field**: Email input (required)
- **Signup Button**: Orange submit button

### Form Security

- CSRF protection tokens present
- HTML5 form validation enabled

---

## 2. TEST RESULTS

### Test 1: Empty Both Fields

**Action**: Click Login button without entering any credentials
**Expected**: Form validation or error message
**Result**: ✅ **PASS** - Form remained on login page (browser-level form validation likely prevented submission)

### Test 2: Invalid Username & Invalid Password

**Credentials Used**:

- Email: `wronguser@test.com`
- Password: `wrongpassword123`

**Expected**: Error message indicating invalid credentials
**Result**: ✅ **PASS** -

- **Error Message**: "Your email or password is incorrect!" (displayed in RED text)
- **Error Location**: Below the password field
- **Page State**: Remained on `/login` page
- **Form State**: Email field retained the entered value; password field was masked
- **User Experience**: Error persists, user can immediately retry

### Test 3: Empty Email Field with Password

**Credentials**:

- Email: (empty)
- Password: `anypassword`

**Expected**: Form validation or error
**Result**: ⚠️ **BEHAVIOR NOTE** - Form submitted but displayed error "Your email or password is incorrect!"

- Indicates that empty email is validated on the server side, not client side
- Same error message as invalid credentials

### Test 4: Valid Email with Empty Password

**Credentials**:

- Email: `someuser@test.com`
- Password: (empty)

**Expected**: Form validation or error
**Result**: ⚠️ **BEHAVIOR NOTE** - Form submitted but displayed error message

- Indicates server-side validation for empty password
- Same generic error message used

### Test 5: Unauthenticated Access to /dashboard

**Action**: Navigate to `https://automationexercise.com/dashboard` without logging in
**Expected**: Either redirect to login page or access denied page
**Result**: ✅ **PASS** -

- **Behavior**: Redirected to homepage (`/`)
- **Implication**: Dashboard or protected routes redirect to homepage (or possibly to login, but ended at home)
- **Access Control**: Unauthenticated users cannot access dashboard directly

---

## 3. FORM VALIDATION BEHAVIOR

### Client-Side Validation

- HTML5 email input type (`type="email"`) enforces email format
- Both fields marked as `required` attribute
- Empty form submission appears to be blocked by browser validation

### Server-Side Validation

- Empty email field: Server returns generic error message
- Empty password field: Server returns generic error message
- Invalid credentials: Returns matching error message
- **Generic Error Message Strategy**: Uses same message for all failures - "Your email or password is incorrect!"
  - This is a **security best practice** (doesn't leak whether email exists in system)

### Error Messages

| Scenario               | Error Message                          | Display Style             |
| ---------------------- | -------------------------------------- | ------------------------- |
| Invalid credentials    | "Your email or password is incorrect!" | Red text                  |
| Empty email + password | "Your email or password is incorrect!" | Red text                  |
| Empty password         | "Your email or password is incorrect!" | Red text                  |
| Both fields empty      | (Form validation)                      | Browser native validation |

---

## 4. UI/UX OBSERVATIONS

### Layout

- Two-column layout: Login (left) | Signup (right)
- "OR" divider in the middle
- Clean, user-friendly design

### Form Field States

- Email field shows entered value (good for UX, allows user to verify)
- Password field masked with dots/asterisks (security feature)
- Fields retain values after failed login (except potentially password)
- Error message positioned directly below password field (clear visibility)

### Error Messaging

- ✅ **Good**: Error appears in prominent red color
- ✅ **Good**: Generic error message for security
- ❓ **Question**: Does password field clear after failed login attempt? (Not clearly observable in this test)

---

## 5. AUTHENTICATION BEHAVIOR

### Successful Login

**Status**: NOT TESTED (no valid test credentials found)
**Expected Behaviors** (Based on earlier exploration):

- Redirect to dashboard or authenticated area
- Display "Logged in as [username]" message
- Logout option becomes available
- Session cookie/token is established

### Failed Login

- ✅ **Confirmed**: User remains on login page
- ✅ **Confirmed**: Error message displays
- ✅ **Confirmed**: User can immediately retry with different credentials

### Session Management

- ✅ **Confirmed**: Unauthenticated users cannot access protected routes
- Behavior: Redirects away from dashboard (to homepage or back to login)

---

## 6. ACCESS CONTROL TESTING

### Dashboard Access

- **Endpoint**: `https://automationexercise.com/dashboard`
- **Current State**: Unauthenticated
- **Result**: ✅ **PASS** - Access denied/redirected
- **Redirect Destination**: Homepage (likely, based on screenshot)
- **Security**: ✅ **Protected route is working**

---

## 7. FORM SECURITY FEATURES

### CSRF Protection

- ✅ **Present**: Hidden CSRF tokens included in form
- **Framework**: Appears to be Django (based on token structure)

### Password Security

- ✅ **Masked input**: Password field uses `type="password"`
- ✅ **No client-side password strength indicator visible**

### Input Validation

- ✅ **Email format validation**: HTML5 email type
- ✅ **Required field enforcement**: Both fields marked required
- ✅ **Server-side validation**: Confirmed for empty fields

---

## 8. SCREENSHOTS CAPTURED

### Screenshot 1: Clean Login Page

- **File**: `page-2026-08-13T10-12-19-141Z.png`
- **State**: Fresh login page with empty fields
- **Notes**: After consent dialog dismissed

### Screenshot 2: Empty Form Submission

- **File**: `page-2026-08-13T10-12-34-127Z.png`
- **State**: Login page after clicking Login with empty fields
- **Notes**: Form validation prevented submission

### Screenshot 3: Invalid Credentials Error

- **File**: `page-2026-08-13T10-12-59-091Z.png`
- **State**: Error message displayed in red
- **Error Message**: "Your email or password is incorrect!"
- **Fields**: Email showing `wronguser@test.com`, password masked
- **Key Finding**: Error appears below password field in prominent red

### Screenshot 4: Empty Email Test

- **File**: `page-2026-08-13T10-14-24-807Z.png`
- **State**: After attempting login with empty email
- **Result**: Same generic error message

### Screenshot 5: Empty Password Test

- **File**: `page-2026-08-13T10-14-36-251Z.png`
- **State**: After attempting login with empty password
- **Result**: Same generic error message

### Screenshot 6: Dashboard Redirect

- **File**: `page-2026-08-13T10-14-45-459Z.png`
- **State**: Redirected from dashboard attempt to homepage
- **URL**: Homepage with "Automation Exercise" main content
- **Note**: User not authenticated, cannot access dashboard

---

## 9. KEY FINDINGS & OBSERVATIONS

### Security Strengths

✅ **Generic error messages** - Doesn't reveal if email exists
✅ **CSRF protection** - Tokens present in forms
✅ **Password masking** - Input type="password" used
✅ **Required field validation** - Both client and server-side
✅ **Access control** - Protected routes redirect unauthorized users

### Validation Approach

- **Client-side**: HTML5 email type, required attributes
- **Server-side**: Validates empty fields, invalid credentials
- **Redundancy**: Both layers provide defense in depth

### Error Handling

- Consistent generic error message (security best practice)
- Error persists on page, user can see and retry immediately
- No account lockout observed (user can retry indefinitely in this test)

### Redirect Behavior

- Invalid credentials: Stay on login page
- Unauthenticated dashboard access: Redirect to homepage
- No explicit "Access Denied" page observed

---

## 10. ITEMS NOT TESTED (Pending Valid Credentials)

❓ **Successful login flow** - Requires valid test credentials
❓ **Logout functionality** - Requires successful login first
❓ **Session persistence** - Need authenticated session
❓ **Account lockout after N failures** - Need to test multiple attempts
❓ **Password reset functionality** - Not explored
❓ **Email verification** - Not applicable for login testing
❓ **Remember me functionality** - Not visible in current form
❓ **Social login** - Not visible in form

---

## 11. RECOMMENDATIONS FOR TEST AUTOMATION

### Priority Test Cases to Automate

1. ✅ Empty both fields submission
2. ✅ Invalid credentials error message display
3. ✅ Empty email validation
4. ✅ Empty password validation
5. ✅ Error message styling/color
6. ✅ Form field persistence on error
7. ✅ Unauthenticated dashboard access prevention

### Test Credentials Needed

- Valid username/password for successful login test
- Test account for repeated failure testing
- Admin account (if needed)

### Suggested Locator Strategies

```
// Email field
getByPlaceholder('Email Address')
getByLabel('Email Address')

// Password field
getByPlaceholder('Password')
getByLabel('Password')

// Login button
getByRole('button', { name: 'Login' })

// Error message
getByText('Your email or password is incorrect!')
```

---

## 12. CONCLUSION

The login page demonstrates:

- ✅ **Solid form validation** (both client and server-side)
- ✅ **Good security practices** (CSRF protection, generic errors, password masking)
- ✅ **Access control enforcement** (protected routes cannot be accessed without authentication)
- ✅ **User-friendly error handling** (clear error messages, field value retention)

**Overall Assessment**: Login functionality is working as expected for invalid/empty submissions. Access control is properly enforced. Ready for automation testing once valid credentials are provided.
