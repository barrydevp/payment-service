const mongoose = require('mongoose')

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
            required: true,
            index: true,
        },
        data: {
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
