module.exports = (invoice) => {
    return {
        _id: invoice._id.toString(),
        user: invoice._id.toString(),
        amount: invoice.amount,
    }
}