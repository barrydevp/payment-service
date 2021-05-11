const StripeService = require('../../services/StripeService')
const handlePaymentIntentResponse = require('./handlePaymentIntentResponse')

module.exports = async (payment_id, options) => {
    const intent = await StripeService.paymentIntents.confirm(payment_id, options)

    return handlePaymentIntentResponse(intent)
}