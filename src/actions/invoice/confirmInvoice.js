const InvoiceModel = require('../../models/InvoiceModel')

module.exports = async (query, {error, invoice}) => {
    const newInvoice = await InvoiceModel.findOneAndUpdate(query, invoice, {
        new: true,
    }).lean()

    if(error) {
        throw error
    }

    return newInvoice
}