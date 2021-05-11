const CheckoutNodeSDK = require('@paypal/checkout-server-sdk')
const getEnv = require('../utils/getEnv')

const {clientId, clientSecret} = getEnv('/paypal', {})

const environment =new CheckoutNodeSDK.core.SandboxEnvironment(
    clientId, clientSecret
)

module.exports = new CheckoutNodeSDK.core.PayPalHttpClient(environment)