const StripeService = require('../src/services/StripeService')

setImmediate(async () => {
    const paymentMethod = 'pm_card_authenticationRequired'

    let paymentIntent = await StripeService.paymentIntents.create({
        amount: 88888,
        currency: 'usd',
        payment_method: paymentMethod,
        confirmation_method: 'manual',
        confirm: true,
        // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
        // to take advantage of new authentication features in mobile SDKs
        // use_stripe_sdk: useStripeSdk,
    })

    // console.log(paymentIntent)

    if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_source_action') {
        paymentIntent = await StripeService.paymentIntents.confirm(paymentIntent.id)
    }

    console.log(paymentIntent)
})
