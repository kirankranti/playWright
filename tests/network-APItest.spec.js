const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginpayload= {userEmail: "nanikiri@gmail.com",userPassword:"Welcome@123"};
const orderpayload = {orders: [{country: "Cuba", productOrderedId: "6262e9d9e26b7e1a10e89c04"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};

let response;
//let orderIdnew;

test.beforeAll( async()=>
{
const apiContext = await request.newContext();
const apiUtils = new APIUtils(apiContext,loginpayload);
response = await apiUtils.createOrder(orderpayload);

})

test('network api scenario', async ({ page }) => 
{

  page.addInitScript(value => {

    window.localStorage.setItem('token', value);

  }, response.responseToken);
    
    await page.goto('https://rahulshettyacademy.com/client/');

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/649ab2017244490f956e3788",
    async route=>
    {
      const response =  await page.request.fetch(route.request());
      let body = fakePayLoadOrders;
      route.fulfill(
        {

       response,
        body,

      });
    });
    
    //await page.pause();
    await page.locator("button[routerlink*='myorders']").click();
    //await page.locator("tbody").waitFor();
    console.log(await page.locator(".mt-4").textContent());

});