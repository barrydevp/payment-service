const StripeService = require('../../services/StripeService')
const handlePaymentIntentResponse = require('./handlePaymentIntentResponse')

module.exports = async (paymentParams) => {
    const intent = await StripeService.paymentIntents.create(paymentParams)

    return handlePaymentIntentResponse(intent)
}