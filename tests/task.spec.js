import { test, expect } from '@playwright/test';

const url = 'https://www.demoblaze.com/index.html';

test.describe('Demoblaze E-Commerce User Flow', () => {

  const randomUsername = `testuser_${Date.now()}`;
  const randomPassword = 'TestPassword123!';

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.waitForTimeout(1000);
  })

  test('Signup & Login', async ({ page }) => {

    // Click Sign Up in the navbar
    await page.locator('#signin2').click();

    // Wait for the modal to be visible
    const modal = page.locator('#signInModal');
    await expect(modal).toBeVisible();

    // Fill in credentials
    await page.fill('#sign-username', randomUsername);
    await page.fill('#sign-password', randomPassword);
    await page.waitForTimeout(3000);

    // Handle the browser alert that appears upon successful registration
    // page.once('dialog', async dialog => {
    //   expect(dialog.message()).toContain('Sign up successful.');
    //   await dialog.accept();
    // });

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
    await expect(page.locator('#logout2')).toBeVisible();
  });

});