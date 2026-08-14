# QA Automation Instructions

## Technology

- Use Playwright Test with TypeScript.
- Use playwright-cli for browser exploration when appropriate.
- Do not modify application code when investigating test failures unless explicitly requested.

## Locators

Prefer:

1. getByRole()
2. getByLabel()
3. getByPlaceholder()
4. getByText()
5. getByTestId()

Avoid XPath and brittle CSS selectors unless there is no better option.

## Assertions

Every test must verify the expected application behavior.

Prefer web-first assertions:

- expect(locator).toBeVisible()
- expect(locator).toHaveText()
- expect(page).toHaveURL()

Avoid arbitrary waits such as:

await page.waitForTimeout(5000)

## Test structure

- One business scenario per test.
- Use descriptive test names.
- Keep tests independent.
- Reuse existing fixtures.
- Follow the existing project structure.

## Failure investigation

When a test fails:

1. Reproduce the failure.
2. Inspect the browser state.
3. Determine whether the problem is the test or application.
4. Do not silently change assertions to make a failing test pass.
5. Report suspected application defects separately.