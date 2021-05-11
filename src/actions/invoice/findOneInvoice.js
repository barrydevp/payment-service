const InvoiceModel = require('../../models/InvoiceModel')

module.exports = (query) => {
    return InvoiceModel.findOne(query).lean()
}