const InvoiceModel = require('../../models/InvoiceModel')

module.exports = async (invoiceParams) => {
    const vAmount = Math.ceil(invoiceParams.amount * 100) / 100
    const newInvoice = new InvoiceModel(Object.assign(invoiceParams, {amount: vAmount}))

    await newInvoice.save()

    return newInvoice.toJSON()
}

const a = {"create_time":"2021-05-11T09:24:45Z","update_time":"2021-05-11T09:25:04Z","id":"157169352G9409438","intent":"AUTHORIZE","status":"COMPLETED","payer":{"email_address":"minhhai-buyer@foobla.com","payer_id":"GZLEJJBGVNBEC","address":{"country_code":"US"},"name":{"given_name":"Barry","surname":"Dao"}},"purchase_units":[{"description":"Thanh toán đặt bàn trực tuyến Việt Food.","reference_id":"609a4cac20f0f2de809caa70","custom_id":"608fa445f0af2a0bfc99a1f8","invoice_id":"609a4cac20f0f2de809caa70","amount":{"value":"1.60","currency_code":"USD"},"payee":{"email_address":"minhhai-facilitator@foobla.com","merchant_id":"MXL4U8G2UJJJG"},"shipping":{"name":{"full_name":"Barry Dao"},"address":{"address_line_1":"1 Main St","admin_area_2":"San Jose","admin_area_1":"CA","postal_code":"95131","country_code":"US"}},"payments":{"authorizations":[{"status":"CREATED","id":"8J931186XT443841X","amount":{"value":"1.60","currency_code":"USD"},"invoice_id":"609a4cac20f0f2de809caa70","seller_protection":{"status":"ELIGIBLE","dispute_categories":["ITEM_NOT_RECEIVED","UNAUTHORIZED_TRANSACTION"]}}]}}],"links":[{"href":"https://api.sandbox.paypal.com/v2/checkout/orders/157169352G9409438","rel":"self","method":"GET","title":"GET"}]}