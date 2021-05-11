const BigNumber = require('bignumber.js')

const USDRates = {
    'VND': new BigNumber(0.000043),
    'USD': new BigNumber(1),
}

module.exports = (invoiceParams) => {
    const {foods} = invoiceParams

    const amount = foods.reduce((acc, food) => {
        const {price, currency, quantity} = food

        const rate = USDRates[currency.toUpperCase()]

        return acc.plus(rate.times(new BigNumber(price)).times(quantity))
    }, new BigNumber(0))

    return amount.toNumber()
}