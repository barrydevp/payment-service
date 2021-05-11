const CheckoutNodeSDK = require('@paypal/checkout-server-sdk')
const PaypalService = require('../../services/PaypalService')

module.exports = (orderId) => {
    const request = new CheckoutNodeSDK.orders.OrdersGetRequest(orderId)

    return PaypalService.execute(request)
}