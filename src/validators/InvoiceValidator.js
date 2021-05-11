const Joi = require('joi')
const {createValidatorMiddleware} = require('../utils/validator')

const FoodItemSchema = Joi.object().keys({
    food: Joi.string()
        .required(),

    quantity: Joi.number()
        .min(1)
        .required(),

    price: Joi.number()
        .min(0)
        .required(),

    currency: Joi.string()
        .default('VND')
})

const CreateInvoiceSchema = Joi.object().keys({
    payment_method: Joi.string()
        .required(),

    foods: Joi.array()
        .items(FoodItemSchema.unknown(true))
        .min(1),

    metadata: Joi.any(),
})

const UpdateInvoiceSchema = Joi.object().keys({
    payment_method: Joi.string(),

    foods: Joi.array()
        .items(FoodItemSchema.unknown(true))
        .min(1),

    metadata: Joi.any(),
})

exports.createInvoice = createValidatorMiddleware(CreateInvoiceSchema)

exports.updateInvoice = createValidatorMiddleware(UpdateInvoiceSchema)
