const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Food name is required'],
            index: true,
        },
        describe: String,
        category: String,
        price: {type: Number, default: 0},
        rating: {
            type: Number,
            default: 0,
        },
        review: {
            type: Number,
            default: 0,
        },
        photos: [
            {
                width: Number,
                height: Number,
                value: String,
            },
        ],
        promotion: {
            text: String,
            icon: String,
        },
    },
    {collection: 'food', timestamps: true}
)

module.exports = mongoose.model('Food', foodSchema)
