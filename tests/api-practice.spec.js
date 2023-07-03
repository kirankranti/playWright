const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginpayload= {userEmail: "nanikiri@gmail.com",userPassword:"Welcome@123"};
const orderpayload = {orders: [{country: "Cuba", productOrderedId: "6262e9d9e26b7e1a10e89c04"}]};

let response;
//let orderIdnew;

test.beforeAll( async()=>
{
const apiContext = await request.newContext();
const apiUtils = new APIUtils(apiContext,loginpayload);
response = await apiUtils.createOrder(orderpayload);

})

test('E2E api scenario', async ({ page }) => 
{

  page.addInitScript(value => {

    window.localStorage.setItem('token', value);

  }, response.responseToken);
    
    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator("body").waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
  
    const orderpage = await page.locator("tbody tr");  
    await page.locator("tbody").waitFor();
  
  for(let i=0; i< await orderpage.count(); ++i)
  {
      const rowid = await orderpage.nth(i).locator("th").textContent();
  
      if(response.orderIdnew.includes(rowid))
      {
          await orderpage.nth(i).locator("button").first().click();
          break;
      }
  
  }
  const orderconfpage = await page.locator(".col-text.-main").textContent();
  await expect(page.locator(".col-text.-main")).toHaveText(response.orderIdnew);
  expect(response.orderIdnew.includes(orderconfpage)).toBeTruthy();
  

});