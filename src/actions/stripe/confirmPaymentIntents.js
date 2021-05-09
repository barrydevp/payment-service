const StripeService = require('../../services/StripeService')

module.exports = (payment_id, options) => {
    return StripeService.paymentIntents.confirm(payment_id, options)
}