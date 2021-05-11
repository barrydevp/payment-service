const {ActionException} = require('../../utils/Exceptions')

module.exports = (intent) => {
    // Generate a response based on the intent's status
    switch (intent.status) {
        case 'requires_action':
        case 'requires_source_action':
            // Card requires authentication
            return {
                intent: intent,
                requires_action: true,
                client_secret: intent.client_secret
            }
        case 'requires_payment_method':
        case 'requires_source':
            // Card was not properly authenticated, suggest a new payment method
            throw new ActionException('Your card was denied, please provide a new payment method')
        case 'succeeded':
            // Payment is complete, authentication not required
            // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)

            console.log('💰 Payment received!')
            return {intent: intent, client_secret: intent.client_secret}
    }
}