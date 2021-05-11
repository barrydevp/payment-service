const Bluebird = require('bluebird')
const {getValidatedBody} = require('../utils/validator')
const {HttpException} = require('../utils/Exceptions')
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

    delete vBody.invoice_id

    const paymentIntentParams = {
        payment_method: vBody.payment_method_id,
        confirmation_method: 'manual',
        confirm: true,
        amount: Math.ceil(existsInvoice.amount * 100),
        currency: 'USD',
        metadata: InvoiceActions.convertStripeMeta(existsInvoice),
    }

    const invoiceParams = {
        payment_method: 'stripe',
        status: 'processing',
    }

    const confirmedResult = await Bluebird.try(() => StripeActions.createPaymentIntents(paymentIntentParams))
        .then(({intent, requires_action, client_secret}) => {
            return {
                invoice: Object.assign(invoiceParams, {
                    id: intent.id,
                    data: intent,
                    status: requires_action ? 'partial' : 'succeeded'
                }),
                client_secret,
                requires_action,
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

    const newInvoice = await InvoiceActions.confirmInvoice({
        _id: invoiceId,
        user: userId,
    }, confirmedResult)

    return {
        client_secret: confirmedResult.client_secret,
        requires_action: confirmedResult.requires_action,
    }
})

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

    const {payment_intent_id: paymentIntentId} = vBody

    const invoiceParams = {
        payment_method: 'stripe',
        status: 'processing',
    }

    const confirmedResult = await Bluebird.try(() => StripeActions.confirmPaymentIntents(paymentIntentId))
        .then(({intent, requires_action, client_secret}) => {
            return {
                invoice: Object.assign(invoiceParams, {
                    id: intent.id,
                    data: intent,
                    status: requires_action ? 'partial' : 'succeeded'
                }),
                client_secret,
                requires_action,
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

    const newInvoice = await InvoiceActions.confirmInvoice({
        _id: invoiceId,
        user: userId,
    }, confirmedResult)

    return {
        client_secret: confirmedResult.client_secret,
        requires_action: confirmedResult.requires_action,
    }
})