const express = require('express')
const router = express.Router()
const StripeController = require('../controllers/StripeController')
const StripeValidator = require('../validators/StripeValidator')

router.post('/create-payment-intent', StripeValidator.createPaymentIntent, StripeController.createPaymentIntent)

router.post('/checkout', StripeValidator.checkOut, StripeController.checkout)

router.post('/confirm-checkout', StripeValidator.confirmCheckout, StripeController.confirmCheckout)

module.exports = router