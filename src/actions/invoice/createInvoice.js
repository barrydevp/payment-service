const InvoiceModel = require('../../models/InvoiceModel')

module.exports = async (invoiceParams) => {
    const newInvoice = new InvoiceModel(invoiceParams)

    await newInvoice.save()

    return newInvoice.toJSON()
}