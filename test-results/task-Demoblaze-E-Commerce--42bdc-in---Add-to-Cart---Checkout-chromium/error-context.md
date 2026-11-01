# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task.spec.js >> Demoblaze E-Commerce User Flow >> Signup -> Login -> Add to Cart -> Checkout
- Location: tests/task.spec.js:15:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: locator('td:has-text("Samsung galaxy s6")')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('td:has-text("Samsung galaxy s6")') with timeout 20000ms
  - waiting for locator('td:has-text("Samsung galaxy s6")')
  - Test timeout of 30000ms exceeded.

```

```yaml
- navigation:
  - link "PRODUCT STORE":
    - /url: index.html
    - img
    - text: PRODUCT STORE
  - list:
    - listitem:
      - link "Home (current)":
        - /url: index.html
    - listitem:
      - link "Contact":
        - /url: "#"
    - listitem:
      - link "About us":
        - /url: "#"
    - listitem:
      - link "Cart":
        - /url: "#"
    - listitem
    - listitem:
      - link "Log out":
        - /url: "#"
    - listitem:
      - link "Welcome testuser_1793539009830":
        - /url: "#"
    - listitem
- heading "Products" [level=2]
- table:
  - rowgroup:
    - row "Pic Title Price x":
      - columnheader "Pic"
      - columnheader "Title"
      - columnheader "Price"
      - columnheader "x"
  - rowgroup
- heading "Total" [level=2]
- heading [level=3]
- button "Place Order"
- heading "About Us" [level=4]
- paragraph: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
- heading "Get in Touch" [level=4]
- paragraph: "Address: 2390 El Camino Real"
- paragraph: "Phone: +440 123456"
- paragraph: "Email: demo@blazemeter.com"
- heading "PRODUCT STORE" [level=4]:
  - img
  - text: PRODUCT STORE
- contentinfo:
  - paragraph: Copyright © Product Store
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const url = 'https://www.demoblaze.com/index.html';
  4  | 
  5  | test.describe('Demoblaze E-Commerce User Flow', () => {
  6  | 
  7  |   const randomUsername = `testuser_${Date.now()}`;
  8  |   const randomPassword = 'TestPassword123!';
  9  | 
  10 |   test.beforeEach(async ({ page }) => {
  11 |     await page.goto(url);
  12 |     await page.waitForTimeout(1000);
  13 |   })
  14 | 
  15 |   test('Signup -> Login -> Add to Cart -> Checkout', async ({ page }) => {
  16 | 
  17 |     // Click Sign Up in the navbar
  18 |     await page.locator('#signin2').click();
  19 | 
  20 |     // Wait for the modal to be visible
  21 |     const modal = page.locator('#signInModal');
  22 |     await expect(modal).toBeVisible();
  23 | 
  24 |     // Fill in credentials
  25 |     await page.fill('#sign-username', randomUsername);
  26 |     await page.fill('#sign-password', randomPassword);
  27 |     await page.waitForTimeout(1000);
  28 | 
  29 |     // Click Sign up button
  30 |     await page.click('#signInModal .btn-primary');
  31 |     await page.waitForTimeout(3000);
  32 | 
  33 | 
  34 |     // Log in using the newly created account
  35 |     await page.locator('#login2').click();
  36 |     await expect(page.locator('#logInModal')).toBeVisible();
  37 | 
  38 |     await page.fill('#loginusername', randomUsername);
  39 |     await page.fill('#loginpassword', randomPassword);
  40 |     await page.click('#logInModal .btn-primary');
  41 | 
  42 |     // Verifying login through the navbar
  43 |     await page.waitForTimeout(3000);
  44 |     await expect(page.locator('#logInModal')).not.toBeVisible({ timeout: 20000 });
  45 |     await expect(page.locator('#logout2')).toBeVisible();
  46 | 
  47 | 
  48 |     // Click on the 'Laptops' category in the sidebar
  49 |     await page.click("text=Laptops");
  50 | 
  51 |     // Wait for products to load and click the first laptop
  52 |     const firstLaptop = page.locator('.card-title a').first();
  53 |     await expect(firstLaptop).toBeVisible({ timeout: 20000 });
  54 |     const laptopName = await firstLaptop.textContent();
  55 |     await firstLaptop.click();
  56 | 
  57 |     // On the product page, click "Add to cart"
  58 |     await expect(page.locator('.name')).toBeVisible({ timeout: 20000 });
  59 |     await page.click('text=Add to cart');
  60 | 
  61 |     // Navigate to the Cart page via navbar
  62 |     await page.click('#cartur');
  63 |     await expect(page.locator('#page-wrapper')).toBeVisible({ timeout: 20000 });
  64 | 
  65 |     // Verify the item is listed in the cart table
  66 |     const cartItem = page.locator(`td:has-text("${laptopName?.trim()}")`);
> 67 |     await expect(cartItem).toBeVisible({ timeout: 20000 });
     |                            ^ Error: expect(locator).toBeVisible() failed
  68 | 
  69 | 
  70 |     // Click Place Order button
  71 |     await page.click('button:has-text("Place Order")');
  72 |     await expect(page.locator('#orderModal')).toBeVisible({ timeout: 20000 });
  73 | 
  74 |     // Fill out the purchase form
  75 |     await page.fill('#name', 'Mr. Tester');
  76 |     await page.fill('#country', 'Nowhere');
  77 |     await page.fill('#city', 'Testing City');
  78 |     await page.fill('#card', '1234567890123456');
  79 |     await page.fill('#month', '12');
  80 |     await page.fill('#year', '2028');
  81 | 
  82 |     // Submit the order
  83 |     await page.click('#orderModal .btn-primary');
  84 | 
  85 |     // Verify success confirmation popup appears
  86 |     const successAlert = page.locator('.sweet-alert');
  87 |     await expect(successAlert).toBeVisible({ timeout: 20000 });
  88 |     await expect(successAlert.locator('h2')).toHaveText('Thank you for your purchase!');
  89 |     await page.waitForTimeout(2000);
  90 | 
  91 |     // Close confirmation dialog
  92 |     await page.click('.confirm');
  93 |   });
  94 | 
  95 | });
```