const mongoose = require('mongoose')

const FoodItem = new mongoose.Schema(
    {
        _id: false,
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
        },
        quantity: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: 'VND',
        }
    },
)

const InvoiceModel = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        id: {
            type: String,
            index: true,
        },
        data: {
            type: mongoose.Schema.Types.Mixed,
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
        },
        payment_method: {
            type: String,
            required: true,
            index: true,
            enum: ['non', 'stripe', 'paypal'],
            default: 'non',
        },
        foods: {
            type: [FoodItem],
            default: []
        },
        amount: {
            type: Number,
            min: 0,
            required: true,
        },
        error: {
            type: mongoose.Schema.Types.Mixed,
        },
        status: {
            type: String,
            default: 'pending',
            required: true,
            index: true,
        },
    },
    {collection: 'invoice', timestamps: true}
)

module.exports = mongoose.model('Invoice', InvoiceModel)
