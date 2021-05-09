const Joi = require('joi')
const {createValidatorMiddleware} = require('../utils/validator')

const CreatePaymentIntentSchema = Joi.object().keys({
    amount: Joi.number()
        .min(0)
        .required(),

    currency: Joi.string()
        .default('USD'),
})

exports.createPaymentIntent = createValidatorMiddleware(CreatePaymentIntentSchema)

const CheckOutSchema = CreatePaymentIntentSchema.keys({
    payment_method: Joi.string()
        .required(),
})

exports.checkOut = createValidatorMiddleware(CheckOutSchema)

const ConfirmCheckOutSchema = Joi.object().keys({
    payment_intent_id: Joi.string()
        .required(),
})

exports.confirmCheckout = createValidatorMiddleware(ConfirmCheckOutSchema)