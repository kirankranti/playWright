const { test, expect } = require('@playwright/test');

test('E2E practice scenario', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/');

  const emailName = "nanikiri@gmail.com"
  const userEmail =  page.locator("#userEmail");
  const userpwd =  page.locator("#userPassword");
  const loginbutton = page.locator("#login")
  const prodTitle = page.locator(".card b");
  const products = page.locator(".card-body");
  const productName = 'iphone 13 pro';
  
  
  //print title output
  console.log(await page.title());

   // Expect a title "to contain" a substring.
   await expect(page).toHaveTitle("Let's Shop");

   // Expect a title "to contain" and banner a substring.
   await expect(page).toHaveTitle("Let's Shop");
   console.log(await page.locator(".banner").textContent());
   await expect(page.locator(".banner")).toContainText("We Make Your Shopping SimplePractice Website for Rahul Shetty Academy StudentsRegisterRegister to sign in with your personal accountLog inEmailPasswordLoginForgot password?Don't have an account? Register here");  
   
   // enter useremail & pwd
   await userEmail.type(emailName);
   await userpwd.type("Welcome@456");
   await loginbutton.click();
   console.log(await page.locator("#toast-container").textContent());
   await expect(page.locator("#toast-container")).toContainText("Incorrect email or password.");

  //clear/fill username and password 
  await userEmail.fill("");
  await userpwd.fill("");
  await userEmail.type(emailName);
  await userpwd.type("Welcome@123");
  await loginbutton.click();
  // wait till page load network load state
  await page.waitForLoadState("networkidle");
  
  console.log(await prodTitle.first().textContent());
  console.log(await prodTitle.nth(1).textContent());
  const allprdTitles = await prodTitle.allTextContents();
  
  console.log(allprdTitles);

  const countproducts = await products.count();
  console.log(countproducts);

  for(let i=0; i<countproducts; ++i)
  {
    if(await products.nth(i).locator('b').textContent() === productName)
    {

        //add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }

    
  }
  const prdadded = await page.locator("[aria-label*='Added']").textContent(); 
  await page.locator("[routerlink*='cart']").click();
  await page.locator('.cart li').first().waitFor();
  const bool = await page.locator("h3:has-text('productName')").isVisible();
  await page.locator("text=Checkout").click();
  const paymentCC = await page.locator("[class*='payment__type--cc active']").isVisible();
  expect(paymentCC).toBeTruthy();
  const numberCC =   page.locator("[class*='text-validated']").first();
  const monthCC = await page.locator(".input.ddl").nth(0);
  const yearCC = await page.locator(".input.ddl").nth(1);
  const numbercvv = await page.locator("[class='input txt']").nth(0);
  const cardName = await page.locator("[class='input txt']").nth(1);
  const coupon = await page.locator("[name='coupon']");
  const addcoupon = await page.locator("[type='submit']");
  const couponverify = await page.locator("text=Coupon Applied");
  const country = await page.locator("[placeholder='Select Country']");
  const emailuser = await page.locator(".user__name [type='text']").nth(0);
  const placeorder = await page.locator(".btnn.action__submit");

  await numberCC.fill(" ");
  await numberCC.type("4332 9991 9442 1193");
  await monthCC.type("10");
  await yearCC.type("20");
  console.log(await monthCC.isVisible());
  console.log(await yearCC.isVisible());
  await numbercvv.type("234");
  await cardName.type("nani kiri");
  await coupon.type("rahulshettyacademy")
  await addcoupon.click();
  console.log(await couponverify.textContent());
  await country.type("ind", {delay:100});
  const dynamicdd = page.locator(".ta-results");
  await dynamicdd.waitFor();
  const optionsCount = await dynamicdd.locator("button").count();
  for(let i=0; i<optionsCount; ++i )
  {

    const textis = await dynamicdd.locator("button").nth(i).textContent();

    if(textis === " India")
    {
        await dynamicdd.locator("button").nth(i).click();
        break;

    }
  }
 
  await expect(emailuser).toHaveText(emailName);
  await placeorder.click();
  await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  const orderid_1 = orderId.split(" |")[1];
  console.log(orderid_1);
  await page.locator("button[routerlink*='myorders']").click();
  const yourorder =  page.locator("h1.ng-star-inserted")
  await yourorder.waitFor();
  await expect(yourorder).toHaveText("Your Orders");

  const orderpage = await page.locator("tbody tr");

  const orderIdcount = await orderpage.count();
  console.log(await orderIdcount);

  await page.locator("tbody").waitFor();

for(let i=0; i< await orderpage.count(); ++i)
{
    const rowid = await orderpage.nth(i).locator("th").textContent();

    if(orderid_1.includes(rowid))
    {
        await orderpage.nth(i).locator("button").first().click();
        break;
    }

}

const orderconfpage = await page.locator(".col-text.-main").textContent();
await expect(page.locator(".col-text.-main")).toHaveText(orderid_1);
expect(orderid_1.includes(orderconfpage)).toBeTruthy();

});

 // example to verify -- console.log(await expect(country).toHaveText(" India"));