const InvoiceModel = require('../../models/InvoiceModel')

module.exports = (query, invoiceParams, options = {}) => {
    return InvoiceModel.findOneAndUpdate(query, invoiceParams, Object.assign({
        new: true,
    }, options)).lean()
}