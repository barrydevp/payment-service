const express = require('express')
const router = express.Router()
const PaypalController = require('../controllers/PaypalController')
const PaypalValidator = require('../validators/PaypalValidator')

router.post('/confirm-checkout', PaypalValidator.confirmCheckout, PaypalController.confirmCheckout)

module.exports = router