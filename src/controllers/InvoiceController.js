const {HttpException} = require('../utils/Exceptions')
const {getValidatedBody} = require('../utils/validator')
const {wrapHandler} = require('../utils/handler')

const CookieAuth = require('../middlewares/CookieAuth')

const InvoiceActions = require('../actions/invoice/__index')

exports.createInvoice = wrapHandler(async (req, res) => {
    const vBody = getValidatedBody(res)

    const invoiceParams = Object.assign(vBody, {
        user: CookieAuth.getUserId(req),
        status: vBody.payment_method === 'non' ? 'succeeded' : 'pending',
        amount: InvoiceActions.calculateAmount(vBody)
    })

    const newInvoice = await InvoiceActions.createInvoice(invoiceParams)

    return newInvoice
})

exports.updateInvoice = wrapHandler(async (req, res) => {
    const vBody = getValidatedBody(res)
    const userId = CookieAuth.getUserId(req)
    const {invoiceId} = req.params

    const existsInvoice = await InvoiceActions.findOneInvoice({
        _id: invoiceId,
        user: userId,
    })

    if (!existsInvoice) {
        throw new HttpException(`Invoice not found.`, 404)
    }

    if (existsInvoice.status === 'succeeded') {
        throw new HttpException(`Invoice has been paid.`, 409)
    }

    const invoiceParams = Object.assign({}, vBody)

    if (vBody.payment_method && vBody.payment_method === 'non') {
        invoiceParams.status = 'succeeded'
    }

    if (vBody.foods) {
       vBody.amount = InvoiceActions.calculateAmount(vBody)
    }

    const newInvoice = await InvoiceActions.updateInvoice({
        _id: invoiceId,
        user: userId,
    }, invoiceParams)

    return newInvoice
})

exports.getInvoice = wrapHandler(async (req, res) => {
    const {invoiceId} = req.params

    const existsInvoice = await InvoiceActions.findOneInvoice({_id: invoiceId})

    if (!existsInvoice) {
        throw new HttpException(`Invoice not found.`, 404)
    }

    return existsInvoice
})