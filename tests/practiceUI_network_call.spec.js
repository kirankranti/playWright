// @ts-nocheck
const { test, expect, request } = require('@playwright/test');

test.only('incorrect user & pwd', async ({ page }) => {

  //await page.route("**/*.{jpeg,png,jpg}", route=> route.abort());
  page.on('request', request=> console.log(request.url()));
  page.on('response', response=> console.log(response.url(), response.status()));
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const userEmail =  page.locator("#username");
  const userpwd =  page.locator("#password");
  const loginbutton = page.locator("#signInBtn")
  const prodTitle = page.locator(".card-body a");
  
  //print title output
  console.log(await page.title());


   // Expect a title "to contain" and banner a substring.
   await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
   console.log(await page.locator(".text-center.text-white").textContent());
   await expect(page.locator(".text-center.text-white")).toContainText("username is rahulshettyacademy and Password is learning");  
   
   // enter useremail & pwd
   await userEmail.type("rahulshettyacademy");
   await userpwd.type("learning1");
   await loginbutton.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");

  //clear/fill username and password 
  await userEmail.fill("");
  await userpwd.fill("");
  await userEmail.type("rahulshettyacademy");
  await userpwd.type("learning");
  await loginbutton.click();
  // wait till page load network load state
  await page.waitForLoadState("networkidle");

   page.on("dialog", dialog => dialog.accept());

   console.log(await prodTitle.first().textContent());
   console.log(await prodTitle.nth(1).textContent());
   const allprdTitles = await prodTitle.allTextContents();
   console.log(allprdTitles);


});

test('handling Dropdown', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const userEmail =  page.locator("#username");
  const userpwd   =  page.locator("#password");
  const dropDown  =  page.locator("select.form-control");
  const docuLink  =  page.locator("[href*='documents-request']");
  const loginbutton = page.locator("#signInBtn")
  
  
  //print title output
  console.log(await page.title());

   // Expect a title "to contain" and banner a substring.
   await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
   console.log(await page.locator(".text-center.text-white").textContent());
   await expect(page.locator(".text-center.text-white")).toContainText("username is rahulshettyacademy and Password is learning");  
   
   // enter useremail & pwd
   await userEmail.type("rahulshettyacademy");
   await userpwd.type("learning1");
   await loginbutton.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");

  //clear/fill username and password 
  await userEmail.fill("");
  await userpwd.fill("");
  await userEmail.type("rahulshettyacademy");
  await userpwd.type("learning");

  //select dropdown
  await dropDown.selectOption("teach");
  console.log(await dropDown.innerText());
  //page pause
   // await page.pause();
  //select radio button

  await page.locator(".checkmark").last().click();
  await page.locator("#okayBtn").click();
  await page.locator("#terms").click();
  await expect(page.locator(".checkmark").last()).toBeChecked();
  console.log(await page.locator(".checkmark").last().isChecked());
  await page.locator("#terms").isChecked();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await page.locator("#terms").click();
  await expect(page.locator("#terms").last()).toBeChecked();
  expect(await page.locator("#terms").isChecked()).toBeTruthy();

  await expect(docuLink).toHaveAttribute("class", "blinkingText");
  //await loginbutton.click();

  // wait till page load network load state
  await page.waitForLoadState("networkidle");

});


test('handling Childwindow page', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const docuLink  =  page.locator("[href*='documents-request']");



  const [pagenew] = await  Promise.all([

    context.waitForEvent('page'),
     docuLink.click()

  ])

   const Pagetext = await pagenew.locator(".page-title").textContent();
   console.log(Pagetext);
   await expect(Pagetext).toContain("Documents request");
  
   const textRed = await pagenew.locator(".red").textContent();
   //console.log(textRed);
   const arrayText =  textRed.split("@");
   //console.log(arrayText);
   const domain = arrayText[1].split(" ")[0];
   //console.log(domain);
   const userDomain = domain.split(".")[0];
   console.log(userDomain);
   
   await page.locator("#username").type("userDomain");
   //await page.pause();
   console.log(await page.locator("#username").textContent());



});