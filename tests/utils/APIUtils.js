class APIUtils
{
    constructor(apiContext,loginpayload)
    {
        this.apiContext = apiContext;
        this.loginpayload = loginpayload;

    }
    async getToken()
    {
    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
{
    data:this.loginpayload
})
    const loginResponsejson = await loginResponse.json();
    const responseToken = await loginResponsejson.token;
    console.log(responseToken);
    return responseToken;
    }

    async createOrder(orderpayload)
    {
        let response = {};
        response.responseToken = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",

        {
            data: orderpayload,
            headers: {
                'Authorization': response.responseToken,
                'Content-Type': 'application/json'
            },
        })
        const orderresponsejson = await orderResponse.json();
        console.log(orderresponsejson);
        const orderIdnew = await orderresponsejson.orders[0];
        response.orderIdnew = orderIdnew;
        return response;
        }

    }

module.exports = {APIUtils};