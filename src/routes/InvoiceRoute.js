const express = require('express')
const router = express.Router()
const InvoiceController = require('../controllers/InvoiceController')
const InvoiceValidator = require('../validators/InvoiceValidator')

router.post('/', InvoiceValidator.createInvoice, InvoiceController.createInvoice)

router.put('/:invoiceId', InvoiceValidator.updateInvoice, InvoiceController.updateInvoice)
router.get('/:invoiceId', InvoiceController.getInvoice)

module.exports = router