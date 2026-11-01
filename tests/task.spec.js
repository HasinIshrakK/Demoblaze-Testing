import { test, expect } from '@playwright/test';

const url = 'https://www.demoblaze.com/index.html';

test.describe('Demoblaze E-Commerce User Flow', () => {

  const randomUsername = `testuser_${Date.now()}`;
  const randomPassword = 'TestPassword123!';

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.waitForTimeout(1000);
  })

  test('Signup -> Login -> Add to Cart -> Checkout', async ({ page }) => {

    // Click Sign Up in the navbar
    await page.locator('#signin2').click();

    // Wait for the modal to be visible
    const modal = page.locator('#signInModal');
    await expect(modal).toBeVisible();

    // Fill in credentials
    await page.fill('#sign-username', randomUsername);
    await page.fill('#sign-password', randomPassword);
    await page.waitForTimeout(1000);

    // Click Sign up button
    await page.click('#signInModal .btn-primary');
    await page.waitForTimeout(3000);


    // Log in using the newly created account
    await page.locator('#login2').click();
    await expect(page.locator('#logInModal')).toBeVisible();

    await page.fill('#loginusername', randomUsername);
    await page.fill('#loginpassword', randomPassword);
    await page.click('#logInModal .btn-primary');

    // Verifying login through the navbar
    await page.waitForTimeout(3000);
    await expect(page.locator('#logInModal')).not.toBeVisible({ timeout: 20000 });
    await expect(page.locator('#logout2')).toBeVisible();


    // Click on the 'Laptops' category in the sidebar
    await page.click("text=Laptops");

    // Wait for products to load and click the first laptop
    const firstLaptop = page.locator('.card-title a').first();
    await expect(firstLaptop).toBeVisible({ timeout: 20000 });
    const laptopName = await firstLaptop.textContent();
    await firstLaptop.click();

    // On the product page, click "Add to cart"
    await expect(page.locator('.name')).toBeVisible({ timeout: 20000 });
    await page.click('text=Add to cart');

    // Navigate to the Cart page via navbar
    await page.click('#cartur');
    await expect(page.locator('#page-wrapper')).toBeVisible({ timeout: 20000 });

    // Verify the item is listed in the cart table
    const cartItem = page.locator(`td:has-text("${laptopName?.trim()}")`);
    await expect(cartItem).toBeVisible({ timeout: 20000 });


    // Click Place Order button
    await page.click('button:has-text("Place Order")');
    await expect(page.locator('#orderModal')).toBeVisible({ timeout: 20000 });

    // Fill out the purchase form
    await page.fill('#name', 'Mr. Tester');
    await page.fill('#country', 'Nowhere');
    await page.fill('#city', 'Testing City');
    await page.fill('#card', '1234567890123456');
    await page.fill('#month', '12');
    await page.fill('#year', '2028');

    // Submit the order
    await page.click('#orderModal .btn-primary');

    // Verify success confirmation popup appears
    const successAlert = page.locator('.sweet-alert');
    await expect(successAlert).toBeVisible({ timeout: 20000 });
    await expect(successAlert.locator('h2')).toHaveText('Thank you for your purchase!');
    await page.waitForTimeout(2000);

    // Close confirmation dialog
    await page.click('.confirm');
  });

});