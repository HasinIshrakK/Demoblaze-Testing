import { test, expect } from '@playwright/test';

const url = 'https://www.demoblaze.com/index.html';

test.describe('Demoblaze E-Commerce User Flow', () => {
  
  const randomUsername = `testuser_${Date.now()}`;
  const randomPassword = 'TestPassword123!';

  test.beforeEach(async ({page})=>{
    await page.goto(url);
    await page.waitForTimeout(1000);
  })

  test('1. Sign up for a new account', async ({ page }) => {

    // Click Sign Up in the navbar
    await page.locator('#signin2').click();

    // Wait for the modal to be visible
    const modal = page.locator('#signInModal');
    await expect(modal).toBeVisible();

    // Fill in credentials
    await page.fill('#sign-username', randomUsername);
    await page.fill('#sign-password', randomPassword);

    // Handle the browser alert that appears upon successful registration
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Sign up successful.');
      await dialog.accept();
    });

    // Click Sign up button
    await page.click('#signInModal .btn-primary');
  });

});