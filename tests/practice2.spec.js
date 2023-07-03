const { test, expect } = require('@playwright/test');

test('more buttons & validation', async ({ page }) => {
  await page.goto('https://www.rahulshettyacademy.com/AutomationPractice');
  const loadBody = await page.locator("body")
  await loadBody.waitFor();
  /*
  await page.goto('https://google.com');
  await loadBody.waitFor();
  await page.goBack();
  await loadBody.waitFor();
  await page.goForward();
  await loadBody.waitFor();
  await page.goBack();
  await loadBody.waitFor();
*/
  const hideButton= page.locator("#hide-textbox");
  const showButton = page.locator("#show-textbox");
  const blinkingText = page.locator(".blinkingText");
  const hide_show_txt = page.locator("#displayed-text");

  //hide_show txtbox
  await expect(hide_show_txt).toBeVisible();
  await hideButton.click();
  await expect(hide_show_txt).toBeHidden();
  await showButton.click();
  await hide_show_txt.isVisible();

  ///Dialog handling
    const alertbtn = page.locator("#alertbtn");
    const confirmbtn = page.locator("#confirmbtn");

    await page.on('dialog', dialog => dialog.accept());
    
    await confirmbtn.click();
    await alertbtn.click();

    //mouse hover
    await page.locator("#mousehover").hover();
    await page.locator("[href*='top']").click();
    await page.locator("#mousehover").hover();
    await page.locator(".mouse-hover-content").last().click();
    await loadBody.waitFor();

    //Handling frames
    const framepage = page.frameLocator("#courses-iframe");
    await framepage.locator(".new-navbar-highlighter[href='lifetime-access']").click();
    const bronzeplan = await framepage.locator("[class*='bronze-plan']").textContent();
    const trimmedplan = bronzeplan.replace(/\s+/g,' ').trim(); 
    console.log(trimmedplan);
    console.log(trimmedplan.split(" ")[2]);



});