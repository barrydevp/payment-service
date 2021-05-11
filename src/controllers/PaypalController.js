const Bluebird = require('bluebird')
const {getValidatedBody} = require('../utils/validator')
const {HttpException} = require('../utils/Exceptions')
const {wrapHandler} = require('../utils/handler')

const CookieAuth = require('../middlewares/CookieAuth')

const PaypalActions = require('../actions/paypal/__index')
const InvoiceActions = require('../actions/invoice/__index')

exports.confirmCheckout = wrapHandler(async (req, res) => {
    const vBody = getValidatedBody(res)
    const userId = CookieAuth.getUserId(req)
    const invoiceId = vBody.invoice_id

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

    const {order_id: orderId} = vBody

    const invoiceParams = {
        id: orderId,
        payment_method: 'paypal',
        status: 'processing'
    }

    const confirmedResult = await Bluebird.try(() => PaypalActions.confirmPayment(orderId))
        .then(intent => {
            return {
                invoice: Object.assign(invoiceParams, {
                    data: intent,
                    status: 'succeeded'
                })
            }
        })
        .catch(error => {
            return {
                error,
                invoice: Object.assign(invoiceParams, {
                    error: error,
                    status: 'error',
                })
            }
        })

    // handle upsert for missing invoice
    const newInvoice = await InvoiceActions.confirmInvoice({_id: invoiceId, user: userId}, confirmedResult)

    return newInvoice
})