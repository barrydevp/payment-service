const Joi = require('joi')
const {createValidatorMiddleware} = require('../utils/validator')

const ConfirmCheckOutSchema = Joi.object().keys({
    order_id: Joi.string()
        .required(),

    invoice_id: Joi.string()
        .required(),
})

exports.confirmCheckout = createValidatorMiddleware(ConfirmCheckOutSchema)