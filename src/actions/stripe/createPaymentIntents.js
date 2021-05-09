const StripeService = require('../../services/StripeService')

module.exports = (paymentParams) => {
    return StripeService.paymentIntents.create(paymentParams)
}