const {getValidatedBody} = require('../utils/validator')
const {wrapHandler} = require('../utils/handler')

const CookieAuth = require('../middlewares/CookieAuth')

const StripeActions = require('../actions/stripe/__index')
const InvoiceActions = require('../actions/invoice/__index')

exports.createPaymentIntent = wrapHandler(async (req, res) => {
    const vBody = getValidatedBody(res)

    const result = await StripeActions.createPaymentIntents(vBody)

    return result
})

exports.checkout = wrapHandler(async (req, res) => {
    const vBody = getValidatedBody(res)

    const paymentIntentParams = Object.assign(vBody, {
        confirmation_method: 'manual',
        confirm: true,
    })

    const intent = await StripeActions.createPaymentIntents(paymentIntentParams)

    const [result, error] = StripeActions.handlePaymentIntentResponse(intent)

    if (error) {
        throw error
    }

    const invoiceParams = {
        user: CookieAuth.getUserId(req),
        id: intent.id,
        data: intent,
        status: 'pending',
    }

    if (result.succeeded) {
        invoiceParams.status = 'succeeded'
    }

    const newInvoice = await InvoiceActions.createInvoice(invoiceParams)

    result.invoice_id = newInvoice._id

    // result.invoice = newInvoice

    return result
})

exports.confirmCheckout = wrapHandler(async (req, res) => {

    const vBody = getValidatedBody(res)

    const {payment_intent_id: paymentIntentId} = vBody

    const intent = await StripeActions.confirmPaymentIntents(paymentIntentId)

    const [result, error] = StripeActions.handlePaymentIntentResponse(intent)

    if (error) {
        throw error
    }

    // handle upsert for missing invoice
    const newInvoice = await InvoiceActions.updateInvoice({id: paymentIntentId}, {
        user: CookieAuth.getUserId(req),
        id: paymentIntentId,
        data: intent,
        status: 'succeeded'
    }, {upsert: true, setDefaultsOnInsert: true})

    result.invoice_id = newInvoice._id

    // result.invoice = newInvoice

    return result
})