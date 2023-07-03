// @ts-check
const { test, expect } = require('@playwright/test');

test('incorrect user & pwd', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/');

  const userEmail =  page.locator("#userEmail");
  const userpwd =  page.locator("#userPassword");
  const loginbutton = page.locator("#login")
  const prodTitle = page.locator(".card b");
  
  //print title output
  console.log(await page.title());

   // Expect a title "to contain" a substring.
   await expect(page).toHaveTitle("Let's Shop");

   // Expect a title "to contain" and banner a substring.
   await expect(page).toHaveTitle("Let's Shop");
   console.log(await page.locator(".banner").textContent());
   await expect(page.locator(".banner")).toContainText("We Make Your Shopping SimplePractice Website for Rahul Shetty Academy StudentsRegisterRegister to sign in with your personal accountLog inEmailPasswordLoginForgot password?Don't have an account? Register here");  
   
   // enter useremail & pwd
   await userEmail.type("nanikiri@gmail.com");
   await userpwd.type("Welcome@456");
   await loginbutton.click();
   console.log(await page.locator("#toast-container").textContent());
   await expect(page.locator("#toast-container")).toContainText("Incorrect email or password.");

  //clear/fill username and password 
  await userEmail.fill("");
  await userpwd.fill("");
  await userEmail.type("nanikiri@gmail.com");
  await userpwd.type("Welcome@123");
  await loginbutton.click();
  // wait till page load network load state
  await page.waitForLoadState("networkidle");
  
  //console.log(await prodTitle.first().textContent());
  //console.log(await prodTitle.nth(1).textContent());
  const allprdTitles = await prodTitle.allTextContents();
  
  console.log(allprdTitles);


});
/*
test('launch browser', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/');

  const userEmail =  page.locator("#userEmail");
  const userpwd =  page.locator("#userPassword");
  const loginbutton = page.locator("#login")
  
  //print title output
  console.log(await page.title());

   // Expect a title "to contain" a substring.
   await expect(page).toHaveTitle("Let's Shop");

   // Expect a title "to contain" and banner a substring.
   await expect(page).toHaveTitle("Let's Shop");
   console.log(await page.locator(".banner").textContent());
   await expect(page.locator(".banner")).toContainText("We Make Your Shopping SimplePractice Website for Rahul Shetty Academy StudentsRegisterRegister to sign in with your personal accountLog inEmailPasswordLoginForgot password?Don't have an account? Register here");  
   
   // enter useremail & pwd
   await userEmail.type("nanikiri@gmail.com");
   await userpwd.type("Welcome@123");
   await loginbutton.click();
  });

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
*/