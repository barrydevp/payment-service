const {Stripe} = require('stripe')
const getEnv = require('../utils/getEnv')

const {secretKey, apiVersion} = getEnv('/stripe', {})

module.exports = new Stripe(
    secretKey,
    {apiVersion}
)